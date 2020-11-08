import Path from 'path'

import { TransformError } from './transform-error.js'

class UnsupportedAttributeTransformError extends TransformError {

  constructor(attribute) {
    super(`Escaped attributes are not supported (${Path.relative('', attribute.filename)}:${attribute.line}:${attribute.column}).`)
  }

}

export { UnsupportedAttributeTransformError }
