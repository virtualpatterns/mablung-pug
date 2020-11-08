'use strict'

var _classAttributeObjectCurrentBrowser = _interopRequireDefault(
  require('./11-class-attribute-object-current-browser.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let local = {}
let node = (0, _classAttributeObjectCurrentBrowser.default)(local)
let div = document.querySelector('body div')
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
