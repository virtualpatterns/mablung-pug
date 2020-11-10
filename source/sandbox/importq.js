import '@virtualpatterns/mablung-source-map-support/install'
// import DefaultBundle, * as ModuleBundle from 'esbuild'
// import DefaultTraverse, * as ModuleTraverse from '@babel/traverse'
import DefaultLock, * as ModuleLock from 'await-semaphore'

// const { 'build': Bundle } = DefaultBundle || ModuleBundle
// const { 'default': Traverse } = DefaultTraverse || ModuleTraverse
const { Mutex } = DefaultLock || ModuleLock

debugger

async function main() {

  try {

    console.log('Hello, world!')

  } catch (error) {
    console.error(error)
  }

}

main()

