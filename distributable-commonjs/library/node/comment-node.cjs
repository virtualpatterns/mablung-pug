"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _node = _interopRequireDefault(require("../node.cjs"));

var _unsupportedCommentTransformError = require("../error/unsupported-comment-transform-error.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CommentNode extends _node.default {
  constructor(node, option) {
    super(node, option);
  }

  async getSource() {
    if (this._node.buffer) {
      // comment appears in html
      throw new _unsupportedCommentTransformError.UnsupportedCommentTransformError(this._node);
    } else {
      // comment appears in javascript
      return `//${this._node.val}`;
    }
  }

}

var _default = CommentNode;
exports.default = _default;
//# sourceMappingURL=comment-node.cjs.map