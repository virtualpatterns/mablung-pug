"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _node = _interopRequireDefault(require("../node.cjs"));

var _andAttributeNode = _interopRequireDefault(require("./and-attribute-node.cjs"));

var _attributeNode = _interopRequireDefault(require("./attribute-node.cjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BlockAttributeNode extends _node.default {
  constructor(node, option) {
    super(node, option);
  }

  get isEmpty() {
    return this._node.attrs.length + this._node.attributeBlocks.length <= 0;
  }

  async getSource() {
    let attributeNode = [...this._node.attrs.map(node => new _attributeNode.default(node, this._option)), ...this._node.attributeBlocks.map(node => new _andAttributeNode.default(node, this._option))];
    let attributeSource = null;
    attributeSource = await Promise.all(attributeNode.map(attributeNode => attributeNode.getSource()));
    attributeSource = attributeSource.join('\n');
    return attributeSource;
  }

}

var _default = BlockAttributeNode;
exports.default = _default;
//# sourceMappingURL=block-attribute-node.cjs.map