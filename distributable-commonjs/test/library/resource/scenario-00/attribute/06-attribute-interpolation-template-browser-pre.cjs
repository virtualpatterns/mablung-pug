'use strict'

var _attributeInterpolationTemplateBrowser = _interopRequireDefault(
  require('./06-attribute-interpolation-template-browser.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let local = {}
let node = (0, _attributeInterpolationTemplateBrowser.default)(local)
let div = document.querySelector('body div')
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
