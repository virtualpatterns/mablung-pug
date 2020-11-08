import Path from 'path'

import { TransformError } from './transform-error.js'

class UnsupportedCommentTransformError extends TransformError {

  constructor(node) {
    super(`Buffered comments are not supported (${Path.relative('', node.filename)}:${node.line}:${node.column}).`)
  }

}

export { UnsupportedCommentTransformError }
