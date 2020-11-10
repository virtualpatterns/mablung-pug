'use strict'

var _unescapedStringInterpolationCurlyBrace = _interopRequireDefault(
  require('./02-unescaped-string-interpolation-curly-brace.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let div = document.querySelector('body div')
let node = (0, _unescapedStringInterpolationCurlyBrace.default)({})
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
