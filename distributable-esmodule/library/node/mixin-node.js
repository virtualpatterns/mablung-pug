import Identifier from 'to-js-identifier';

import BlockAttributeNode from './block-attribute-node.js';
import BlockNode from './block-node.js';
import Node from '../node.js';

class MixinNode extends Node {

  constructor(node, option) {
    super(node, option);
  }

  async getSource() {

    let source = null;

    if (this._node.call) {

      let blockAttributeNode = new BlockAttributeNode(this._node, this._option);

      let blockAttributeSource = null;
      blockAttributeSource = await blockAttributeNode.getSource();
      blockAttributeSource = blockAttributeNode.isEmpty ?
      undefined :
      `(() => { 
           const __attribute = {}
           ${blockAttributeSource}
           return __attribute
         })()`;

      let blockNode = null;
      let blockSource = null;

      if (this._node.block) {
        blockNode = new BlockNode(this._node.block, this._option);
        blockSource = await blockNode.getSource();
        blockSource = blockNode.isEmpty ?
        ' []' :
        ` (() => { 
              const __node = []
              ${blockSource}
              return __node
            })()`;
      } else {
        blockSource = undefined;
      }

      source = ` __utility.addNode(
                    __mixin__${Identifier(this._node.name)}(
                      ${blockAttributeSource},
                      ${blockSource}
                      ${this._node.args ? `, ${this._node.args}` : ''}
                    ),
                    __node
                  )`;

    } else {

      let blockNode = new BlockNode(this._node.block, this._option);
      let blockSource = await blockNode.getSource();

      source = ` function __mixin__${Identifier(this._node.name)}(attribute, block${this._node.args ? `, ${this._node.args}` : ''}) {
                    const attributes = attribute
                    const __node = []
                    ${blockSource}
                    return __node
                  }`;

    }

    return source;

  }}



export default MixinNode;
//# sourceMappingURL=mixin-node.js.map