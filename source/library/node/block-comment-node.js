
import Node from '../node.js'

import { UnsupportedCommentTransformError } from '../error/unsupported-comment-transform-error.js'

class BlockCommentNode extends Node {

  constructor(node, option) {
    super(node, option)
  }

  async getSource() {

    if (this._node.buffer) {
      // comment appears in html
      throw new UnsupportedCommentTransformError(this._node)
    } else {

      // comment appears in javascript
      return this._node.block.nodes
        .filter((node) => node.type.toLowerCase() === 'text')
        .filter((node) => node.val != '\n')
        .map((node) => `// ${node.val}`)
        .join('\n')

    }
  
  }

}

export default BlockCommentNode
