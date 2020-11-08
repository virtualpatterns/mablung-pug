
import Node from '../node.js';

class BlockNode extends Node {

  constructor(node, option) {
    super(node, option);
  }

  get isEmpty() {
    return this._node.nodes.length <= 0;
  }

  async getSource() {

    if (this.isEmpty) {
      return `// BlockNode.isEmpty = ${this.isEmpty}`;
    } else {

      let childNode = await Promise.all(this._node.nodes.map(childNode => Node.createNode(childNode, this._option)));

      let childSource = null;
      childSource = await Promise.all(childNode.map(childNode => childNode.getSource()));
      childSource = childSource.join('\n');

      return childSource;

    }

  }}



export default BlockNode;
//# sourceMappingURL=block-node.js.map