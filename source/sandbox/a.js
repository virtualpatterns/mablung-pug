import '@virtualpatterns/mablung-source-map-support/install'
// import Lex from 'pug-lexer'
// import Load from 'pug-load'
// import Parse from 'pug-parser'

import { Transform } from '../index.js'

const Require = __require

async function main() {

  try {

    let ast = null
    ast = await Transform.getAstFromPath(Require.resolve('./dunno-content.pug'))

    console.dir(ast, { 'depth': null })
        
  } catch (error) {
    console.error(error)
  }

}

main()