'use strict'

var _escapedStringInterpolation = _interopRequireDefault(
  require('./04-escaped-string-interpolation.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let div = document.querySelector('body div')
let node = (0, _escapedStringInterpolation.default)({})
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
