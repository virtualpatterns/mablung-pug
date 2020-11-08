import Browser from 'puppeteer'
import DefaultBundle, * as ModuleBundle from 'esbuild'
import DefaultElement, * as ModuleElement from 'html-element'
import FileSystem from 'fs-extra'
import Format from 'pretty'
import Is from '@pwn/is'
import JSON5 from 'json5'
import Match from 'minimatch'
import Path from 'path'
import Pug from 'pug'

import { Transform } from '../../index.js'

const { 'build': Bundle } = DefaultBundle || ModuleBundle
const { document } = DefaultElement || ModuleElement
const FilePath = __filePath
const Require = __require

class Scenario {

  constructor(path, local = {}) {

    let modifierPattern = /\.(\w*?)[./]/gims
    let modifier = []

    let match = null

    while (Is.not.null(match = modifierPattern.exec(path))) {
      modifier.push(match[1])
      modifierPattern.lastIndex --
    }

    this._path = path
    this._local = local
    this._modifier = modifier

  }

  get path() {
    return this._path
  }

  get local() {
    return this._local
  }

  get modifier() {
    return this._modifier
  }

  async getReferenceHtml() {

    let html = null
    html = Pug.compileFile(this._path)(this._local)
    html = Format(html)

    html = html.replace(/<(.*?) \/>/gim, '<$1>')

    return html

  }

  async getServerHtml() {

    let name = Scenario.getName(this._path)
    let extension = Path.extname(FilePath)

    let sourcePath = this._path
    let targetPath = `${Path.dirname(sourcePath)}/${name}-server${extension}`
    let utilityPath = Path.relative(Path.dirname(targetPath), Require.resolve(`../../library/utility${extension}`))

    await Transform.createModuleFromPath(sourcePath, targetPath, { 'utility': utilityPath })

    // __transformPath does ...
    //   URL.pathToFileURL if the environment is ESModule
    //   require.resolve if the environment is CommonJS
    let module = await import(__transformPath(targetPath))
    let fn = module.default || module
    let node = fn(this._local)

    let html = null
    html = node.map((node) => Is.string(node) ? document.createTextNode(node).textContent : node.outerHTML) 
    html = html.join('')
    html = Format(html)

    return html
    
  }

  async getBrowserHtml() {

    let name = Scenario.getName(this._path)
    let extension = Path.extname(FilePath)

    let sourcePath = this._path
    let targetPath = `${Path.dirname(sourcePath)}/${name}-browser${extension}`
    let utilityPath = Path.relative(Path.dirname(targetPath), Require.resolve(`../../library/utility${extension}`))

    await Transform.createModuleFromPath(sourcePath, targetPath, { 'utility': utilityPath })

    let source = null
    source = `  import ContentFn from './${Path.relative(Path.dirname(sourcePath), targetPath)}'
                let local = ${JSON.stringify(this._local)}
                let node = ContentFn(local)
                let div = document.querySelector('body div')
                node.forEach((node) => div.appendChild(typeof node === 'string' ? document.createTextNode(node) : node))`
   
    source = await Transform.formatSource(source)
    
    let preBundlePath = `${Path.dirname(sourcePath)}/${name}-browser-pre${extension}`
    let postBundlePath = `${Path.dirname(sourcePath)}/${name}-browser-post${extension}`

    await FileSystem.ensureDir(Path.dirname(preBundlePath))
    await FileSystem.writeFile(preBundlePath, source, { 'encoding': 'utf-8', 'flag': 'wx' })

    await Bundle({
      'define': {
        'global': '\'global\'',
        'process.env.NODE_DEBUG': '\'process.env.NODE_DEBUG\'',
        'process': '\'process\''
      },
      'entryPoints': [ preBundlePath ],
      'outfile': postBundlePath,
      'minify': false,
      'bundle': true
    })

    // let host = '0.0.0.0'
    // let port = Path.extname(FilePath) === '.cjs' ? 8080 : 8081

    // Server.start({
    //   'host': host,
    //   'port': port,
    //   'logLevel': 0,
    //   'mount': [
    //     [ '/', `${FolderPath}/www` ],
    //     [ '/favicon.ico', `${FolderPath}/www/resource/application.ico` ]
    //   ],
    //   'open': false
    // })

    // try {
    
    let browser = await Browser.launch() // { 'devtools': true, 'headless': false })

    try {
    
      let page = await browser.newPage()

      // page.on('console', async (message) => {

      //   switch (message.type().toLowerCase()) {
      //     case 'log':
      //       console.log(message.text())
      //       break
      //     case 'dir':
      //       console.dir(await message.args()[0].jsonValue(), { 'depth': null })
      //       break
      //   }

      // })

      // await page.goto(`http://${host}:${port}/index.html`)
      let content = null
      content = ` <!DOCTYPE html>
                  <html>
                    <head>
                      <meta   charset="utf-8">
                      <meta   name="viewport"
                              content="width=device-width">
                    </head>
                    <body>
                      <div></div>
                    </body>
                  </html>`
      
      content = Format(content)
      
      await page.setContent(content, { 'timeout': 0, 'waitUntil': 'domcontentloaded' })
      await page.evaluate(await FileSystem.readFile(postBundlePath, { 'encoding': 'utf-8' }))
      
      let div = await page.$('body div')

      let html = null
      html = await div.evaluate((node) => node.innerHTML)
      html = Format(html)

      return html
      
    } finally {
      await browser.close()
    }

    // } finally {
    //   Server.shutdown()
    // }

  } 
  
  static getName(name) {

    if (Path.extname(name) === '') {
      return name
    } else {
      return this.getName(Path.basename(name, Path.extname(name)))
    }

  }

  static createScenarioFromFolder(path, includePattern = [ '*.pug' ], excludePattern = [ '*.skip.pug' ]) {
  
    let item = FileSystem.readdirSync(path, { 'encoding': 'utf-8', 'withFileTypes': true })
  
    let scenario = []

    scenario = scenario.concat(item
      .filter((item) => item.isDirectory())
      .map((folder) => this.createScenarioFromFolder(`${path}/${folder.name}`, includePattern, excludePattern)))

    scenario = scenario.concat(item
      .filter((item) => item.isFile())
      .filter((file) => includePattern.reduce((isMatch, pattern) => isMatch ? isMatch : Match(file.name, pattern), false))
      .filter((file) => !excludePattern.reduce((isMatch, pattern) => isMatch ? isMatch : Match(file.name, pattern), false))
      .map((file) => this.createScenarioFromFile(`${path}/${file.name}`)))
  
    return scenario.flat()
  
  }
  
  static createScenarioFromFile(path) {

    let localPath = `${Path.dirname(path)}/${this.getName(path)}-local.json`
    let local = {}
  
    if (FileSystem.pathExistsSync(localPath)) {
      local = JSON5.parse(FileSystem.readFileSync(localPath, { 'encoding': 'utf-8' }))
    }
  
    return new Scenario(path, local)
  
  }

}

export { Scenario }