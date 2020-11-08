
import Node from '../node.js'

class MixinBlockNode extends Node {

  constructor(node, option) {
    super(node, option)
  }

  async getSource() {
    return '__utility.addNode(block, __node)'
  }

}

export default MixinBlockNode