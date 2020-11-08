"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnsupportedTagTransformError = void 0;

var _path = _interopRequireDefault(require("path"));

var _transformError = require("./transform-error.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UnsupportedTagTransformError extends _transformError.TransformError {
  constructor(node) {
    super(`Self-closing tags are not supported (${_path.default.relative('', node.filename)}:${node.line}:${node.column}).`);
  }

}

exports.UnsupportedTagTransformError = UnsupportedTagTransformError;
//# sourceMappingURL=unsupported-tag-transform-error.cjs.map