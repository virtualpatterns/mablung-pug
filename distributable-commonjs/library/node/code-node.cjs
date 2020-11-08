"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _blockNode = _interopRequireDefault(require("./block-node.cjs"));

var _node = _interopRequireDefault(require("../node.cjs"));

var _unsupportedCodeTransformError = require("../error/unsupported-code-transform-error.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CodeNode extends _node.default {
  constructor(node, option) {
    super(node, option);
  }

  async getSource() {
    if (this._node.buffer) {
      if (this._node.mustEscape) {
        throw new _unsupportedCodeTransformError.UnsupportedCodeTransformError(this._node);
      } else {
        // return `__utility.addNode(${this._node.val}, __node)` // ${await CodeNode.convertToHyperScript(this._node.val)}, __node)`
        return ` {
                    let value = ${this._node.val}
                    if (typeof value === 'string') {
                      __utility.addNode(__utility.convertToNode(value), __node)
                    } else {
                      __utility.addNode(value, __node)
                    }
                  }`;
      }
    } else {
      if (this._node.block) {
        let blockNode = new _blockNode.default(this._node.block, this._option);
        let blockSource = blockNode.isEmpty ? '' : await blockNode.getSource();
        return ` ${this._node.val} { 
                    ${blockSource}
                  }`;
      } else {
        return this._node.val;
      }
    }
  }

}

var _default = CodeNode;
exports.default = _default;
//# sourceMappingURL=code-node.cjs.map