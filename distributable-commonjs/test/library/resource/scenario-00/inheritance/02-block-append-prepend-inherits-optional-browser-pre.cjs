'use strict'

var _blockAppendPrependInheritsOptionalBrowser = _interopRequireDefault(
  require('./02-block-append-prepend-inherits-optional-browser.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let local = {}
let node = (0, _blockAppendPrependInheritsOptionalBrowser.default)(local)
let div = document.querySelector('body div')
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
