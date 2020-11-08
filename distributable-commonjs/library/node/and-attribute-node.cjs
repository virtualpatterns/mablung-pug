"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _node = _interopRequireDefault(require("../node.cjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AndAttributeNode extends _node.default {
  constructor(andAttribute, option) {
    super(andAttribute, option);
    this._andAttribute = andAttribute;
  }

  async getSource() {
    return `__utility.addAndAttribute(${this._andAttribute.val}, __attribute)`;
  }

}

var _default = AndAttributeNode;
exports.default = _default;
//# sourceMappingURL=and-attribute-node.cjs.map