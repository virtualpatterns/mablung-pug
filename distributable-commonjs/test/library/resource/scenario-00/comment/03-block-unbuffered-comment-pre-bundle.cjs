'use strict'

var _blockUnbufferedComment = _interopRequireDefault(
  require('./03-block-unbuffered-comment.cjs')
)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

let div = document.querySelector('body div')
let node = (0, _blockUnbufferedComment.default)({})
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
