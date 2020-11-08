"use strict";

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _pretty = _interopRequireDefault(require("pretty"));

var _ava = _interopRequireDefault(require("ava"));

var _transform = require("./transform.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const FilePath = __filename;
const Require = require;
(0, _ava.default)('--help', async test => {
  let code = await new Promise(resolve => {
    new _transform.Transform({
      '--help': true
    }).once('exit', resolve);
  });
  test.is(code, 0);
});
(0, _ava.default)('help create-module', async test => {
  let code = await new Promise(resolve => {
    new _transform.Transform({
      'help': 'create-module'
    }).once('exit', resolve);
  });
  test.is(code, 0);
});
(0, _ava.default)('create-module <source-path>', async test => {
  let sourcePath = Require.resolve('./resource/transform-00.pug');
  let targetPath = `${_path.default.dirname(sourcePath)}/${_path.default.basename(sourcePath, _path.default.extname(sourcePath))}${_path.default.extname(FilePath)}`;
  let code = await new Promise(resolve => {
    new _transform.Transform({
      'create-module': true,
      [sourcePath]: true,
      [targetPath]: true,
      '--encoding': 'utf-8',
      '--flag': 'wx',
      '--utility': _path.default.relative(_path.default.dirname(sourcePath), Require.resolve("../../library/utility.cjs"))
    }).once('exit', resolve);
  });
  test.is(code, 0);
  test.true(await _fsExtra.default.pathExists(targetPath)); // __transformPath does ...
  //   URL.pathToFileURL if the environment is ESModule
  //   require.resolve if the environment is CommonJS

  let module = await Promise.resolve(`${require.resolve(targetPath)}`).then(s => _interopRequireWildcard(require(s)));
  let fn = module.default || module;
  let node = fn();
  let html = null;
  html = node[0].outerHTML;
  html = (0, _pretty.default)(html);
  test.log(html);
  test.is(html, '<a href="//google.com">Google</a>');
});
//# sourceMappingURL=transform.test.cjs.map