'use strict'

var _andAttributeBrowser = _interopRequireDefault(
  require('./16-and-attribute-browser.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let local = {}
let node = (0, _andAttributeBrowser.default)(local)
let div = document.querySelector('body div')
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
