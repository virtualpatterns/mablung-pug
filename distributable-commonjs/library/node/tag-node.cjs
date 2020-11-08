"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _blockAttributeNode = _interopRequireDefault(require("./block-attribute-node.cjs"));

var _blockNode = _interopRequireDefault(require("./block-node.cjs"));

var _node = _interopRequireDefault(require("../node.cjs"));

var _unsupportedTagTransformError = require("../error/unsupported-tag-transform-error.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TagNode extends _node.default {
  constructor(node, option) {
    super(node, option);
  }

  async getSource() {
    if (this._node.selfClosing) {
      throw new _unsupportedTagTransformError.UnsupportedTagTransformError(this._node);
    } else {
      let blockAttributeNode = new _blockAttributeNode.default(this._node, this._option);
      let blockAttributeSource = null;
      blockAttributeSource = await blockAttributeNode.getSource();
      blockAttributeSource = blockAttributeNode.isEmpty ? ' {}' : ` (() => { 
            const __attribute = {}
            ${blockAttributeSource}
            return __attribute
          })()`;
      let blockNode = new _blockNode.default(this._node.block, this._option);
      let blockSource = null;
      blockSource = await blockNode.getSource();
      blockSource = blockNode.isEmpty ? ' []' : ` (() => { 
            const __node = []
            ${blockSource}
            return __node
          })()`;
      return `__utility.addNode(__utility.createNode('${this._node.name}', ${blockAttributeSource}, ${blockSource}), __node)`;
    }
  }

}

var _default = TagNode;
exports.default = _default;
//# sourceMappingURL=tag-node.cjs.map