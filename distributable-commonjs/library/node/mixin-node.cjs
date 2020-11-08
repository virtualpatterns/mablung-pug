"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toJsIdentifier = _interopRequireDefault(require("to-js-identifier"));

var _blockAttributeNode = _interopRequireDefault(require("./block-attribute-node.cjs"));

var _blockNode = _interopRequireDefault(require("./block-node.cjs"));

var _node = _interopRequireDefault(require("../node.cjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MixinNode extends _node.default {
  constructor(node, option) {
    super(node, option);
  }

  async getSource() {
    let source = null;

    if (this._node.call) {
      let blockAttributeNode = new _blockAttributeNode.default(this._node, this._option);
      let blockAttributeSource = null;
      blockAttributeSource = await blockAttributeNode.getSource();
      blockAttributeSource = blockAttributeNode.isEmpty ? undefined : `(() => { 
           const __attribute = {}
           ${blockAttributeSource}
           return __attribute
         })()`;
      let blockNode = null;
      let blockSource = null;

      if (this._node.block) {
        blockNode = new _blockNode.default(this._node.block, this._option);
        blockSource = await blockNode.getSource();
        blockSource = blockNode.isEmpty ? ' []' : ` (() => { 
              const __node = []
              ${blockSource}
              return __node
            })()`;
      } else {
        blockSource = undefined;
      }

      source = ` __utility.addNode(
                    __mixin__${(0, _toJsIdentifier.default)(this._node.name)}(
                      ${blockAttributeSource},
                      ${blockSource}
                      ${this._node.args ? `, ${this._node.args}` : ''}
                    ),
                    __node
                  )`;
    } else {
      let blockNode = new _blockNode.default(this._node.block, this._option);
      let blockSource = await blockNode.getSource();
      source = ` function __mixin__${(0, _toJsIdentifier.default)(this._node.name)}(attribute, block${this._node.args ? `, ${this._node.args}` : ''}) {
                    const attributes = attribute
                    const __node = []
                    ${blockSource}
                    return __node
                  }`;
    }

    return source;
  }

}

var _default = MixinNode;
exports.default = _default;
//# sourceMappingURL=mixin-node.cjs.map