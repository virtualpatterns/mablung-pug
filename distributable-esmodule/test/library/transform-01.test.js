import { createRequire as _createRequire } from "module";import _URL from "url";import DefaultParser, * as ModuleParser from '@babel/parser';
import FileSystem from 'fs-extra';
import Path from 'path';
import Test from 'ava';
import Touch from 'touch';
import DefaultTraverse, * as ModuleTraverse from '@babel/traverse';

import { Transform } from '../../index.js';

const { 'parse': Parse } = DefaultParser || ModuleParser;
const Traverse = DefaultTraverse.default || ModuleTraverse.default;
const FilePath = _URL.fileURLToPath(import.meta.url);
const FolderPath = Path.dirname(FilePath);
const Require = _createRequire(import.meta.url);

Test('createModuleFromPath(sourcePath, targetPath, option) using file', async test => {

  let sourcePath = `${FolderPath}/resource/transform-01/file/00-content.pug`;
  let targetPath = `${FolderPath}/resource/transform-01/file/00-content${Path.extname(FilePath)}`;

  // succeeds writing target
  await test.notThrowsAsync(Transform.createModuleFromPath(sourcePath));
  test.true(await FileSystem.pathExists(targetPath));

  // succeeds (but writes nothing) with no change to source
  await test.notThrowsAsync(Transform.createModuleFromPath(sourcePath));

  // fails to overwrite as 'flag' defaults to 'wx' with changed source 
  await Touch(sourcePath);
  await test.throwsAsync(Transform.createModuleFromPath(sourcePath), { 'code': 'EEXIST' });

  // succeeds to overwrite as 'flag' is 'w' with changed source 
  let option = { 'flag': 'w' };

  await Touch(sourcePath);
  await test.notThrowsAsync(Transform.createModuleFromPath(sourcePath, targetPath, option));

  // succeeds to overwrite as 'flag' is 'w' with changed source, utility import is defined
  let utility = Path.relative(Path.dirname(sourcePath), Require.resolve('../../library/utility.js'));

  option = { 'flag': 'w', 'utility': utility };

  await Touch(sourcePath);
  await test.notThrowsAsync(Transform.createModuleFromPath(sourcePath, targetPath, option));

  let content = await FileSystem.readFile(targetPath, { 'encoding': 'utf-8' });
  let ast = Parse(content, { 'sourceType': 'module' });

  let existsUtility = false;

  Traverse(ast, {
    CallExpression(path) {

      if (path.node.callee.name === 'require' &&
      path.node.arguments.length === 1 &&
      path.node.arguments[0].type === 'StringLiteral') {

        // test.log(`const Utility = require('${path.node.arguments[0].value}')`)
        test.is(path.node.arguments[0].value, utility);

        existsUtility = true;

      }

    },
    ImportDeclaration(path) {

      // test.log(`import Utility from '${path.node.source.value}'`)
      test.is(path.node.source.value, utility);

      existsUtility = true;

    } });


  test.true(existsUtility);

});

Test('createModuleFromPath(sourcePath, targetPath, option) using folder', async test => {

  let sourcePath = `${FolderPath}/resource/transform-01/folder`;
  let targetPath = [
  `${FolderPath}/resource/transform-01/folder/00-content${Path.extname(FilePath)}`,
  `${FolderPath}/resource/transform-01/folder/01-content${Path.extname(FilePath)}`,
  `${FolderPath}/resource/transform-01/folder/02-content${Path.extname(FilePath)}`];


  // succeeds writing target
  await test.notThrowsAsync(Transform.createModuleFromPath(sourcePath));
  targetPath.forEach(targetPath => test.true(FileSystem.pathExistsSync(targetPath)));

  // succeeds (but writes nothing) with no change to source
  await test.notThrowsAsync(Transform.createModuleFromPath(sourcePath));

  // fails to overwrite as 'flag' defaults to 'wx' with changed source 
  await Touch(`${sourcePath}/02-content.pug`);
  await test.throwsAsync(Transform.createModuleFromPath(sourcePath), { 'code': 'EEXIST' });

});

Test('createModuleFromPath(sourcePath, targetPath, option) using sub-folder', async test => {

  let sourcePath = `${FolderPath}/resource/transform-01/sub-folder`;
  let targetPath = [
  `${FolderPath}/resource/transform-01/sub-folder/folder/00-content${Path.extname(FilePath)}`,
  `${FolderPath}/resource/transform-01/sub-folder/folder/01-content${Path.extname(FilePath)}`,
  `${FolderPath}/resource/transform-01/sub-folder/folder/02-content${Path.extname(FilePath)}`,
  `${FolderPath}/resource/transform-01/sub-folder/00-content${Path.extname(FilePath)}`,
  `${FolderPath}/resource/transform-01/sub-folder/01-content${Path.extname(FilePath)}`,
  `${FolderPath}/resource/transform-01/sub-folder/02-content${Path.extname(FilePath)}`];


  // succeeds writing target
  await test.notThrowsAsync(Transform.createModuleFromPath(sourcePath));
  targetPath.forEach(targetPath => test.true(FileSystem.pathExistsSync(targetPath)));

  // succeeds (but writes nothing) with no change to source
  await test.notThrowsAsync(Transform.createModuleFromPath(sourcePath));

  // fails to overwrite as 'flag' defaults to 'wx' with changed source 
  await Touch(`${sourcePath}/folder/02-content.pug`);
  await test.throwsAsync(Transform.createModuleFromPath(sourcePath), { 'code': 'EEXIST' });

});
//# sourceMappingURL=transform-01.test.js.map