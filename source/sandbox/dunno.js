import '@virtualpatterns/mablung-source-map-support/install'
import Browser from 'puppeteer'
import Path from 'path'

import { Scenario } from '../test/library/scenario.js'
import { Transform } from '../library/transform.js'

const FilePath = __filePath
const FolderPath = Path.dirname(FilePath)
const Require = __require

async function main() {

  try {

    let path = Require.resolve('./dunno-content.pug')
    let ast = await Transform.getAstFromPath(path)

    console.log('-'.repeat(80))
    console.log('Transform.getAstFromPath(path)')
    console.log('-'.repeat(80))
    console.dir(ast, { 'depth': null })

    let source = null
    source = await Transform.getFunctionSourceFromPath(path)

    console.log('-'.repeat(80))
    console.log('Transform.getFunctionSourceFromPath(path)')
    console.log('-'.repeat(80))
    console.log(source)

    let fn = await Transform.getFunctionFromPath(path)

    console.log('-'.repeat(80))
    console.log('Transform.getFunctionFromPath(path)')
    console.log('-'.repeat(80))
    console.log(fn.toString())

    let scenario = Scenario.createScenarioFromFile(path)
    let [ referenceHtml, serverHtml, browserHtml ] = await Promise.all([ scenario.getReferenceHtml(), scenario.getServerHtml(), scenario.getBrowserHtml() ])

    console.log('-'.repeat(80))
    console.log('reference')
    console.log('-'.repeat(80))
    console.log(referenceHtml)

    console.log('-'.repeat(80))
    console.log('server')
    console.log('-'.repeat(80))
    console.log(serverHtml)

    console.log('-'.repeat(80))
    console.log('browser')
    console.log('-'.repeat(80))
    console.log(browserHtml)
    console.log('-'.repeat(80))

    // let node = fn({}, Utility)

    // console.log('-'.repeat(80))
    // console.log('node')
    // console.log('-'.repeat(80))
    // console.dir(node, { 'depth': 4 }) 
    // console.log('-'.repeat(80))
    // node.forEach((node) => console.log(Is.string(node) ? node : Format(node.outerHTML))) 
    // console.log('-'.repeat(80))

    // debugger
    
    // let realNode = virtualNode.map((virtualNode) => CreateRealNode(virtualNode)) 
    
    // console.log('-'.repeat(80))
    // console.log('CreateRealNode(virtualNode)')
    // console.log('-'.repeat(80))
    // console.dir(realNode, { 'depth': 4 })
    // console.log('-'.repeat(80))
    // realNode.forEach((realNode) => console.log(Format(realNode.toString()))) 
    // console.log('-'.repeat(80))

    // // let realHTML = virtualNode
    // //   .map((virtualNode) => CreateRealNode(virtualNode))
    // //   .join('\n')

    // // console.log('-'.repeat(80))
    // // console.log('Convert(virtualNode)')
    // // console.log('-'.repeat(80))
    // // console.log(Format(realHTML))
    // // console.log('-'.repeat(80))

  } catch (error) {
    console.error(error)
  }

}

main()