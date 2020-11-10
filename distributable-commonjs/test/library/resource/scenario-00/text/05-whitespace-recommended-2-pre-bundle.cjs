'use strict'

var _whitespaceRecommended = _interopRequireDefault(
  require('./05-whitespace-recommended-2.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let div = document.querySelector('body div')
let node = (0, _whitespaceRecommended.default)({})
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
