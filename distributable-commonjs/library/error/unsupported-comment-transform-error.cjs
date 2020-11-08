"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnsupportedCommentTransformError = void 0;

var _path = _interopRequireDefault(require("path"));

var _transformError = require("./transform-error.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UnsupportedCommentTransformError extends _transformError.TransformError {
  constructor(node) {
    super(`Buffered comments are not supported (${_path.default.relative('', node.filename)}:${node.line}:${node.column}).`);
  }

}

exports.UnsupportedCommentTransformError = UnsupportedCommentTransformError;
//# sourceMappingURL=unsupported-comment-transform-error.cjs.map