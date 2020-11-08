import '@virtualpatterns/mablung-source-map-support/install'
import _Bundler from 'esbuild'

const { 'build': Bundle } = _Bundler
const Require = __require

async function main() {

  try {
    
    let preBundlePath = Require.resolve('../sandbox/bundle-pre.js')
    let postBundlePath = 'process/esbuild/bundle-post.js'

    await Bundle({
      'define': {
        'process': 'undefined'
      },
      'entryPoints': [ preBundlePath ],
      'outfile': postBundlePath,
      'minify': false,
      'bundle': true
    })

  } catch (error) {
    console.error(error)
  }

}

main()