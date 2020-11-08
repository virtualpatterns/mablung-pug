
import Node from '../node.js';

import { UnsupportedCommentTransformError } from '../error/unsupported-comment-transform-error.js';

class CommentNode extends Node {

  constructor(node, option) {
    super(node, option);
  }

  async getSource() {

    if (this._node.buffer) {
      // comment appears in html
      throw new UnsupportedCommentTransformError(this._node);
    } else {
      // comment appears in javascript
      return `//${this._node.val}`;
    }

  }}



export default CommentNode;
//# sourceMappingURL=comment-node.js.map