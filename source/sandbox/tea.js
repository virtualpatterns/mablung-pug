import '@virtualpatterns/mablung-source-map-support/install'
import DefaultElement, * as ModuleElement from 'html-element'

const { document } = DefaultElement || ModuleElement

async function main() {

  try {

    let node = document.createTextNode('.')
    debugger
    console.dir(node.textContent)

  } catch (error) {
    console.error(error)
  }

}

main()

