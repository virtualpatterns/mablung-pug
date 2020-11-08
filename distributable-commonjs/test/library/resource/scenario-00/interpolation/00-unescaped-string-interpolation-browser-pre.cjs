'use strict'

var _unescapedStringInterpolationBrowser = _interopRequireDefault(
  require('./00-unescaped-string-interpolation-browser.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let local = {}
let node = (0, _unescapedStringInterpolationBrowser.default)(local)
let div = document.querySelector('body div')
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
