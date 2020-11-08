"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Utility = void 0;

var _hyperscript = _interopRequireDefault(require("hyperscript"));

var _clone = _interopRequireDefault(require("clone"));

var ModuleConvert = _interopRequireWildcard(require("html-to-hyperscript"));

var _isNode = _interopRequireDefault(require("is-node"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  'htmlToHs2': Convert
} = ModuleConvert.default || ModuleConvert;

class Utility {
  static create(...parameter) {
    // console.log(`Utility.create(...parameter)`)
    // console.dir({ 'parameter': parameter }, { 'depth': null })
    return (0, _hyperscript.default)(...parameter);
  }

  static createNode(name, ...parameter) {
    let _name = name;
    let _property = {};
    let _childNode = [];

    switch (parameter.length) {
      case 0:
        // _property = default
        // _childNode = default
        break;

      case 1:
        switch (true) {
          case typeof parameter[0] === 'string':
            // _property = default
            _childNode = [parameter[0]];
            break;

          case Array.isArray(parameter[0]):
            // _property = default
            _childNode = parameter[0];
            break;

          default:
            _property = parameter[0];
          // _childNode = default
        }

        break;

      default:
        switch (true) {
          case typeof parameter[1] === 'string':
            _property = parameter[0];
            _childNode = [parameter[1]];
            break;

          default:
            _property = parameter[0];
            _childNode = parameter[1];
        }

    }

    _name = this.getNodeName(_name);
    _property = this.getNodeProperty(_property);
    _childNode = this.getNode(_childNode);
    return this.create(_name, _property, _childNode);
  }

  static getNodeName(name) {
    return name;
  }

  static getNodeProperty(property) {
    let _property = (0, _clone.default)(property);

    let _attribute = property.attributes ? (0, _clone.default)(property.attributes) : {}; // re-name selected property


    let map = {
      'class': 'className',
      'colspan': 'colSpan',
      'for': 'htmlFor',
      'http-equiv': 'httpEquiv'
    };
    Object.entries(_property).filter(([name]) => name.toLowerCase() in map).forEach(([name, value]) => {
      _property[map[name.toLowerCase()]] = value;
      delete _property[name];
    }); // add selected property to _attribute and remove

    Object.entries(_property).filter(([name]) => /^\((.*?)\)$/.test(name) || _isNode.default && /^data-(.*?)$/.test(name) || name === 'checked').forEach(([name, value]) => {
      _attribute[name] = value;
      delete _property[name];
    }); // convert _attribute to an array
    // of objects if it isn't already
    // and this is a NodeJS process

    if (_isNode.default && !Array.isArray(_attribute)) {
      _attribute = Object.entries(_attribute).sort(([leftName], [rightName]) => leftName.localeCompare(rightName)).map(([name, value]) => ({
        'name': name,
        'value': value
      }));
    } // assign _attribute to ...
    //   .attributes if this is a NodeJS process
    //   .attrs otherwise


    _property[_isNode.default ? 'attributes' : 'attrs'] = _attribute;
    return _property;
  }

  static getNode(node) {
    let previousIndex = -1;
    let previousNode = undefined;
    node = node.reduce((accumulator, currentNode) => {
      if (typeof currentNode === 'string' && typeof previousNode === 'string') {
        accumulator[previousIndex] += currentNode;
      } else {
        accumulator.push(currentNode);
        previousIndex++;
      }

      previousNode = currentNode;
      return accumulator;
    }, []);
    return node;
  }

  static addNode(value, node) {
    node.push(...(Array.isArray(value) ? value : [value]));
  }

  static addAttribute(name, value, attribute) {
    if (typeof value === 'boolean' && value === false) {// do nothing
    } else {
      name = this.getAttributeName(name);
      value = this.getAttributeValue(name, value, attribute[name]);

      if (value !== undefined) {
        attribute[name] = value;
      }
    }
  }

  static getAttributeName(name) {
    return name;
  }

  static getAttributeValue(name, value, currentValue) {
    if (typeof value === 'boolean') {
      value = value ? name : false;
    } else if (typeof value === 'string') {
      value = currentValue ? `${currentValue} ${value}` : value;
    } else if (Array.isArray(value)) {
      value = currentValue ? `${currentValue} ${value.join(' ')}` : value.join(' ');
    } else {
      switch (name.toLowerCase()) {
        case 'class':
          value = Object.keys(value).filter(key => value[key]).join(' ');
          break;
        // case 'style':
        //   value = Object.keys(value)
        //     .map((key) => `${key}:${value[key]};`)
        //     .join('')
        //   break
      }
    }

    return value === '' ? undefined : value;
  }

  static addAndAttribute(object, attribute) {
    Object.entries(object).forEach(([name, value]) => this.addAttribute(name, value, attribute));
  }

  static forEach(value, fn) {
    if (Array.isArray(value)) {
      value.forEach(fn);
      return value.length;
    } else {
      let entry = Object.entries(value);
      entry.forEach(([name, value]) => fn(value, name));
      return entry.length;
    }
  }

  static convertToNode(value) {
    // console.log('Utility.convertToNode(value)')
    // console.dir({ 'value': value }, { 'depth': null })
    let pattern = /^\/\/<!\[CDATA\[(.*?)\/\/\]\]>$/ims;

    if (pattern.test(value)) {
      return value;
    } else {
      let [source, tag] = Convert({
        'syntax': 'h',
        'tabSize': 2
      }, value); // console.log(source)

      if (tag.length > 0) {
        let pattern = /h\((.*?)\)/gims;

        while (pattern.test(source)) {
          source = source.replace(pattern, 'this.createNode($1)');
        } // console.log(source)


        return eval(source);
      } else {
        return value;
      }
    }
  }

}

exports.Utility = Utility;
//# sourceMappingURL=utility.cjs.map