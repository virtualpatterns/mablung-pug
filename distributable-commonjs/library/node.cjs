"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var ModuleChangeCase = _interopRequireWildcard(require("change-case"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// const { 'htmlToHs': Convert } = DefaultConvert || ModuleConvert
const {
  'paramCase': ParameterCase
} = ModuleChangeCase.default || ModuleChangeCase;
const FilePath = __filename;

class Node {
  constructor(node, option) {
    this._node = node;
    this._option = option;
  }

  async getSource() {}

  static async createNode(node, option) {
    let extension = null;
    extension = _path.default.extname(FilePath);
    extension = extension.toLowerCase();
    let nodeClass = null;
    nodeClass = await Promise.resolve(`./node/${ParameterCase(node.type)}-node${extension}`).then(s => _interopRequireWildcard(require(s)));
    nodeClass = nodeClass.default || nodeClass;
    return new nodeClass(node, option);
  } // static async convertToHyperScript(...parameter) {
  //   return this._convert(...parameter).replace(/h\((.*?)\)/gims, '__utility.createNode($1)')
  // }


} // Node._convert = Convert({ 'syntax': 'h', 'tabSize': 2 })


var _default = Node;
exports.default = _default;
//# sourceMappingURL=node.cjs.map