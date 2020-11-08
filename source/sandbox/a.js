import '@virtualpatterns/mablung-source-map-support/install'
import h from 'hyperscript'
import Utility from '../library/utility.js'

async function main() {

  try {
 
    console.log(h('div', { 'class': 'element' }, [ 'hey' ]).outerHTML)
    console.log(Utility.createNode('div', { 'class': 'element' }, [ 'hey' ]).outerHTML)

  } catch (error) {
    console.error(error)
  }

}

main()