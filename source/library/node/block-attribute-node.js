
import Node from '../node.js'
import AndAttributeNode from './and-attribute-node.js'
import AttributeNode from './attribute-node.js'

class BlockAttributeNode extends Node {

  constructor(node, option) {
    super(node, option)
  }

  get isEmpty() {
    return (this._node.attrs.length + this._node.attributeBlocks.length) <= 0
  }

  async getSource() {

    let attributeNode = [ ...this._node.attrs.map((node) => new AttributeNode(node, this._option)), ...this._node.attributeBlocks.map((node) => new AndAttributeNode(node, this._option)) ]

    let attributeSource = null
    attributeSource = await Promise.all(attributeNode.map((attributeNode) => attributeNode.getSource()))
    attributeSource = attributeSource.join('\n')

    return attributeSource

  }

}

export default BlockAttributeNode