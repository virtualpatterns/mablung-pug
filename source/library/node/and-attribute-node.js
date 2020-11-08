
import Node from '../node.js'

class AndAttributeNode extends Node {

  constructor(andAttribute, option) {
    super(andAttribute, option)
    this._andAttribute = andAttribute
  }

  async getSource() {
    return `__utility.addAndAttribute(${this._andAttribute.val}, __attribute)`
  }

}

export default AndAttributeNode