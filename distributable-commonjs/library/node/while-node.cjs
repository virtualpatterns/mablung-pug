"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _blockNode = _interopRequireDefault(require("./block-node.cjs"));

var _node = _interopRequireDefault(require("../node.cjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EachNode extends _node.default {
  constructor(node, option) {
    super(node, option);
  }

  async getSource() {
    let source = null;
    source = `while ( ${this._node.test} )`;

    if (this._node.block) {
      let blockNode = new _blockNode.default(this._node.block, this._option);
      let blockSource = blockNode.isEmpty ? '' : await blockNode.getSource();
      source = ` ${source} {
                    ${blockSource}
                  }`;
    } else {
      source = `${source} {}`;
    }

    return source;
  }

}

var _default = EachNode;
exports.default = _default;
//# sourceMappingURL=while-node.cjs.map