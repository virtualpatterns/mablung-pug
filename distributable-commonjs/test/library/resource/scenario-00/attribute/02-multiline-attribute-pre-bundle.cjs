'use strict'

var _multilineAttribute = _interopRequireDefault(
  require('./02-multiline-attribute.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let div = document.querySelector('body div')
let node = (0, _multilineAttribute.default)({})
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
