import ContentFn from './02-nested-filter-browser.js'
let local = {}
let node = ContentFn(local)
let div = document.querySelector('body div')
node.forEach((node) =>
  div.appendChild(
    typeof node === 'string' ? document.createTextNode(node) : node
  )
)
