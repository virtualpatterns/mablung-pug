import '@virtualpatterns/mablung-source-map-support/install'

async function main() {

  let _window = null
  _window = await import('html-element')
  _window = _window.default

  // const _window = typeof window === 'undefined' ? (await import('html-element')) : window

  try {
    console.dir(_window.document.createTextNode('abc'))
  } catch (error) {
    console.error(error)
  }

}

main()