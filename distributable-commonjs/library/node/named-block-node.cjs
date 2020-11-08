"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _blockNode = _interopRequireDefault(require("./block-node.cjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NamedBlockNode extends _blockNode.default {
  constructor(node, option) {
    super(node, option);
  }

}

var _default = NamedBlockNode;
exports.default = _default;
//# sourceMappingURL=named-block-node.cjs.map