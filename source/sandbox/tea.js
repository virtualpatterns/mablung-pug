import '@virtualpatterns/mablung-source-map-support/install'

import { Transform } from '../library/transform.js'

const Require = __require

async function main() {

  try {

    let utilityPath = Require.resolve('../library/utility.js')

    let sourcePath = Require.resolve('./tea-content.pug')
    let targetPath = await Transform.createModuleFromPath(sourcePath, undefined, { 'utility': utilityPath })

    let module = await import(targetPath)
    let fn = module.default


    
  } catch (error) {
    console.error(error)
  }

}

main()

