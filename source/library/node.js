// import DefaultConvert, * as ModuleConvert from 'html-to-hyperscript'
import DefaultChangeCase, * as ModuleChangeCase from 'change-case'
import Path from 'path'

// const { 'htmlToHs': Convert } = DefaultConvert || ModuleConvert
const { 'paramCase': ParameterCase } = DefaultChangeCase || ModuleChangeCase
const FilePath = __filePath

class Node {

  constructor(node, option) {
    this._node = node
    this._option = option
  }

  async getSource() {}

  static async createNode(node, option) {

    let extension = null
    extension = Path.extname(FilePath)
    extension = extension.toLowerCase()

    let nodeClass = null
    nodeClass = await import(`./node/${ParameterCase(node.type)}-node${extension}`)
    nodeClass = nodeClass.default || nodeClass

    return new nodeClass(node, option)

  }

  // static async convertToHyperScript(...parameter) {
  //   return this._convert(...parameter).replace(/h\((.*?)\)/gims, '__utility.createNode($1)')
  // }

}

// Node._convert = Convert({ 'syntax': 'h', 'tabSize': 2 })

export default Node