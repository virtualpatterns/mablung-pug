import Path from 'path'

import { TransformError } from './transform-error.js'

class UnsupportedDocTypeTransformError extends TransformError {

  constructor(node) {
    super(`The doctype declaration is not supported (${Path.relative('', node.filename)}:${node.line}:${node.column}).`)
  }

}

export { UnsupportedDocTypeTransformError }
