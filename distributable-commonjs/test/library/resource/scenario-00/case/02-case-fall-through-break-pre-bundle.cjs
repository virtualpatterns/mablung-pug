'use strict'

var _caseFallThroughBreak = _interopRequireDefault(
  require('./02-case-fall-through-break.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let div = document.querySelector('body div')
let node = (0, _caseFallThroughBreak.default)({})
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
