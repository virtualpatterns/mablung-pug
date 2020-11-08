
import Node from '../node.js';

import { UnsupportedDocTypeTransformError } from '../error/unsupported-doctype-transform-error.js';

class DocTypeNode extends Node {

  constructor(node, option) {
    super(node, option);
  }

  async getSource() {
    throw new UnsupportedDocTypeTransformError(this._node);
  }}



export default DocTypeNode;
//# sourceMappingURL=doctype-node.js.map