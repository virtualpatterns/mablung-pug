'use strict'

var _mixinAttributesAnd = _interopRequireDefault(
  require('./04-mixin-attributes-and.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let div = document.querySelector('body div')
let node = (0, _mixinAttributesAnd.default)({})
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
