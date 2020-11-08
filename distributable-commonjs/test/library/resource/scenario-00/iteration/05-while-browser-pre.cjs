'use strict'

var _whileBrowser = _interopRequireDefault(require('./05-while-browser.cjs'))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let local = {}
let node = (0, _whileBrowser.default)(local)
let div = document.querySelector('body div')
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
