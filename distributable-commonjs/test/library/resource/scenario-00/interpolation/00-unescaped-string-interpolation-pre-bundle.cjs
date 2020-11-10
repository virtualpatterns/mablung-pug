'use strict'

var _unescapedStringInterpolation = _interopRequireDefault(
  require('./00-unescaped-string-interpolation.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let div = document.querySelector('body div')
let node = (0, _unescapedStringInterpolation.default)({})
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
