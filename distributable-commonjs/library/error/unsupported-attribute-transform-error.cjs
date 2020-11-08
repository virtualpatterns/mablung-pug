"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnsupportedAttributeTransformError = void 0;

var _path = _interopRequireDefault(require("path"));

var _transformError = require("./transform-error.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UnsupportedAttributeTransformError extends _transformError.TransformError {
  constructor(attribute) {
    super(`Escaped attributes are not supported (${_path.default.relative('', attribute.filename)}:${attribute.line}:${attribute.column}).`);
  }

}

exports.UnsupportedAttributeTransformError = UnsupportedAttributeTransformError;
//# sourceMappingURL=unsupported-attribute-transform-error.cjs.map