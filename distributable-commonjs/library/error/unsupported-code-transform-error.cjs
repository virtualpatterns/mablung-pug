"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnsupportedCodeTransformError = void 0;

var _path = _interopRequireDefault(require("path"));

var _transformError = require("./transform-error.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UnsupportedCodeTransformError extends _transformError.TransformError {
  constructor(node) {
    super(`Buffered, escaped code is not supported (${_path.default.relative('', node.filename)}:${node.line}:${node.column}).`);
  }

}

exports.UnsupportedCodeTransformError = UnsupportedCodeTransformError;
//# sourceMappingURL=unsupported-code-transform-error.cjs.map