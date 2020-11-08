"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Package = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _json = _interopRequireDefault(require("json5"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Require = require;

const Package = _json.default.parse(_fsExtra.default.readFileSync(Require.resolve('../../package.json'), {
  'encoding': 'utf-8'
}));

exports.Package = Package;
//# sourceMappingURL=package.cjs.map