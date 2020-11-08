"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _blockNode = _interopRequireDefault(require("./block-node.cjs"));

var _node = _interopRequireDefault(require("../node.cjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WhenNode extends _node.default {
  constructor(node, option) {
    super(node, option);
  }

  async getSource() {
    if (this._node.block) {
      let blockNode = new _blockNode.default(this._node.block, this._option);
      let blockSource = blockNode.isEmpty ? '' : await blockNode.getSource();

      if (this._node.expr === 'default') {
        return ` default: 
                    ${blockSource}`;
      } else {
        if (this._node.block.nodes.length === 1 && this._node.block.nodes[0].type.toLowerCase() === 'code' && this._node.block.nodes[0].val === 'break') {
          return ` case ${this._node.expr}: 
                      break`;
        } else {
          return ` case ${this._node.expr}: 
                      ${blockSource}
                      break`;
        }
      }
    } else {
      return `case ${this._node.expr}:`;
    }
  }

}

var _default = WhenNode;
exports.default = _default;
//# sourceMappingURL=when-node.cjs.map