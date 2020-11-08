
import BlockWhenNode from './block-when-node.js'
import Node from '../node.js'

class CaseNode extends Node {

  constructor(node, option) {
    super(node, option)
  }

  async getSource() {

    let blockWhenNode = new BlockWhenNode(this._node.block, this._option)

    let blockWhenSource = null
    blockWhenSource = await blockWhenNode.getSource()
    blockWhenSource = blockWhenNode.isEmpty ? 
      ' {}' : 
      ` { 
          ${blockWhenSource}
        }`

    return  ` switch(${this._node.expr}) ${blockWhenSource}`

  }

}

export default CaseNode