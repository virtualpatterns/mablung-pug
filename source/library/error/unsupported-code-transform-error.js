import Path from 'path'

import { TransformError } from './transform-error.js'

class UnsupportedCodeTransformError extends TransformError {

  constructor(node) {
    super(`Buffered, escaped code is not supported (${Path.relative('', node.filename)}:${node.line}:${node.column}).`)
  }

}

export { UnsupportedCodeTransformError }
