"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scenario = void 0;

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var ModuleBundle = _interopRequireWildcard(require("esbuild"));

var ModuleElement = _interopRequireWildcard(require("html-element"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _pretty = _interopRequireDefault(require("pretty"));

var _is = _interopRequireDefault(require("@pwn/is"));

var _json = _interopRequireDefault(require("json5"));

var _minimatch = _interopRequireDefault(require("minimatch"));

var _path = _interopRequireDefault(require("path"));

var _pug = _interopRequireDefault(require("pug"));

var _index = require("../../index.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  'build': Bundle
} = ModuleBundle.default || ModuleBundle;
const {
  document
} = ModuleElement.default || ModuleElement;
const FilePath = __filename;
const Require = require;

class Scenario {
  constructor(path, local = {}) {
    let modifierPattern = /\.(\w*?)[./]/gims;
    let modifier = [];
    let match = null;

    while (_is.default.not.null(match = modifierPattern.exec(path))) {
      modifier.push(match[1]);
      modifierPattern.lastIndex--;
    }

    this._path = path;
    this._local = local;
    this._modifier = modifier;
  }

  get path() {
    return this._path;
  }

  get local() {
    return this._local;
  }

  get modifier() {
    return this._modifier;
  }

  async getReferenceHtml() {
    let html = null;
    html = _pug.default.compileFile(this._path)(this._local);
    html = (0, _pretty.default)(html);
    html = html.replace(/<(.*?) \/>/gim, '<$1>');
    return html;
  }

  async getServerHtml() {
    let name = Scenario.getName(this._path);

    let extension = _path.default.extname(FilePath);

    let sourcePath = this._path;
    let targetPath = `${_path.default.dirname(sourcePath)}/${name}-server${extension}`;

    let utilityPath = _path.default.relative(_path.default.dirname(targetPath), Require.resolve(`../../library/utility${extension}`));

    await _index.Transform.createModuleFromPath(sourcePath, targetPath, {
      'utility': utilityPath
    }); // __transformPath does ...
    //   URL.pathToFileURL if the environment is ESModule
    //   require.resolve if the environment is CommonJS

    let module = await Promise.resolve(`${require.resolve(targetPath)}`).then(s => _interopRequireWildcard(require(s)));
    let fn = module.default || module;
    let node = fn(this._local);
    let html = null;
    html = node.map(node => _is.default.string(node) ? document.createTextNode(node).textContent : node.outerHTML);
    html = html.join('');
    html = (0, _pretty.default)(html);
    return html;
  }

  async getBrowserHtml() {
    let name = Scenario.getName(this._path);

    let extension = _path.default.extname(FilePath);

    let sourcePath = this._path;
    let targetPath = `${_path.default.dirname(sourcePath)}/${name}-browser${extension}`;

    let utilityPath = _path.default.relative(_path.default.dirname(targetPath), Require.resolve(`../../library/utility${extension}`));

    await _index.Transform.createModuleFromPath(sourcePath, targetPath, {
      'utility': utilityPath
    });
    let source = null;
    source = `  import ContentFn from './${_path.default.relative(_path.default.dirname(sourcePath), targetPath)}'
                let local = ${JSON.stringify(this._local)}
                let node = ContentFn(local)
                let div = document.querySelector('body div')
                node.forEach((node) => div.appendChild(typeof node === 'string' ? document.createTextNode(node) : node))`;
    source = await _index.Transform.formatSource(source);
    let preBundlePath = `${_path.default.dirname(sourcePath)}/${name}-browser-pre${extension}`;
    let postBundlePath = `${_path.default.dirname(sourcePath)}/${name}-browser-post${extension}`;
    await _fsExtra.default.ensureDir(_path.default.dirname(preBundlePath));
    await _fsExtra.default.writeFile(preBundlePath, source, {
      'encoding': 'utf-8',
      'flag': 'wx'
    });
    await Bundle({
      'define': {
        'global': '\'global\'',
        'process.env.NODE_DEBUG': '\'process.env.NODE_DEBUG\'',
        'process': '\'process\''
      },
      'entryPoints': [preBundlePath],
      'outfile': postBundlePath,
      'minify': false,
      'bundle': true
    }); // let host = '0.0.0.0'
    // let port = Path.extname(FilePath) === '.cjs' ? 8080 : 8081
    // Server.start({
    //   'host': host,
    //   'port': port,
    //   'logLevel': 0,
    //   'mount': [
    //     [ '/', `${FolderPath}/www` ],
    //     [ '/favicon.ico', `${FolderPath}/www/resource/application.ico` ]
    //   ],
    //   'open': false
    // })
    // try {

    let browser = await _puppeteer.default.launch(); // { 'devtools': true, 'headless': false })

    try {
      let page = await browser.newPage(); // page.on('console', async (message) => {
      //   switch (message.type().toLowerCase()) {
      //     case 'log':
      //       console.log(message.text())
      //       break
      //     case 'dir':
      //       console.dir(await message.args()[0].jsonValue(), { 'depth': null })
      //       break
      //   }
      // })
      // await page.goto(`http://${host}:${port}/index.html`)

      let content = null;
      content = ` <!DOCTYPE html>
                  <html>
                    <head>
                      <meta   charset="utf-8">
                      <meta   name="viewport"
                              content="width=device-width">
                    </head>
                    <body>
                      <div></div>
                    </body>
                  </html>`;
      content = (0, _pretty.default)(content);
      await page.setContent(content, {
        'timeout': 0,
        'waitUntil': 'domcontentloaded'
      });
      await page.evaluate(await _fsExtra.default.readFile(postBundlePath, {
        'encoding': 'utf-8'
      }));
      let div = await page.$('body div');
      let html = null;
      html = await div.evaluate(node => node.innerHTML);
      html = (0, _pretty.default)(html);
      return html;
    } finally {
      await browser.close();
    } // } finally {
    //   Server.shutdown()
    // }

  }

  static getName(name) {
    if (_path.default.extname(name) === '') {
      return name;
    } else {
      return this.getName(_path.default.basename(name, _path.default.extname(name)));
    }
  }

  static createScenarioFromFolder(path, includePattern = ['*.pug'], excludePattern = ['*.skip.pug']) {
    let item = _fsExtra.default.readdirSync(path, {
      'encoding': 'utf-8',
      'withFileTypes': true
    });

    let scenario = [];
    scenario = scenario.concat(item.filter(item => item.isDirectory()).map(folder => this.createScenarioFromFolder(`${path}/${folder.name}`, includePattern, excludePattern)));
    scenario = scenario.concat(item.filter(item => item.isFile()).filter(file => includePattern.reduce((isMatch, pattern) => isMatch ? isMatch : (0, _minimatch.default)(file.name, pattern), false)).filter(file => !excludePattern.reduce((isMatch, pattern) => isMatch ? isMatch : (0, _minimatch.default)(file.name, pattern), false)).map(file => this.createScenarioFromFile(`${path}/${file.name}`)));
    return scenario.flat();
  }

  static createScenarioFromFile(path) {
    let localPath = `${_path.default.dirname(path)}/${this.getName(path)}-local.json`;
    let local = {};

    if (_fsExtra.default.pathExistsSync(localPath)) {
      local = _json.default.parse(_fsExtra.default.readFileSync(localPath, {
        'encoding': 'utf-8'
      }));
    }

    return new Scenario(path, local);
  }

}

exports.Scenario = Scenario;
//# sourceMappingURL=scenario.cjs.map