'use strict'

var _whitespaceNotRecommended = _interopRequireDefault(
  require('./06-whitespace-not-recommended.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let div = document.querySelector('body div')
let node = (0, _whitespaceNotRecommended.default)({})
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
