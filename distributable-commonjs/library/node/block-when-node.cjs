"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _node = _interopRequireDefault(require("../node.cjs"));

var _whenNode = _interopRequireDefault(require("./when-node.cjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BlockWhenNode extends _node.default {
  constructor(node, option) {
    super(node, option);
  }

  get isEmpty() {
    return this._node.nodes.length <= 0;
  }

  async getSource() {
    let whenNode = null;
    whenNode = this._node.nodes.map(whenNode => new _whenNode.default(whenNode, this._option));
    let whenSource = null;
    whenSource = await Promise.all(whenNode.map(whenNode => whenNode.getSource()));
    whenSource = whenSource.join('\n');
    return whenSource;
  }

}

var _default = BlockWhenNode;
exports.default = _default;
//# sourceMappingURL=block-when-node.cjs.map