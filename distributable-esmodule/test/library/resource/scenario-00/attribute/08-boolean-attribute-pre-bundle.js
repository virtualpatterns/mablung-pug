import ContentFn from './08-boolean-attribute.js'
let div = document.querySelector('body div')
let node = ContentFn({})
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
