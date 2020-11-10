import Filter from 'pug-filters'

import Node from '../node.js'

class FilterNode extends Node {

  constructor(node, option) {
    super(node, option)
  }

  async getSource() {

    // console.log('-'.repeat(80))
    // console.log('BEFORE FilterNode._node')
    // console.log('-'.repeat(80))
    // console.dir(this._node, { 'depth': null })

    Filter.handleFilters(this._node)

    // console.log('-'.repeat(80))
    // console.log('AFTER FilterNode._node')
    // console.log('-'.repeat(80))
    // console.dir(this._node, { 'depth': null })

    let node = await Node.createNode(this._node, this._option)
    let source = await node.getSource()

    return source

  }

}

export default FilterNode