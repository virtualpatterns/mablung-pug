'use strict'

var _unescapedStringInterpolationCurlyBraceBrowser = _interopRequireDefault(
  require('./02-unescaped-string-interpolation-curly-brace-browser.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let local = {}
let node = (0, _unescapedStringInterpolationCurlyBraceBrowser.default)(local)
let div = document.querySelector('body div')
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
