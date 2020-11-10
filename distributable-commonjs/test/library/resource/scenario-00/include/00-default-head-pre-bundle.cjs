'use strict'

var _defaultHead = _interopRequireDefault(require('./00-default-head.cjs'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let div = document.querySelector('body div')
let node = (0, _defaultHead.default)({})
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
