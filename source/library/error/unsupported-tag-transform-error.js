import Path from 'path'

import { TransformError } from './transform-error.js'

class UnsupportedTagTransformError extends TransformError {

  constructor(node) {
    super(`Self-closing tags are not supported (${Path.relative('', node.filename)}:${node.line}:${node.column}).`)
  }

}

export { UnsupportedTagTransformError }
