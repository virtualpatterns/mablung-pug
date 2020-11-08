import '@virtualpatterns/mablung-source-map-support/install'
// import DefaultConvert, * as ModuleConvert from 'html-to-hyperscript'
// import Escape from 'jsesc'

import { Utility } from '../library/utility.js'

// const { 'htmlToHs2': Convert } = (DefaultConvert || ModuleConvert) // ()

async function main() {

  try {

    let value = '<a href="http://links.com">http://links.com</a>'
    // let value = '<!--[if IE 8]>\n<html lang="en" class="lt-ie9">\n<![endif]-->\n<!--[if gt IE 8]><!-->\n<html lang="en">\n<!--<![endif]-->'
    // let value = "//<![CDATA[\nconsole.log(`Hello, ${'world'}!`)\n//]]>"
    // let value = 'console.log(`Hello, ${\'world\'}!`);'
      
    // console.dir(Convert({ 'syntax': 'h', 'tabSize': 2 }, value))
    console.dir(Utility.convertToNode(value).outerHTML)

  } catch (error) {
    console.error(error)
  }

}

main()