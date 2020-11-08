"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _node = _interopRequireDefault(require("../node.cjs"));

var _unsupportedAttributeTransformError = require("../error/unsupported-attribute-transform-error.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AttributeNode extends _node.default {
  constructor(attribute, option) {
    super(attribute, option);
    this._attribute = attribute;
  }

  async getSource() {
    if (this._attribute.mustEscape) {
      throw new _unsupportedAttributeTransformError.UnsupportedAttributeTransformError(this._attribute);
    } else {
      return `__utility.addAttribute('${this._attribute.name}', ${this._attribute.val}, __attribute)`;
    }
  }

}

var _default = AttributeNode;
exports.default = _default;
//# sourceMappingURL=attribute-node.cjs.map