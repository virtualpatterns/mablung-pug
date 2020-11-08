"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _node = _interopRequireDefault(require("../node.cjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BlankNode extends _node.default {
  constructor(node, option) {
    super(node, option);
  }

  async getSource() {}

}

var _default = BlankNode;
exports.default = _default;
//# sourceMappingURL=blank-node.cjs.map