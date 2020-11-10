'use strict'

var _defaultInherits = _interopRequireDefault(
  require('./00-default-inherits.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let div = document.querySelector('body div')
let node = (0, _defaultInherits.default)({})
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)