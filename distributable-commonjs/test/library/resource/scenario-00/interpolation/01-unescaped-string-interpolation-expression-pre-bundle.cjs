'use strict'

var _unescapedStringInterpolationExpression = _interopRequireDefault(
  require('./01-unescaped-string-interpolation-expression.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let div = document.querySelector('body div')
let node = (0, _unescapedStringInterpolationExpression.default)({})
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
