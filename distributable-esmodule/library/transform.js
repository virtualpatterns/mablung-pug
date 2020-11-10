import { createRequire as _createRequire } from "module";import _URL from "url";import DefaultBabel, * as ModuleBabel from '@babel/core';
import DefaultLuxon, * as ModuleLuxon from 'luxon';
import ESLint from 'eslint';
import FileSystem from 'fs-extra';
import Filter from 'pug-filters';
import _Format from 'prettier';
import Is from '@pwn/is';
import JSON5 from 'json5';
import Lex from 'pug-lexer';
import Link from 'pug-linker';
import Load from 'pug-load';
import Match from 'minimatch';
import Merge from 'deepmerge';
import Parse from 'pug-parser';
import Path from 'path';

import { Package } from './package.js';
import BlockNode from './node/block-node.js';

import { UnrecognizedMessageTransformError } from './error/unrecognized-message-transform-error.js';

const { DateTime } = DefaultLuxon || ModuleLuxon;
const { 'ESLint': Lint } = ESLint;
const { 'format': Format } = _Format;
const Babel = DefaultBabel || ModuleBabel;
const FilePath = _URL.fileURLToPath(import.meta.url);
const Require = _createRequire(import.meta.url);

class Transform {

  static getAstFromContent(content, option = { 'path': '(unknown)' }) {

    let ast = null;
    let token = null;

    token = Lex(content, { 'filename': option.path });
    ast = Parse(token, { 'filename': option.path });
    ast = Load(ast, { 'lex': Lex, 'parse': Parse });

    Filter.handleFilters(ast);

    ast = Link(ast);

    return ast;

  }

  static async getSourceFromContent(content, option = { 'path': '(unknown)' }) {

    let ast = this.getAstFromContent(content, option);
    let blockNode = new BlockNode(ast, option);
    let blockSource = await blockNode.getSource();

    let source = `  function __getNode(__utility = {}) { 
                      const __node = []
                      ${blockSource}
                      return __utility.getNode(__node)
                    }`;

    let local = await this._getLocalFromSource(source);

    return { source, local };

  }

  static async getFunctionSourceFromContent(content, option = { 'path': '(unknown)' }) {

    let { source, local } = await this.getSourceFromContent(content, option);

    local = local.
    map(local => `const { ${local} } = __local`).
    join('\n');

    source = ` function __getNode(__local = {}, __utility = {}) {
                  ${local}
                  ${source} 
                  return __getNode(__utility) 
                }`;

    return source;

  }

  static async getFunctionFromContent(content, option = { 'path': '(unknown)' }) {

    let source = null;
    source = await this.getFunctionSourceFromContent(content, option);
    source = await this.formatSource(source);

    let fn = null;
    eval(`fn = ${source}`);

    return fn;

  }

  static async getModuleSourceFromContent(content, userOption = {}) {

    let defaultOption = {
      'path': '(unknown)',
      'utility': '@virtualpatterns/mablung-pug/utility' };


    let option = Merge(defaultOption, userOption);

    let source = null;
    source = await this.getFunctionSourceFromContent(content, { 'path': option.path });
    source = `  // Created by ${Package.name} v${Package.version}
                // Created at ${DateTime.utc().toFormat('yyyy-LL-dd HH:mm:ss')}
                // Path = ${option.path === '(unknown)' ? option.path : `'${Path.relative('', option.path)}'`}
                import { Utility } from '${option.utility}'
                ${source}
                export default function(__local = {}, __utility = Utility) { 
                  return __getNode(__local, __utility) 
                }`;

    return source;

  }

  static async getAstFromPath(path) {

    let content = await FileSystem.readFile(path, { 'encoding': 'utf-8' });
    let ast = this.getAstFromContent(content, { 'path': path });

    return ast;

  }

  static async getSourceFromPath(path) {

    let content = await FileSystem.readFile(path, { 'encoding': 'utf-8' });
    let source = await this.getSourceFromContent(content, { 'path': path });

    return source;

  }

  static async getFunctionSourceFromPath(path) {

    let content = await FileSystem.readFile(path, { 'encoding': 'utf-8' });
    let source = await this.getFunctionSourceFromContent(content, { 'path': path });

    return source;

  }

  static async getFunctionFromPath(path) {

    let content = await FileSystem.readFile(path, { 'encoding': 'utf-8' });
    let fn = await this.getFunctionFromContent(content, { 'path': path });

    return fn;

  }

  static async getModuleSourceFromPath(path, option) {

    let content = await FileSystem.readFile(path, { 'encoding': 'utf-8' });
    let source = await this.getModuleSourceFromContent(content, { ...option, 'path': path });

    return source;

  }

