import Escape from 'jsesc';

import Node from '../node.js';

class TextNode extends Node {

  constructor(node, option) {
    super(node, option);
  }

  async getSource() {
    return this._node.val === '' ?
    '__utility.addNode(\'\', __node)' :
    this._node.val === '\n' ?
    '__utility.addNode(\'\\n\', __node)' :
    `__utility.addNode(__utility.convertToNode('${Escape(this._node.val)}'), __node)`; // ${this._node.val}'), __node)` // 
  }}



export default TextNode;
//# sourceMappingURL=text-node.js.map