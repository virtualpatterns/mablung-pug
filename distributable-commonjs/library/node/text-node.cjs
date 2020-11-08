"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsesc = _interopRequireDefault(require("jsesc"));

var _node = _interopRequireDefault(require("../node.cjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TextNode extends _node.default {
  constructor(node, option) {
    super(node, option);
  }

  async getSource() {
    return this._node.val === '' ? '__utility.addNode(\'\', __node)' : this._node.val === '\n' ? '__utility.addNode(\'\\n\', __node)' : `__utility.addNode(__utility.convertToNode('${(0, _jsesc.default)(this._node.val)}'), __node)`; // ${this._node.val}'), __node)` // 
  }

}

var _default = TextNode;
exports.default = _default;
//# sourceMappingURL=text-node.cjs.map