  static async createModuleFromPath(sourcePath, targetPath = FileSystem.statSync(sourcePath).isDirectory() ? sourcePath : `${Path.dirname(sourcePath)}/${Path.basename(sourcePath, Path.extname(sourcePath))}${Path.extname(FilePath)}`, userOption = {}) {

    let defaultOption = {
      'encoding': 'utf-8',
      'flag': 'wx' };


    let option = Merge(defaultOption, userOption);

    let sourceInformation = await FileSystem.stat(sourcePath);

    if (sourceInformation.isDirectory()) {
      return (await this._createModuleFromPath(sourcePath, targetPath, option)).flat();
    } else {
      return this._createModuleFromPath(sourcePath, targetPath, option);
    }

  }

  static async _createModuleFromPath(sourcePath, targetPath, option) {
    //     console.log(`Transform._createModuleFromPath(
    //   '${Path.relative('', sourcePath)}', 
    //   '${Path.relative('', targetPath)}', 
    //   option
    // )`)

    let sourceInformation = await FileSystem.stat(sourcePath);
    // console.log(`sourceInformation.mtimeMs = ${sourceInformation.mtimeMs}`)

    if (sourceInformation.isDirectory()) {

      let includePattern = ['*.pug'];
      // let excludePattern = [ '*.skip.pug' ]

      let item = await FileSystem.readdir(sourcePath, { 'encoding': 'utf-8', 'withFileTypes': true });

      let promise = [];

      promise = promise.concat(item.
      filter(item => item.isDirectory()).
      map(folder => this.createModuleFromPath(`${sourcePath}/${folder.name}`, `${targetPath}/${folder.name}`, option)));

      promise = promise.concat(item.
      filter(item => item.isFile()).
      filter(file => includePattern.reduce((isMatch, pattern) => isMatch ? isMatch : Match(file.name, pattern), false))
      // .filter((file) => !excludePattern.reduce((isMatch, pattern) => isMatch ? isMatch : Match(file.name, pattern), false))
      .map(file => this.createModuleFromPath(`${sourcePath}/${file.name}`, `${targetPath}/${Path.basename(file.name, Path.extname(file.name))}${Path.extname(FilePath)}`, option)));

      return Promise.all(promise);

    } else {

      let isCreated = false;

      if (await FileSystem.pathExists(targetPath)) {

        let targetInformation = await FileSystem.stat(targetPath);
        // console.log(`targetInformation.mtimeMs = ${targetInformation.mtimeMs}`)

        if (sourceInformation.mtimeMs >= targetInformation.mtimeMs) {
          isCreated = true;
        }

      } else {
        isCreated = true;
      }

      if (isCreated) {

        let source = null;
        source = await this.getModuleSourceFromPath(sourcePath, option);
        source = await this.formatSource(source, Path.extname(targetPath).toLowerCase() === '.cjs' ? 'commonjs' : 'esmodule');

        await FileSystem.ensureDir(Path.dirname(targetPath));
        await FileSystem.writeFile(targetPath, source, { 'encoding': option.encoding, 'flag': option.flag });

      }

      return targetPath;

    }

  }

  static async formatSource(sourceIn, environment = Path.extname(FilePath).toLowerCase() === '.cjs' ? 'commonjs' : 'esmodule') {

    let configuration = null;
    configuration = JSON5.parse(await FileSystem.readFile(Require.resolve('./transform.babelrc.json')), { 'encoding': 'utf-8' });
    configuration = configuration.env[environment];

    let { 'code': sourceOut } = await Babel.transformAsync(sourceIn, configuration);

    sourceOut = Format(sourceOut, {
      'arrowParens': 'always',
      'bracketSpacing': true,
      'parser': 'babel',
      'quoteProps': 'preserve',
      'semi': false,
      'singleQuote': true,
      'tabWidth': 2,
      'trailingComma': 'none' });


    return sourceOut;

  }

  static async _getLocalFromSource(source) {

    let configuration = JSON5.parse(await FileSystem.readFile(Require.resolve('./transform.eslintrc.json')), { 'encoding': 'utf-8' });
    let lint = new Lint({ 'baseConfig': configuration });

    let result = await lint.lintText(source);
    let pattern = /^'(.*)' is not defined.$/i;

    let local = null;
    local = result[0].messages.
    filter(message => message.ruleId === 'no-undef').
    map(message => message.message).
    map(message => {

      let match = null;

      if (Is.not.null(match = pattern.exec(message))) {
        let [, local] = match;
        return local;
      } else {
        throw new UnrecognizedMessageTransformError(message);
      }

    }).
    reduce((accumulator, local) => {
      accumulator[local] = undefined;
      return accumulator;
    }, {});

    local = Object.keys(local);

    return local;

  }}



export { Transform };
//# sourceMappingURL=transform.js.map