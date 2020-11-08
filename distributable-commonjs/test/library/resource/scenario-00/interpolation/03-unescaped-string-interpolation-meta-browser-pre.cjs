'use strict'

var _unescapedStringInterpolationMetaBrowser = _interopRequireDefault(
  require('./03-unescaped-string-interpolation-meta-browser.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let local = {}
let node = (0, _unescapedStringInterpolationMetaBrowser.default)(local)
let div = document.querySelector('body div')
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
