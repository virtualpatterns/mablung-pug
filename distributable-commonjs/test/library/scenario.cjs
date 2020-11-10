"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scenario = void 0;

var ModuleSemaphore = _interopRequireWildcard(require("await-semaphore"));

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
const {
  Mutex
} = ModuleSemaphore.default || ModuleSemaphore;
const FilePath = __filename;
const Require = require;

class Scenario {
  constructor(path) {
    let modifierPattern = /\.(\w*?)[./]/gims;
    let modifier = [];
    let match = null;

    while (_is.default.not.null(match = modifierPattern.exec(path))) {
      modifier.push(match[1]);
      modifierPattern.lastIndex--;
    }

    let name = Scenario.getName(path);
    let localPath = `${_path.default.dirname(path)}/${name}.json`;
    let local = {};

    if (_fsExtra.default.pathExistsSync(localPath)) {
      local = _json.default.parse(_fsExtra.default.readFileSync(localPath, {
        'encoding': 'utf-8'
      }));
    }

    this._path = path;
    this._modifier = modifier;
    this._name = name;
    this._local = local;
    this._lock = new Mutex();
  }

  get path() {
    return this._path;
  }

  get modifier() {
    return this._modifier;
  }

  get name() {
    return this._name;
  }

  get local() {
    return this._local;
  }

  async getReferenceHtml() {
    let html = null;
    html = _pug.default.compileFile(this._path)(this._local);
    html = (0, _pretty.default)(html);
    html = html.replace(/<(.*?) \/>/gms, '<$1>');
    return html;
  }

  async createModule() {
    return _index.Transform.createModuleFromPath(this._path, `${_path.default.dirname(this._path)}/${this._name}${_path.default.extname(FilePath)}`, {
      'utility': _path.default.relative(_path.default.dirname(this._path), Require.resolve(`../../library/utility${_path.default.extname(FilePath)}`))
    });
  }

  getNodeHtml(node) {
    return node.map(node => _is.default.string(node) ? document.createTextNode(node).textContent : node.outerHTML).join('');
  }

  async getServerHtml() {
    let modulePath = await this._lock.use(() => this.createModule());
    let module = await Promise.resolve(`${modulePath}`).then(s => _interopRequireWildcard(require(s)));
    let fn = module.default;
    let node = fn(this._local);
    let html = null;
    html = this.getNodeHtml(node);
    html = (0, _pretty.default)(html);
    return html;
  }

  async getSource(modulePath) {
    let source = null;
    source = ` import ContentFn from './${_path.default.relative(_path.default.dirname(modulePath), modulePath)}'
                let div = document.querySelector('body div')
                let node = ContentFn(${JSON.stringify(this._local)})
                node.forEach((node) => div.appendChild(typeof node === 'string' ? document.createTextNode(node) : node))`;
    source = await _index.Transform.formatSource(source);
    return source;
  }

  async getBrowserHtml() {
    let modulePath = await this._lock.use(() => this.createModule());
    let source = await this.getSource(modulePath);
    let preBundlePath = `${_path.default.dirname(modulePath)}/${_path.default.basename(modulePath, _path.default.extname(modulePath))}-pre-bundle${_path.default.extname(modulePath)}`;
    let postBundlePath = `${_path.default.dirname(modulePath)}/${_path.default.basename(modulePath, _path.default.extname(modulePath))}-post-bundle${_path.default.extname(modulePath)}`;
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
    });
    let browser = await _puppeteer.default.launch(); // { 'devtools': true, 'headless': false })

    try {
      let page = await browser.newPage();
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
    }
  }

  static getName(name) {
    if (_path.default.extname(name) === '') {
      return name;
    } else {
      return this.getName(_path.default.basename(name, _path.default.extname(name)));
    }
  }

  static createScenarioFromFolder(path) {
    let includePattern = ['*.pug']; // let excludePattern = ['*.skip.pug']

    let item = _fsExtra.default.readdirSync(path, {
      'encoding': 'utf-8',
      'withFileTypes': true
    });

    let scenario = [];
    scenario = scenario.concat(item.filter(item => item.isDirectory()).map(folder => this.createScenarioFromFolder(`${path}/${folder.name}`)));
    scenario = scenario.concat(item.filter(item => item.isFile()).filter(file => includePattern.reduce((isMatch, pattern) => isMatch ? isMatch : (0, _minimatch.default)(file.name, pattern), false)) // .filter((file) => !excludePattern.reduce((isMatch, pattern) => isMatch ? isMatch : Match(file.name, pattern), false))
    .map(file => this.createScenarioFromFile(`${path}/${file.name}`)));
    return scenario.flat();
  }

  static createScenarioFromFile(path) {
    return new Scenario(path);
  }

}

exports.Scenario = Scenario;
//# sourceMappingURL=scenario.cjs.map