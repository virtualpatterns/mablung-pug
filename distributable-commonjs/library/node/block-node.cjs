"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _node = _interopRequireDefault(require("../node.cjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BlockNode extends _node.default {
  constructor(node, option) {
    super(node, option);
  }

  get isEmpty() {
    return this._node.nodes.length <= 0;
  }

  async getSource() {
    if (this.isEmpty) {
      return `// BlockNode.isEmpty = ${this.isEmpty}`;
    } else {
      let childNode = await Promise.all(this._node.nodes.map(childNode => _node.default.createNode(childNode, this._option)));
      let childSource = null;
      childSource = await Promise.all(childNode.map(childNode => childNode.getSource()));
      childSource = childSource.join('\n');
      return childSource;
    }
  }

}

var _default = BlockNode;
exports.default = _default;
//# sourceMappingURL=block-node.cjs.map