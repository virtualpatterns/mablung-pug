import { TransformError } from './transform-error.js'

class UnrecognizedMessageTransformError extends TransformError {

  constructor(message) {
    super(`The message '${message}' is not recognized.`)
  }

}

export { UnrecognizedMessageTransformError }
