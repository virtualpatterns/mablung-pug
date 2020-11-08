
import BlockNode from './block-node.js';
import Node from '../node.js';

class EachNode extends Node {

  constructor(node, option) {
    super(node, option);
  }

  async getSource() {

    let source = null;
    source = `while ( ${this._node.test} )`;

    if (this._node.block) {

      let blockNode = new BlockNode(this._node.block, this._option);
      let blockSource = blockNode.isEmpty ? '' : await blockNode.getSource();

      source = ` ${source} {
                    ${blockSource}
                  }`;

    } else {
      source = `${source} {}`;
    }

    return source;

  }}



export default EachNode;
//# sourceMappingURL=while-node.js.map