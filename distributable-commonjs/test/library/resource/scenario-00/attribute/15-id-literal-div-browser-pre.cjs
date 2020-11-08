'use strict'

var _idLiteralDivBrowser = _interopRequireDefault(
  require('./15-id-literal-div-browser.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let local = {}
let node = (0, _idLiteralDivBrowser.default)(local)
let div = document.querySelector('body div')
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
