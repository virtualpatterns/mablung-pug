'use strict'

var _unescapedStringInterpolationMeta = _interopRequireDefault(
  require('./03-unescaped-string-interpolation-meta.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let div = document.querySelector('body div')
let node = (0, _unescapedStringInterpolationMeta.default)({})
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
