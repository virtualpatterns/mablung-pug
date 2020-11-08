"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnsupportedDocTypeTransformError = void 0;

var _path = _interopRequireDefault(require("path"));

var _transformError = require("./transform-error.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UnsupportedDocTypeTransformError extends _transformError.TransformError {
  constructor(node) {
    super(`The doctype declaration is not supported (${_path.default.relative('', node.filename)}:${node.line}:${node.column}).`);
  }

}

exports.UnsupportedDocTypeTransformError = UnsupportedDocTypeTransformError;
//# sourceMappingURL=unsupported-doctype-transform-error.cjs.map