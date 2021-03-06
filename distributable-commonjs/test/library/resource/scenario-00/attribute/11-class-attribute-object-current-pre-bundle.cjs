'use strict'

var _classAttributeObjectCurrent = _interopRequireDefault(
  require('./11-class-attribute-object-current.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let div = document.querySelector('body div')
let node = (0, _classAttributeObjectCurrent.default)({})
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
