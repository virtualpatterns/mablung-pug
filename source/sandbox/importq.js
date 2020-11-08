import '@virtualpatterns/mablung-source-map-support/install'
// import DefaultBundle, * as ModuleBundle from 'esbuild'
import DefaultTraverse, * as ModuleTraverse from '@babel/traverse'

// const { 'build': Bundle } = DefaultBundle || ModuleBundle
const { 'default': Traverse } = DefaultTraverse || ModuleTraverse

debugger

async function main() {

  try {

    console.log('Hello, world!')

  } catch (error) {
    console.error(error)
  }

}

main()

