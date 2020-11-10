import DefaultSemaphore, * as ModuleSemaphore from 'await-semaphore'
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
const { Mutex } = DefaultSemaphore || ModuleSemaphore
const FilePath = __filePath
const Require = __require

class Scenario {

  constructor(path) {

    let modifierPattern = /\.(\w*?)[./]/gims
    let modifier = []

    let match = null

    while (Is.not.null(match = modifierPattern.exec(path))) {
      modifier.push(match[1])
      modifierPattern.lastIndex --
    }

    let name = Scenario.getName(path)

    let localPath = `${Path.dirname(path)}/${name}.json`
    let local = {}
  
    if (FileSystem.pathExistsSync(localPath)) {
      local = JSON5.parse(FileSystem.readFileSync(localPath, { 'encoding': 'utf-8' }))
    }
  
    this._path = path
    this._modifier = modifier

    this._name = name
    this._local = local

    this._lock = new Mutex()

  }

  get path() {
    return this._path
  }

  get modifier() {
    return this._modifier
  }

  get name() {
    return this._name
  }

  get local() {
    return this._local
  }

  async getReferenceHtml() {

    let html = null
    html = Pug.compileFile(this._path)(this._local)
    html = Format(html)

    html = html.replace(/<(.*?) \/>/gms, '<$1>')

    return html

  }

  async createModule() {
    return Transform.createModuleFromPath(this._path, `${Path.dirname(this._path)}/${this._name}${Path.extname(FilePath)}`, { 'utility': Path.relative(Path.dirname(this._path), Require.resolve(`../../library/utility${Path.extname(FilePath)}`)) })
  }

  getNodeHtml(node) {
    return node
      .map((node) => Is.string(node) ? document.createTextNode(node).textContent : node.outerHTML) 
      .join('')
  }

  async getServerHtml() {

    let modulePath = await this._lock.use(() => this.createModule())
    let module = await import(modulePath)

    let fn = module.default
    let node = fn(this._local)

    let html = null
    html = this.getNodeHtml(node)
    html = Format(html)

    return html
    
  }

  async getSource(modulePath) {

    let source = null
    source =  ` import ContentFn from './${Path.relative(Path.dirname(modulePath), modulePath)}'
                let div = document.querySelector('body div')
                let node = ContentFn(${JSON.stringify(this._local)})
                node.forEach((node) => div.appendChild(typeof node === 'string' ? document.createTextNode(node) : node))`
    
    source = await Transform.formatSource(source)

    return source

  }

  async getBrowserHtml() {

    let modulePath = await this._lock.use(() => this.createModule())
    let source = await this.getSource(modulePath)
   
    let preBundlePath = `${Path.dirname(modulePath)}/${Path.basename(modulePath, Path.extname(modulePath))}-pre-bundle${Path.extname(modulePath)}`
    let postBundlePath = `${Path.dirname(modulePath)}/${Path.basename(modulePath, Path.extname(modulePath))}-post-bundle${Path.extname(modulePath)}`

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
    
    let browser = await Browser.launch() // { 'devtools': true, 'headless': false })

    try {
    
      let page = await browser.newPage()

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

  } 
  
  static getName(name) {

    if (Path.extname(name) === '') {
      return name
    } else {
      return this.getName(Path.basename(name, Path.extname(name)))
    }

  }

  static createScenarioFromFolder(path) {

    let includePattern = ['*.pug']
    // let excludePattern = ['*.skip.pug']
  
    let item = FileSystem.readdirSync(path, { 'encoding': 'utf-8', 'withFileTypes': true })
  
    let scenario = []

    scenario = scenario.concat(item
      .filter((item) => item.isDirectory())
      .map((folder) => this.createScenarioFromFolder(`${path}/${folder.name}`)))
    
    scenario = scenario.concat(item
      .filter((item) => item.isFile())
      .filter((file) => includePattern.reduce((isMatch, pattern) => isMatch ? isMatch : Match(file.name, pattern), false))
      // .filter((file) => !excludePattern.reduce((isMatch, pattern) => isMatch ? isMatch : Match(file.name, pattern), false))
      .map((file) => this.createScenarioFromFile(`${path}/${file.name}`)))
  
    return scenario.flat()
  
  }
  
  static createScenarioFromFile(path) {
    return new Scenario(path)
  }

}

export { Scenario }