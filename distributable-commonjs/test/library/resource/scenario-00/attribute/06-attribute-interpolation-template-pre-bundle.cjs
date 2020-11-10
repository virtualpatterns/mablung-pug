'use strict'

var _attributeInterpolationTemplate = _interopRequireDefault(
  require('./06-attribute-interpolation-template.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let div = document.querySelector('body div')
let node = (0, _attributeInterpolationTemplate.default)({})
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
