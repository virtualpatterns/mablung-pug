
import Node from '../node.js'
import WhenNode from './when-node.js'

class BlockWhenNode extends Node {

  constructor(node, option) {
    super(node, option)
  }

  get isEmpty() {
    return this._node.nodes.length <= 0
  }

  async getSource() {

    let whenNode = null
    whenNode = this._node.nodes.map((whenNode) => new WhenNode(whenNode, this._option))

    let whenSource = null
    whenSource = await Promise.all(whenNode.map((whenNode) => whenNode.getSource()))
    whenSource = whenSource.join('\n')

    return whenSource

  }

}

export default BlockWhenNode