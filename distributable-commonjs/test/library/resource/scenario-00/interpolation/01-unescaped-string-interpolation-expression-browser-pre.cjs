'use strict'

var _unescapedStringInterpolationExpressionBrowser = _interopRequireDefault(
  require('./01-unescaped-string-interpolation-expression-browser.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let local = {}
let node = (0, _unescapedStringInterpolationExpressionBrowser.default)(local)
let div = document.querySelector('body div')
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)