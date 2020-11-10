(() => {
  var __commonJS = (callback, module2) => () => {
    if (!module2) {
      module2 = {exports: {}};
      callback(module2.exports, module2);
    }
    return module2.exports;
  };

  // node_modules/browser-split/index.js
  var require_browser_split = __commonJS((exports2, module2) => {
    /*!
     * Cross-Browser Split 1.1.1
     * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
     * Available under the MIT License
     * ECMAScript compliant, uniform cross-browser split method
     */
    module2.exports = function split(undef) {
      var nativeSplit = String.prototype.split, compliantExecNpcg = /()??/.exec("")[1] === undef, self;
      self = function(str, separator, limit) {
        if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
          return nativeSplit.call(str, separator, limit);
        }
        var output = [], flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + (separator.sticky ? "y" : ""), lastLastIndex = 0, separator = new RegExp(separator.source, flags + "g"), separator2, match, lastIndex, lastLength;
        str += "";
        if (!compliantExecNpcg) {
          separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
        }
        limit = limit === undef ? -1 >>> 0 : limit >>> 0;
        while (match = separator.exec(str)) {
          lastIndex = match.index + match[0].length;
          if (lastIndex > lastLastIndex) {
            output.push(str.slice(lastLastIndex, match.index));
            if (!compliantExecNpcg && match.length > 1) {
              match[0].replace(separator2, function() {
                for (var i = 1; i < arguments.length - 2; i++) {
                  if (arguments[i] === undef) {
                    match[i] = undef;
                  }
                }
              });
            }
            if (match.length > 1 && match.index < str.length) {
              Array.prototype.push.apply(output, match.slice(1));
            }
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= limit) {
              break;
            }
          }
          if (separator.lastIndex === match.index) {
            separator.lastIndex++;
          }
        }
        if (lastLastIndex === str.length) {
          if (lastLength || !separator.test("")) {
            output.push("");
          }
        } else {
          output.push(str.slice(lastLastIndex));
        }
        return output.length > limit ? output.slice(0, limit) : output;
      };
      return self;
    }();
  });

  // node_modules/indexof/index.js
  var require_indexof = __commonJS((exports2, module2) => {
    var indexOf = [].indexOf;
    module2.exports = function(arr, obj) {
      if (indexOf)
        return arr.indexOf(obj);
      for (var i = 0; i < arr.length; ++i) {
        if (arr[i] === obj)
          return i;
      }
      return -1;
    };
  });

  // node_modules/class-list/index.js
  var require_class_list = __commonJS((exports2, module2) => {
    var indexof = require_indexof();
    module2.exports = ClassList;
    function ClassList(elem) {
      var cl = elem.classList;
      if (cl) {
        return cl;
      }
      var classList = {
        add,
        remove,
        contains,
        toggle,
        toString: $toString,
        length: 0,
        item
      };
      return classList;
      function add(token) {
        var list = getTokens();
        if (indexof(list, token) > -1) {
          return;
        }
        list.push(token);
        setTokens(list);
      }
      function remove(token) {
        var list = getTokens(), index = indexof(list, token);
        if (index === -1) {
          return;
        }
        list.splice(index, 1);
        setTokens(list);
      }
      function contains(token) {
        return indexof(getTokens(), token) > -1;
      }
      function toggle(token) {
        if (contains(token)) {
          remove(token);
          return false;
        } else {
          add(token);
          return true;
        }
      }
      function $toString() {
        return elem.className;
      }
      function item(index) {
        var tokens = getTokens();
        return tokens[index] || null;
      }
      function getTokens() {
        var className = elem.className;
        return filter(className.split(" "), isTruthy);
      }
      function setTokens(list) {
        var length = list.length;
        elem.className = list.join(" ");
        classList.length = length;
        for (var i = 0; i < list.length; i++) {
          classList[i] = list[i];
        }
        delete list[length];
      }
    }
    function filter(arr, fn) {
      var ret = [];
      for (var i = 0; i < arr.length; i++) {
        if (fn(arr[i]))
          ret.push(arr[i]);
      }
      return ret;
    }
    function isTruthy(value) {
      return !!value;
    }
  });

  // empty:/Volumes/DUMBLEDORE1/Users/fficnar/Projects/Shared Projects/mablung-pug/node_modules/html-element/index.js
  var require_html_element = __commonJS(() => {
  });

  // node_modules/hyperscript/index.js
  var require_hyperscript = __commonJS((exports2, module2) => {
    var split = require_browser_split();
    var ClassList = require_class_list();
    var w = typeof window === "undefined" ? require_html_element() : window;
    var document2 = w.document;
    var Text = w.Text;
    function context() {
      var cleanupFuncs = [];
      function h2() {
        var args = [].slice.call(arguments), e = null;
        function item(l) {
          var r;
          function parseClass(string) {
            var m = split(string, /([\.#]?[^\s#.]+)/);
            if (/^\.|#/.test(m[1]))
              e = document2.createElement("div");
            forEach(m, function(v2) {
              var s2 = v2.substring(1, v2.length);
              if (!v2)
                return;
              if (!e)
                e = document2.createElement(v2);
              else if (v2[0] === ".")
                ClassList(e).add(s2);
              else if (v2[0] === "#")
                e.setAttribute("id", s2);
            });
          }
          if (l == null)
            ;
          else if (typeof l === "string") {
            if (!e)
              parseClass(l);
            else
              e.appendChild(r = document2.createTextNode(l));
          } else if (typeof l === "number" || typeof l === "boolean" || l instanceof Date || l instanceof RegExp) {
            e.appendChild(r = document2.createTextNode(l.toString()));
          } else if (isArray(l))
            forEach(l, item);
          else if (isNode(l))
            e.appendChild(r = l);
          else if (l instanceof Text)
            e.appendChild(r = l);
          else if (typeof l === "object") {
            for (var k in l) {
              if (typeof l[k] === "function") {
                if (/^on\w+/.test(k)) {
                  (function(k2, l2) {
                    if (e.addEventListener) {
                      e.addEventListener(k2.substring(2), l2[k2], false);
                      cleanupFuncs.push(function() {
                        e.removeEventListener(k2.substring(2), l2[k2], false);
                      });
                    } else {
                      e.attachEvent(k2, l2[k2]);
                      cleanupFuncs.push(function() {
                        e.detachEvent(k2, l2[k2]);
                      });
                    }
                  })(k, l);
                } else {
                  e[k] = l[k]();
                  cleanupFuncs.push(l[k](function(v2) {
                    e[k] = v2;
                  }));
                }
              } else if (k === "style") {
                if (typeof l[k] === "string") {
                  e.style.cssText = l[k];
                } else {
                  for (var s in l[k])
                    (function(s2, v2) {
                      if (typeof v2 === "function") {
                        e.style.setProperty(s2, v2());
                        cleanupFuncs.push(v2(function(val) {
                          e.style.setProperty(s2, val);
                        }));
                      } else
                        var match = l[k][s2].match(/(.*)\W+!important\W*$/);
                      if (match) {
                        e.style.setProperty(s2, match[1], "important");
                      } else {
                        e.style.setProperty(s2, l[k][s2]);
                      }
                    })(s, l[k][s]);
                }
              } else if (k === "attrs") {
                for (var v in l[k]) {
                  e.setAttribute(v, l[k][v]);
                }
              } else if (k.substr(0, 5) === "data-") {
                e.setAttribute(k, l[k]);
              } else {
                e[k] = l[k];
              }
            }
          } else if (typeof l === "function") {
            var v = l();
            e.appendChild(r = isNode(v) ? v : document2.createTextNode(v));
            cleanupFuncs.push(l(function(v2) {
              if (isNode(v2) && r.parentElement)
                r.parentElement.replaceChild(v2, r), r = v2;
              else
                r.textContent = v2;
            }));
          }
          return r;
        }
        while (args.length)
          item(args.shift());
        return e;
      }
      h2.cleanup = function() {
        for (var i = 0; i < cleanupFuncs.length; i++) {
          cleanupFuncs[i]();
        }
        cleanupFuncs.length = 0;
      };
      return h2;
    }
    var h = module2.exports = context();
    h.context = context;
    function isNode(el) {
      return el && el.nodeName && el.nodeType;
    }
    function forEach(arr, fn) {
      if (arr.forEach)
        return arr.forEach(fn);
      for (var i = 0; i < arr.length; i++)
        fn(arr[i], i);
    }
    function isArray(arr) {
      return Object.prototype.toString.call(arr) == "[object Array]";
    }
  });

  // node_modules/clone/clone.js
  var require_clone = __commonJS((exports2, module2) => {
    var clone = function() {
      "use strict";
      function _instanceof(obj, type) {
        return type != null && obj instanceof type;
      }
      var nativeMap;
      try {
        nativeMap = Map;
      } catch (_) {
        nativeMap = function() {
        };
      }
      var nativeSet;
      try {
        nativeSet = Set;
      } catch (_) {
        nativeSet = function() {
        };
      }
      var nativePromise;
      try {
        nativePromise = Promise;
      } catch (_) {
        nativePromise = function() {
        };
      }
      function clone2(parent, circular, depth, prototype, includeNonEnumerable) {
        if (typeof circular === "object") {
          depth = circular.depth;
          prototype = circular.prototype;
          includeNonEnumerable = circular.includeNonEnumerable;
          circular = circular.circular;
        }
        var allParents = [];
        var allChildren = [];
        var useBuffer = typeof Buffer != "undefined";
        if (typeof circular == "undefined")
          circular = true;
        if (typeof depth == "undefined")
          depth = Infinity;
        function _clone2(parent2, depth2) {
          if (parent2 === null)
            return null;
          if (depth2 === 0)
            return parent2;
          var child;
          var proto;
          if (typeof parent2 != "object") {
            return parent2;
          }
          if (_instanceof(parent2, nativeMap)) {
            child = new nativeMap();
          } else if (_instanceof(parent2, nativeSet)) {
            child = new nativeSet();
          } else if (_instanceof(parent2, nativePromise)) {
            child = new nativePromise(function(resolve, reject) {
              parent2.then(function(value) {
                resolve(_clone2(value, depth2 - 1));
              }, function(err) {
                reject(_clone2(err, depth2 - 1));
              });
            });
          } else if (clone2.__isArray(parent2)) {
            child = [];
          } else if (clone2.__isRegExp(parent2)) {
            child = new RegExp(parent2.source, __getRegExpFlags(parent2));
            if (parent2.lastIndex)
              child.lastIndex = parent2.lastIndex;
          } else if (clone2.__isDate(parent2)) {
            child = new Date(parent2.getTime());
          } else if (useBuffer && Buffer.isBuffer(parent2)) {
            if (Buffer.allocUnsafe) {
              child = Buffer.allocUnsafe(parent2.length);
            } else {
              child = new Buffer(parent2.length);
            }
            parent2.copy(child);
            return child;
          } else if (_instanceof(parent2, Error)) {
            child = Object.create(parent2);
          } else {
            if (typeof prototype == "undefined") {
              proto = Object.getPrototypeOf(parent2);
              child = Object.create(proto);
            } else {
              child = Object.create(prototype);
              proto = prototype;
            }
          }
          if (circular) {
            var index = allParents.indexOf(parent2);
            if (index != -1) {
              return allChildren[index];
            }
            allParents.push(parent2);
            allChildren.push(child);
          }
          if (_instanceof(parent2, nativeMap)) {
            parent2.forEach(function(value, key) {
              var keyChild = _clone2(key, depth2 - 1);
              var valueChild = _clone2(value, depth2 - 1);
              child.set(keyChild, valueChild);
            });
          }
          if (_instanceof(parent2, nativeSet)) {
            parent2.forEach(function(value) {
              var entryChild = _clone2(value, depth2 - 1);
              child.add(entryChild);
            });
          }
          for (var i in parent2) {
            var attrs;
            if (proto) {
              attrs = Object.getOwnPropertyDescriptor(proto, i);
            }
            if (attrs && attrs.set == null) {
              continue;
            }
            child[i] = _clone2(parent2[i], depth2 - 1);
          }
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(parent2);
            for (var i = 0; i < symbols.length; i++) {
              var symbol = symbols[i];
              var descriptor = Object.getOwnPropertyDescriptor(parent2, symbol);
              if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
                continue;
              }
              child[symbol] = _clone2(parent2[symbol], depth2 - 1);
              if (!descriptor.enumerable) {
                Object.defineProperty(child, symbol, {
                  enumerable: false
                });
              }
            }
          }
          if (includeNonEnumerable) {
            var allPropertyNames = Object.getOwnPropertyNames(parent2);
            for (var i = 0; i < allPropertyNames.length; i++) {
              var propertyName = allPropertyNames[i];
              var descriptor = Object.getOwnPropertyDescriptor(parent2, propertyName);
              if (descriptor && descriptor.enumerable) {
                continue;
              }
              child[propertyName] = _clone2(parent2[propertyName], depth2 - 1);
              Object.defineProperty(child, propertyName, {
                enumerable: false
              });
            }
          }
          return child;
        }
        return _clone2(parent, depth);
      }
      clone2.clonePrototype = function clonePrototype(parent) {
        if (parent === null)
          return null;
        var c = function() {
        };
        c.prototype = parent;
        return new c();
      };
      function __objToStr(o) {
        return Object.prototype.toString.call(o);
      }
      clone2.__objToStr = __objToStr;
      function __isDate(o) {
        return typeof o === "object" && __objToStr(o) === "[object Date]";
      }
      clone2.__isDate = __isDate;
      function __isArray(o) {
        return typeof o === "object" && __objToStr(o) === "[object Array]";
      }
      clone2.__isArray = __isArray;
      function __isRegExp(o) {
        return typeof o === "object" && __objToStr(o) === "[object RegExp]";
      }
      clone2.__isRegExp = __isRegExp;
      function __getRegExpFlags(re) {
        var flags = "";
        if (re.global)
          flags += "g";
        if (re.ignoreCase)
          flags += "i";
        if (re.multiline)
          flags += "m";
        return flags;
      }
      clone2.__getRegExpFlags = __getRegExpFlags;
      return clone2;
    }();
    if (typeof module2 === "object" && module2.exports) {
      module2.exports = clone;
    }
  });

  // node_modules/ramda/src/internal/_isPlaceholder.js
  var require_isPlaceholder = __commonJS((exports2, module2) => {
    module2.exports = function _isPlaceholder(a) {
      return a != null && typeof a === "object" && a["@@functional/placeholder"] === true;
    };
  });

  // node_modules/ramda/src/internal/_curry1.js
  var require_curry1 = __commonJS((exports2, module2) => {
    var _isPlaceholder = require_isPlaceholder();
    module2.exports = function _curry1(fn) {
      return function f1(a) {
        if (arguments.length === 0 || _isPlaceholder(a)) {
          return f1;
        } else {
          return fn.apply(this, arguments);
        }
      };
    };
  });

  // node_modules/ramda/src/internal/_curry2.js
  var require_curry2 = __commonJS((exports2, module2) => {
    var _curry1 = require_curry1();
    var _isPlaceholder = require_isPlaceholder();
    module2.exports = function _curry2(fn) {
      return function f2(a, b) {
        switch (arguments.length) {
          case 0:
            return f2;
          case 1:
            return _isPlaceholder(a) ? f2 : _curry1(function(_b) {
              return fn(a, _b);
            });
          default:
            return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function(_a) {
              return fn(_a, b);
            }) : _isPlaceholder(b) ? _curry1(function(_b) {
              return fn(a, _b);
            }) : fn(a, b);
        }
      };
    };
  });

  // node_modules/ramda/src/internal/_curry3.js
  var require_curry3 = __commonJS((exports2, module2) => {
    var _curry1 = require_curry1();
    var _curry2 = require_curry2();
    var _isPlaceholder = require_isPlaceholder();
    module2.exports = function _curry3(fn) {
      return function f3(a, b, c) {
        switch (arguments.length) {
          case 0:
            return f3;
          case 1:
            return _isPlaceholder(a) ? f3 : _curry2(function(_b, _c) {
              return fn(a, _b, _c);
            });
          case 2:
            return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function(_a, _c) {
              return fn(_a, b, _c);
            }) : _isPlaceholder(b) ? _curry2(function(_b, _c) {
              return fn(a, _b, _c);
            }) : _curry1(function(_c) {
              return fn(a, b, _c);
            });
          default:
            return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function(_a, _b) {
              return fn(_a, _b, c);
            }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function(_a, _c) {
              return fn(_a, b, _c);
            }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function(_b, _c) {
              return fn(a, _b, _c);
            }) : _isPlaceholder(a) ? _curry1(function(_a) {
              return fn(_a, b, c);
            }) : _isPlaceholder(b) ? _curry1(function(_b) {
              return fn(a, _b, c);
            }) : _isPlaceholder(c) ? _curry1(function(_c) {
              return fn(a, b, _c);
            }) : fn(a, b, c);
        }
      };
    };
  });

  // node_modules/ramda/src/assoc.js
  var require_assoc = __commonJS((exports2, module2) => {
    var _curry3 = require_curry3();
    module2.exports = _curry3(function assoc(prop, val, obj) {
      var result = {};
      for (var p in obj) {
        result[p] = obj[p];
      }
      result[prop] = val;
      return result;
    });
  });

  // node_modules/ramda/src/internal/_slice.js
  var require_slice = __commonJS((exports2, module2) => {
    module2.exports = function _slice(args, from, to) {
      switch (arguments.length) {
        case 1:
          return _slice(args, 0, args.length);
        case 2:
          return _slice(args, from, args.length);
        default:
          var list = [];
          var idx = 0;
          var len = Math.max(0, Math.min(args.length, to) - from);
          while (idx < len) {
            list[idx] = args[from + idx];
            idx += 1;
          }
          return list;
      }
    };
  });

  // node_modules/ramda/src/assocPath.js
  var require_assocPath = __commonJS((exports2, module2) => {
    var _curry3 = require_curry3();
    var _slice = require_slice();
    var assoc = require_assoc();
    module2.exports = _curry3(function assocPath(path, val, obj) {
      switch (path.length) {
        case 0:
          return val;
        case 1:
          return assoc(path[0], val, obj);
        default:
          return assoc(path[0], assocPath(_slice(path, 1), val, Object(obj[path[0]])), obj);
      }
    });
  });

  // node_modules/ramda/src/internal/_concat.js
  var require_concat = __commonJS((exports2, module2) => {
    module2.exports = function _concat(set1, set2) {
      set1 = set1 || [];
      set2 = set2 || [];
      var idx;
      var len1 = set1.length;
      var len2 = set2.length;
      var result = [];
      idx = 0;
      while (idx < len1) {
        result[result.length] = set1[idx];
        idx += 1;
      }
      idx = 0;
      while (idx < len2) {
        result[result.length] = set2[idx];
        idx += 1;
      }
      return result;
    };
  });

  // node_modules/ramda/src/append.js
  var require_append = __commonJS((exports2, module2) => {
    var _concat = require_concat();
    var _curry2 = require_curry2();
    module2.exports = _curry2(function append(el, list) {
      return _concat(list, [el]);
    });
  });

  // node_modules/ramda/src/internal/_arrayFromIterator.js
  var require_arrayFromIterator = __commonJS((exports2, module2) => {
    module2.exports = function _arrayFromIterator(iter) {
      var list = [];
      var next;
      while (!(next = iter.next()).done) {
        list.push(next.value);
      }
      return list;
    };
  });

  // node_modules/ramda/src/internal/_functionName.js
  var require_functionName = __commonJS((exports2, module2) => {
    module2.exports = function _functionName(f) {
      var match = String(f).match(/^function (\w*)/);
      return match == null ? "" : match[1];
    };
  });

  // node_modules/ramda/src/internal/_has.js
  var require_has = __commonJS((exports2, module2) => {
    module2.exports = function _has(prop, obj) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    };
  });

  // node_modules/ramda/src/identical.js
  var require_identical = __commonJS((exports2, module2) => {
    var _curry2 = require_curry2();
    module2.exports = _curry2(function identical(a, b) {
      if (a === b) {
        return a !== 0 || 1 / a === 1 / b;
      } else {
        return a !== a && b !== b;
      }
    });
  });

  // node_modules/ramda/src/internal/_isArguments.js
  var require_isArguments = __commonJS((exports2, module2) => {
    var _has = require_has();
    module2.exports = function() {
      var toString = Object.prototype.toString;
      return toString.call(arguments) === "[object Arguments]" ? function _isArguments(x) {
        return toString.call(x) === "[object Arguments]";
      } : function _isArguments(x) {
        return _has("callee", x);
      };
    }();
  });

  // node_modules/ramda/src/keys.js
  var require_keys = __commonJS((exports2, module2) => {
    var _curry1 = require_curry1();
    var _has = require_has();
    var _isArguments = require_isArguments();
    module2.exports = function() {
      var hasEnumBug = !{toString: null}.propertyIsEnumerable("toString");
      var nonEnumerableProps = [
        "constructor",
        "valueOf",
        "isPrototypeOf",
        "toString",
        "propertyIsEnumerable",
        "hasOwnProperty",
        "toLocaleString"
      ];
      var hasArgsEnumBug = function() {
        "use strict";
        return arguments.propertyIsEnumerable("length");
      }();
      var contains = function contains2(list, item) {
        var idx = 0;
        while (idx < list.length) {
          if (list[idx] === item) {
            return true;
          }
          idx += 1;
        }
        return false;
      };
      return typeof Object.keys === "function" && !hasArgsEnumBug ? _curry1(function keys(obj) {
        return Object(obj) !== obj ? [] : Object.keys(obj);
      }) : _curry1(function keys(obj) {
        if (Object(obj) !== obj) {
          return [];
        }
        var prop, nIdx;
        var ks = [];
        var checkArgsLength = hasArgsEnumBug && _isArguments(obj);
        for (prop in obj) {
          if (_has(prop, obj) && (!checkArgsLength || prop !== "length")) {
            ks[ks.length] = prop;
          }
        }
        if (hasEnumBug) {
          nIdx = nonEnumerableProps.length - 1;
          while (nIdx >= 0) {
            prop = nonEnumerableProps[nIdx];
            if (_has(prop, obj) && !contains(ks, prop)) {
              ks[ks.length] = prop;
            }
            nIdx -= 1;
          }
        }
        return ks;
      });
    }();
  });

  // node_modules/ramda/src/type.js
  var require_type = __commonJS((exports2, module2) => {
    var _curry1 = require_curry1();
    module2.exports = _curry1(function type(val) {
      return val === null ? "Null" : val === void 0 ? "Undefined" : Object.prototype.toString.call(val).slice(8, -1);
    });
  });

  // node_modules/ramda/src/internal/_equals.js
  var require_equals = __commonJS((exports2, module2) => {
    var _arrayFromIterator = require_arrayFromIterator();
    var _functionName = require_functionName();
    var _has = require_has();
    var identical = require_identical();
    var keys = require_keys();
    var type = require_type();
    module2.exports = function _equals(a, b, stackA, stackB) {
      if (identical(a, b)) {
        return true;
      }
      if (type(a) !== type(b)) {
        return false;
      }
      if (a == null || b == null) {
        return false;
      }
      if (typeof a.equals === "function" || typeof b.equals === "function") {
        return typeof a.equals === "function" && a.equals(b) && typeof b.equals === "function" && b.equals(a);
      }
      switch (type(a)) {
        case "Arguments":
        case "Array":
        case "Object":
          if (typeof a.constructor === "function" && _functionName(a.constructor) === "Promise") {
            return a === b;
          }
          break;
        case "Boolean":
        case "Number":
        case "String":
          if (!(typeof a === typeof b && identical(a.valueOf(), b.valueOf()))) {
            return false;
          }
          break;
        case "Date":
          if (!identical(a.valueOf(), b.valueOf())) {
            return false;
          }
          break;
        case "Error":
          return a.name === b.name && a.message === b.message;
        case "RegExp":
          if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
            return false;
          }
          break;
        case "Map":
        case "Set":
          if (!_equals(_arrayFromIterator(a.entries()), _arrayFromIterator(b.entries()), stackA, stackB)) {
            return false;
          }
          break;
        case "Int8Array":
        case "Uint8Array":
        case "Uint8ClampedArray":
        case "Int16Array":
        case "Uint16Array":
        case "Int32Array":
        case "Uint32Array":
        case "Float32Array":
        case "Float64Array":
          break;
        case "ArrayBuffer":
          break;
        default:
          return false;
      }
      var keysA = keys(a);
      if (keysA.length !== keys(b).length) {
        return false;
      }
      var idx = stackA.length - 1;
      while (idx >= 0) {
        if (stackA[idx] === a) {
          return stackB[idx] === b;
        }
        idx -= 1;
      }
      stackA.push(a);
      stackB.push(b);
      idx = keysA.length - 1;
      while (idx >= 0) {
        var key = keysA[idx];
        if (!(_has(key, b) && _equals(b[key], a[key], stackA, stackB))) {
          return false;
        }
        idx -= 1;
      }
      stackA.pop();
      stackB.pop();
      return true;
    };
  });

  // node_modules/ramda/src/equals.js
  var require_equals2 = __commonJS((exports2, module2) => {
    var _curry2 = require_curry2();
    var _equals = require_equals();
    module2.exports = _curry2(function equals(a, b) {
      return _equals(a, b, [], []);
    });
  });

  // node_modules/ramda/src/internal/_indexOf.js
  var require_indexOf = __commonJS((exports2, module2) => {
    var equals = require_equals2();
    module2.exports = function _indexOf(list, a, idx) {
      var inf, item;
      if (typeof list.indexOf === "function") {
        switch (typeof a) {
          case "number":
            if (a === 0) {
              inf = 1 / a;
              while (idx < list.length) {
                item = list[idx];
                if (item === 0 && 1 / item === inf) {
                  return idx;
                }
                idx += 1;
              }
              return -1;
            } else if (a !== a) {
              while (idx < list.length) {
                item = list[idx];
                if (typeof item === "number" && item !== item) {
                  return idx;
                }
                idx += 1;
              }
              return -1;
            }
            return list.indexOf(a, idx);
          case "string":
          case "boolean":
          case "function":
          case "undefined":
            return list.indexOf(a, idx);
          case "object":
            if (a === null) {
              return list.indexOf(a, idx);
            }
        }
      }
      while (idx < list.length) {
        if (equals(list[idx], a)) {
          return idx;
        }
        idx += 1;
      }
      return -1;
    };
  });

  // node_modules/ramda/src/internal/_contains.js
  var require_contains = __commonJS((exports2, module2) => {
    var _indexOf = require_indexOf();
    module2.exports = function _contains(a, list) {
      return _indexOf(list, a, 0) >= 0;
    };
  });

  // node_modules/ramda/src/contains.js
  var require_contains2 = __commonJS((exports2, module2) => {
    var _contains = require_contains();
    var _curry2 = require_curry2();
    module2.exports = _curry2(_contains);
  });

  // node_modules/ramda/src/internal/_arity.js
  var require_arity = __commonJS((exports2, module2) => {
    module2.exports = function _arity(n, fn) {
      switch (n) {
        case 0:
          return function() {
            return fn.apply(this, arguments);
          };
        case 1:
          return function(a0) {
            return fn.apply(this, arguments);
          };
        case 2:
          return function(a0, a1) {
            return fn.apply(this, arguments);
          };
        case 3:
          return function(a0, a1, a2) {
            return fn.apply(this, arguments);
          };
        case 4:
          return function(a0, a1, a2, a3) {
            return fn.apply(this, arguments);
          };
        case 5:
          return function(a0, a1, a2, a3, a4) {
            return fn.apply(this, arguments);
          };
        case 6:
          return function(a0, a1, a2, a3, a4, a5) {
            return fn.apply(this, arguments);
          };
        case 7:
          return function(a0, a1, a2, a3, a4, a5, a6) {
            return fn.apply(this, arguments);
          };
        case 8:
          return function(a0, a1, a2, a3, a4, a5, a6, a7) {
            return fn.apply(this, arguments);
          };
        case 9:
          return function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
            return fn.apply(this, arguments);
          };
        case 10:
          return function(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
            return fn.apply(this, arguments);
          };
        default:
          throw new Error("First argument to _arity must be a non-negative integer no greater than ten");
      }
    };
  });

  // node_modules/ramda/src/internal/_curryN.js
  var require_curryN = __commonJS((exports2, module2) => {
    var _arity = require_arity();
    var _isPlaceholder = require_isPlaceholder();
    module2.exports = function _curryN(length, received, fn) {
      return function() {
        var combined = [];
        var argsIdx = 0;
        var left = length;
        var combinedIdx = 0;
        while (combinedIdx < received.length || argsIdx < arguments.length) {
          var result;
          if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
            result = received[combinedIdx];
          } else {
            result = arguments[argsIdx];
            argsIdx += 1;
          }
          combined[combinedIdx] = result;
          if (!_isPlaceholder(result)) {
            left -= 1;
          }
          combinedIdx += 1;
        }
        return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
      };
    };
  });

  // node_modules/ramda/src/curryN.js
  var require_curryN2 = __commonJS((exports2, module2) => {
    var _arity = require_arity();
    var _curry1 = require_curry1();
    var _curry2 = require_curry2();
    var _curryN = require_curryN();
    module2.exports = _curry2(function curryN(length, fn) {
      if (length === 1) {
        return _curry1(fn);
      }
      return _arity(length, _curryN(length, [], fn));
    });
  });

  // node_modules/ramda/src/curry.js
  var require_curry = __commonJS((exports2, module2) => {
    var _curry1 = require_curry1();
    var curryN = require_curryN2();
    module2.exports = _curry1(function curry(fn) {
      return curryN(fn.length, fn);
    });
  });

  // node_modules/ramda/src/internal/_isArray.js
  var require_isArray = __commonJS((exports2, module2) => {
    module2.exports = Array.isArray || function _isArray(val) {
      return val != null && val.length >= 0 && Object.prototype.toString.call(val) === "[object Array]";
    };
  });

  // node_modules/ramda/src/internal/_isTransformer.js
  var require_isTransformer = __commonJS((exports2, module2) => {
    module2.exports = function _isTransformer(obj) {
      return typeof obj["@@transducer/step"] === "function";
    };
  });

  // node_modules/ramda/src/internal/_dispatchable.js
  var require_dispatchable = __commonJS((exports2, module2) => {
    var _isArray = require_isArray();
    var _isTransformer = require_isTransformer();
    var _slice = require_slice();
    module2.exports = function _dispatchable(methodname, xf, fn) {
      return function() {
        var length = arguments.length;
        if (length === 0) {
          return fn();
        }
        var obj = arguments[length - 1];
        if (!_isArray(obj)) {
          var args = _slice(arguments, 0, length - 1);
          if (typeof obj[methodname] === "function") {
            return obj[methodname].apply(obj, args);
          }
          if (_isTransformer(obj)) {
            var transducer = xf.apply(null, args);
            return transducer(obj);
          }
        }
        return fn.apply(this, arguments);
      };
    };
  });

  // node_modules/ramda/src/internal/_xfBase.js
  var require_xfBase = __commonJS((exports2, module2) => {
    module2.exports = {
      init: function() {
        return this.xf["@@transducer/init"]();
      },
      result: function(result) {
        return this.xf["@@transducer/result"](result);
      }
    };
  });

  // node_modules/ramda/src/internal/_xdrop.js
  var require_xdrop = __commonJS((exports2, module2) => {
    var _curry2 = require_curry2();
    var _xfBase = require_xfBase();
    module2.exports = function() {
      function XDrop(n, xf) {
        this.xf = xf;
        this.n = n;
      }
      XDrop.prototype["@@transducer/init"] = _xfBase.init;
      XDrop.prototype["@@transducer/result"] = _xfBase.result;
      XDrop.prototype["@@transducer/step"] = function(result, input) {
        if (this.n > 0) {
          this.n -= 1;
          return result;
        }
        return this.xf["@@transducer/step"](result, input);
      };
      return _curry2(function _xdrop(n, xf) {
        return new XDrop(n, xf);
      });
    }();
  });

  // node_modules/ramda/src/internal/_checkForMethod.js
  var require_checkForMethod = __commonJS((exports2, module2) => {
    var _isArray = require_isArray();
    var _slice = require_slice();
    module2.exports = function _checkForMethod(methodname, fn) {
      return function() {
        var length = arguments.length;
        if (length === 0) {
          return fn();
        }
        var obj = arguments[length - 1];
        return _isArray(obj) || typeof obj[methodname] !== "function" ? fn.apply(this, arguments) : obj[methodname].apply(obj, _slice(arguments, 0, length - 1));
      };
    };
  });

  // node_modules/ramda/src/slice.js
  var require_slice2 = __commonJS((exports2, module2) => {
    var _checkForMethod = require_checkForMethod();
    var _curry3 = require_curry3();
    module2.exports = _curry3(_checkForMethod("slice", function slice(fromIndex, toIndex, list) {
      return Array.prototype.slice.call(list, fromIndex, toIndex);
    }));
  });

  // node_modules/ramda/src/drop.js
  var require_drop = __commonJS((exports2, module2) => {
    var _curry2 = require_curry2();
    var _dispatchable = require_dispatchable();
    var _xdrop = require_xdrop();
    var slice = require_slice2();
    module2.exports = _curry2(_dispatchable("drop", _xdrop, function drop(n, xs) {
      return slice(Math.max(0, n), Infinity, xs);
    }));
  });

  // node_modules/ramda/src/internal/_xdropWhile.js
  var require_xdropWhile = __commonJS((exports2, module2) => {
    var _curry2 = require_curry2();
    var _xfBase = require_xfBase();
    module2.exports = function() {
      function XDropWhile(f, xf) {
        this.xf = xf;
        this.f = f;
      }
      XDropWhile.prototype["@@transducer/init"] = _xfBase.init;
      XDropWhile.prototype["@@transducer/result"] = _xfBase.result;
      XDropWhile.prototype["@@transducer/step"] = function(result, input) {
        if (this.f) {
          if (this.f(input)) {
            return result;
          }
          this.f = null;
        }
        return this.xf["@@transducer/step"](result, input);
      };
      return _curry2(function _xdropWhile(f, xf) {
        return new XDropWhile(f, xf);
      });
    }();
  });

  // node_modules/ramda/src/dropWhile.js
  var require_dropWhile = __commonJS((exports2, module2) => {
    var _curry2 = require_curry2();
    var _dispatchable = require_dispatchable();
    var _slice = require_slice();
    var _xdropWhile = require_xdropWhile();
    module2.exports = _curry2(_dispatchable("dropWhile", _xdropWhile, function dropWhile(pred, list) {
      var idx = 0;
      var len = list.length;
      while (idx < len && pred(list[idx])) {
        idx += 1;
      }
      return _slice(list, idx);
    }));
  });

  // node_modules/ramda/src/internal/_identity.js
  var require_identity = __commonJS((exports2, module2) => {
    module2.exports = function _identity(x) {
      return x;
    };
  });

  // node_modules/ramda/src/identity.js
  var require_identity2 = __commonJS((exports2, module2) => {
    var _curry1 = require_curry1();
    var _identity = require_identity();
    module2.exports = _curry1(_identity);
  });

  // node_modules/ramda/src/internal/_isFunction.js
  var require_isFunction = __commonJS((exports2, module2) => {
    module2.exports = function _isFunction(x) {
      return Object.prototype.toString.call(x) === "[object Function]";
    };
  });

  // node_modules/ramda/src/internal/_map.js
  var require_map = __commonJS((exports2, module2) => {
    module2.exports = function _map(fn, functor) {
      var idx = 0;
      var len = functor.length;
      var result = Array(len);
      while (idx < len) {
        result[idx] = fn(functor[idx]);
        idx += 1;
      }
      return result;
    };
  });

  // node_modules/ramda/src/internal/_quote.js
  var require_quote = __commonJS((exports2, module2) => {
    module2.exports = function _quote(s) {
      var escaped = s.replace(/\\/g, "\\\\").replace(/[\b]/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\v/g, "\\v").replace(/\0/g, "\\0");
      return '"' + escaped.replace(/"/g, '\\"') + '"';
    };
  });

  // node_modules/ramda/src/internal/_toISOString.js
  var require_toISOString = __commonJS((exports2, module2) => {
    module2.exports = function() {
      var pad = function pad2(n) {
        return (n < 10 ? "0" : "") + n;
      };
      return typeof Date.prototype.toISOString === "function" ? function _toISOString(d) {
        return d.toISOString();
      } : function _toISOString(d) {
        return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "." + (d.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
      };
    }();
  });

  // node_modules/ramda/src/internal/_complement.js
  var require_complement = __commonJS((exports2, module2) => {
    module2.exports = function _complement(f) {
      return function() {
        return !f.apply(this, arguments);
      };
    };
  });

  // node_modules/ramda/src/internal/_filter.js
  var require_filter = __commonJS((exports2, module2) => {
    module2.exports = function _filter(fn, list) {
      var idx = 0;
      var len = list.length;
      var result = [];
      while (idx < len) {
        if (fn(list[idx])) {
          result[result.length] = list[idx];
        }
        idx += 1;
      }
      return result;
    };
  });

  // node_modules/ramda/src/internal/_isObject.js
  var require_isObject = __commonJS((exports2, module2) => {
    module2.exports = function _isObject(x) {
      return Object.prototype.toString.call(x) === "[object Object]";
    };
  });

  // node_modules/ramda/src/internal/_xwrap.js
  var require_xwrap = __commonJS((exports2, module2) => {
    module2.exports = function() {
      function XWrap(fn) {
        this.f = fn;
      }
      XWrap.prototype["@@transducer/init"] = function() {
        throw new Error("init not implemented on XWrap");
      };
      XWrap.prototype["@@transducer/result"] = function(acc) {
        return acc;
      };
      XWrap.prototype["@@transducer/step"] = function(acc, x) {
        return this.f(acc, x);
      };
      return function _xwrap(fn) {
        return new XWrap(fn);
      };
    }();
  });

  // node_modules/ramda/src/bind.js
  var require_bind = __commonJS((exports2, module2) => {
    var _arity = require_arity();
    var _curry2 = require_curry2();
    module2.exports = _curry2(function bind(fn, thisObj) {
      return _arity(fn.length, function() {
        return fn.apply(thisObj, arguments);
      });
    });
  });

  // node_modules/ramda/src/internal/_isString.js
  var require_isString = __commonJS((exports2, module2) => {
    module2.exports = function _isString(x) {
      return Object.prototype.toString.call(x) === "[object String]";
    };
  });

  // node_modules/ramda/src/isArrayLike.js
  var require_isArrayLike = __commonJS((exports2, module2) => {
    var _curry1 = require_curry1();
    var _isArray = require_isArray();
    var _isString = require_isString();
    module2.exports = _curry1(function isArrayLike(x) {
      if (_isArray(x)) {
        return true;
      }
      if (!x) {
        return false;
      }
      if (typeof x !== "object") {
        return false;
      }
      if (_isString(x)) {
        return false;
      }
      if (x.nodeType === 1) {
        return !!x.length;
      }
      if (x.length === 0) {
        return true;
      }
      if (x.length > 0) {
        return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
      }
      return false;
    });
  });

  // node_modules/ramda/src/internal/_reduce.js
  var require_reduce = __commonJS((exports2, module2) => {
    var _xwrap = require_xwrap();
    var bind = require_bind();
    var isArrayLike = require_isArrayLike();
    module2.exports = function() {
      function _arrayReduce(xf, acc, list) {
        var idx = 0;
        var len = list.length;
        while (idx < len) {
          acc = xf["@@transducer/step"](acc, list[idx]);
          if (acc && acc["@@transducer/reduced"]) {
            acc = acc["@@transducer/value"];
            break;
          }
          idx += 1;
        }
        return xf["@@transducer/result"](acc);
      }
      function _iterableReduce(xf, acc, iter) {
        var step = iter.next();
        while (!step.done) {
          acc = xf["@@transducer/step"](acc, step.value);
          if (acc && acc["@@transducer/reduced"]) {
            acc = acc["@@transducer/value"];
            break;
          }
          step = iter.next();
        }
        return xf["@@transducer/result"](acc);
      }
      function _methodReduce(xf, acc, obj) {
        return xf["@@transducer/result"](obj.reduce(bind(xf["@@transducer/step"], xf), acc));
      }
      var symIterator = typeof Symbol !== "undefined" ? Symbol.iterator : "@@iterator";
      return function _reduce(fn, acc, list) {
        if (typeof fn === "function") {
          fn = _xwrap(fn);
        }
        if (isArrayLike(list)) {
          return _arrayReduce(fn, acc, list);
        }
        if (typeof list.reduce === "function") {
          return _methodReduce(fn, acc, list);
        }
        if (list[symIterator] != null) {
          return _iterableReduce(fn, acc, list[symIterator]());
        }
        if (typeof list.next === "function") {
          return _iterableReduce(fn, acc, list);
        }
        throw new TypeError("reduce: list must be array or iterable");
      };
    }();
  });

  // node_modules/ramda/src/internal/_xfilter.js
  var require_xfilter = __commonJS((exports2, module2) => {
    var _curry2 = require_curry2();
    var _xfBase = require_xfBase();
    module2.exports = function() {
      function XFilter(f, xf) {
        this.xf = xf;
        this.f = f;
      }
      XFilter.prototype["@@transducer/init"] = _xfBase.init;
      XFilter.prototype["@@transducer/result"] = _xfBase.result;
      XFilter.prototype["@@transducer/step"] = function(result, input) {
        return this.f(input) ? this.xf["@@transducer/step"](result, input) : result;
      };
      return _curry2(function _xfilter(f, xf) {
        return new XFilter(f, xf);
      });
    }();
  });

  // node_modules/ramda/src/filter.js
  var require_filter2 = __commonJS((exports2, module2) => {
    var _curry2 = require_curry2();
    var _dispatchable = require_dispatchable();
    var _filter = require_filter();
    var _isObject = require_isObject();
    var _reduce = require_reduce();
    var _xfilter = require_xfilter();
    var keys = require_keys();
    module2.exports = _curry2(_dispatchable("filter", _xfilter, function(pred, filterable) {
      return _isObject(filterable) ? _reduce(function(acc, key) {
        if (pred(filterable[key])) {
          acc[key] = filterable[key];
        }
        return acc;
      }, {}, keys(filterable)) : _filter(pred, filterable);
    }));
  });

  // node_modules/ramda/src/reject.js
  var require_reject = __commonJS((exports2, module2) => {
    var _complement = require_complement();
    var _curry2 = require_curry2();
    var filter = require_filter2();
    module2.exports = _curry2(function reject(pred, filterable) {
      return filter(_complement(pred), filterable);
    });
  });

  // node_modules/ramda/src/internal/_toString.js
  var require_toString = __commonJS((exports2, module2) => {
    var _contains = require_contains();
    var _map = require_map();
    var _quote = require_quote();
    var _toISOString = require_toISOString();
    var keys = require_keys();
    var reject = require_reject();
    module2.exports = function _toString(x, seen) {
      var recur = function recur2(y) {
        var xs = seen.concat([x]);
        return _contains(y, xs) ? "<Circular>" : _toString(y, xs);
      };
      var mapPairs = function(obj, keys2) {
        return _map(function(k) {
          return _quote(k) + ": " + recur(obj[k]);
        }, keys2.slice().sort());
      };
      switch (Object.prototype.toString.call(x)) {
        case "[object Arguments]":
          return "(function() { return arguments; }(" + _map(recur, x).join(", ") + "))";
        case "[object Array]":
          return "[" + _map(recur, x).concat(mapPairs(x, reject(function(k) {
            return /^\d+$/.test(k);
          }, keys(x)))).join(", ") + "]";
        case "[object Boolean]":
          return typeof x === "object" ? "new Boolean(" + recur(x.valueOf()) + ")" : x.toString();
        case "[object Date]":
          return "new Date(" + (isNaN(x.valueOf()) ? recur(NaN) : _quote(_toISOString(x))) + ")";
        case "[object Null]":
          return "null";
        case "[object Number]":
          return typeof x === "object" ? "new Number(" + recur(x.valueOf()) + ")" : 1 / x === -Infinity ? "-0" : x.toString(10);
        case "[object String]":
          return typeof x === "object" ? "new String(" + recur(x.valueOf()) + ")" : _quote(x);
        case "[object Undefined]":
          return "undefined";
        default:
          if (typeof x.toString === "function") {
            var repr = x.toString();
            if (repr !== "[object Object]") {
              return repr;
            }
          }
          return "{" + mapPairs(x, keys(x)).join(", ") + "}";
      }
    };
  });

  // node_modules/ramda/src/toString.js
  var require_toString2 = __commonJS((exports2, module2) => {
    var _curry1 = require_curry1();
    var _toString = require_toString();
    module2.exports = _curry1(function toString(val) {
      return _toString(val, []);
    });
  });

  // node_modules/ramda/src/invoker.js
  var require_invoker = __commonJS((exports2, module2) => {
    var _curry2 = require_curry2();
    var _isFunction = require_isFunction();
    var _slice = require_slice();
    var curryN = require_curryN2();
    var toString = require_toString2();
    module2.exports = _curry2(function invoker(arity, method) {
      return curryN(arity + 1, function() {
        var target = arguments[arity];
        if (target != null && _isFunction(target[method])) {
          return target[method].apply(target, _slice(arguments, 0, arity));
        }
        throw new TypeError(toString(target) + ' does not have a method named "' + method + '"');
      });
    });
  });

  // node_modules/ramda/src/join.js
  var require_join = __commonJS((exports2, module2) => {
    var invoker = require_invoker();
    module2.exports = invoker(1, "join");
  });

  // node_modules/ramda/src/internal/_xmap.js
  var require_xmap = __commonJS((exports2, module2) => {
    var _curry2 = require_curry2();
    var _xfBase = require_xfBase();
    module2.exports = function() {
      function XMap(f, xf) {
        this.xf = xf;
        this.f = f;
      }
      XMap.prototype["@@transducer/init"] = _xfBase.init;
      XMap.prototype["@@transducer/result"] = _xfBase.result;
      XMap.prototype["@@transducer/step"] = function(result, input) {
        return this.xf["@@transducer/step"](result, this.f(input));
      };
      return _curry2(function _xmap(f, xf) {
        return new XMap(f, xf);
      });
    }();
  });

  // node_modules/ramda/src/map.js
  var require_map2 = __commonJS((exports2, module2) => {
    var _curry2 = require_curry2();
    var _dispatchable = require_dispatchable();
    var _map = require_map();
    var _reduce = require_reduce();
    var _xmap = require_xmap();
    var curryN = require_curryN2();
    var keys = require_keys();
    module2.exports = _curry2(_dispatchable("map", _xmap, function map(fn, functor) {
      switch (Object.prototype.toString.call(functor)) {
        case "[object Function]":
          return curryN(functor.length, function() {
            return fn.call(this, functor.apply(this, arguments));
          });
        case "[object Object]":
          return _reduce(function(acc, key) {
            acc[key] = fn(functor[key]);
            return acc;
          }, {}, keys(functor));
        default:
          return _map(fn, functor);
      }
    }));
  });

  // node_modules/ramda/src/internal/_objectAssign.js
  var require_objectAssign = __commonJS((exports2, module2) => {
    var _has = require_has();
    module2.exports = function _objectAssign(target) {
      if (target == null) {
        throw new TypeError("Cannot convert undefined or null to object");
      }
      var output = Object(target);
      var idx = 1;
      var length = arguments.length;
      while (idx < length) {
        var source = arguments[idx];
        if (source != null) {
          for (var nextKey in source) {
            if (_has(nextKey, source)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
        idx += 1;
      }
      return output;
    };
  });

  // node_modules/ramda/src/internal/_assign.js
  var require_assign = __commonJS((exports2, module2) => {
    var _objectAssign = require_objectAssign();
    module2.exports = typeof Object.assign === "function" ? Object.assign : _objectAssign;
  });

  // node_modules/ramda/src/merge.js
  var require_merge = __commonJS((exports2, module2) => {
    var _assign = require_assign();
    var _curry2 = require_curry2();
    module2.exports = _curry2(function merge(l, r) {
      return _assign({}, l, r);
    });
  });

  // node_modules/ramda/src/internal/_pipe.js
  var require_pipe = __commonJS((exports2, module2) => {
    module2.exports = function _pipe(f, g) {
      return function() {
        return g.call(this, f.apply(this, arguments));
      };
    };
  });

  // node_modules/ramda/src/reduce.js
  var require_reduce2 = __commonJS((exports2, module2) => {
    var _curry3 = require_curry3();
    var _reduce = require_reduce();
    module2.exports = _curry3(_reduce);
  });

  // node_modules/ramda/src/tail.js
  var require_tail = __commonJS((exports2, module2) => {
    var _checkForMethod = require_checkForMethod();
    var slice = require_slice2();
    module2.exports = _checkForMethod("tail", slice(1, Infinity));
  });

  // node_modules/ramda/src/pipe.js
  var require_pipe2 = __commonJS((exports2, module2) => {
    var _arity = require_arity();
    var _pipe = require_pipe();
    var reduce = require_reduce2();
    var tail = require_tail();
    module2.exports = function pipe() {
      if (arguments.length === 0) {
        throw new Error("pipe requires at least one argument");
      }
      return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
    };
  });

  // node_modules/ramda/src/prepend.js
  var require_prepend = __commonJS((exports2, module2) => {
    var _concat = require_concat();
    var _curry2 = require_curry2();
    module2.exports = _curry2(function prepend(el, list) {
      return _concat([el], list);
    });
  });

  // node_modules/ramda/src/split.js
  var require_split = __commonJS((exports2, module2) => {
    var invoker = require_invoker();
    module2.exports = invoker(1, "split");
  });

  // node_modules/ramda/src/always.js
  var require_always = __commonJS((exports2, module2) => {
    var _curry1 = require_curry1();
    module2.exports = _curry1(function always(val) {
      return function() {
        return val;
      };
    });
  });

  // node_modules/ramda/src/times.js
  var require_times = __commonJS((exports2, module2) => {
    var _curry2 = require_curry2();
    module2.exports = _curry2(function times(fn, n) {
      var len = Number(n);
      var idx = 0;
      var list;
      if (len < 0 || isNaN(len)) {
        throw new RangeError("n must be a non-negative number");
      }
      list = new Array(len);
      while (idx < len) {
        list[idx] = fn(idx);
        idx += 1;
      }
      return list;
    });
  });

  // node_modules/ramda/src/repeat.js
  var require_repeat = __commonJS((exports2, module2) => {
    var _curry2 = require_curry2();
    var always = require_always();
    var times = require_times();
    module2.exports = _curry2(function repeat(value, n) {
      return times(always(value), n);
    });
  });

  // node_modules/ramda/src/replace.js
  var require_replace = __commonJS((exports2, module2) => {
    var _curry3 = require_curry3();
    module2.exports = _curry3(function replace(regex, replacement, str) {
      return str.replace(regex, replacement);
    });
  });

  // node_modules/ramda/src/internal/_reduced.js
  var require_reduced = __commonJS((exports2, module2) => {
    module2.exports = function _reduced(x) {
      return x && x["@@transducer/reduced"] ? x : {
        "@@transducer/value": x,
        "@@transducer/reduced": true
      };
    };
  });

  // node_modules/ramda/src/internal/_xtakeWhile.js
  var require_xtakeWhile = __commonJS((exports2, module2) => {
    var _curry2 = require_curry2();
    var _reduced = require_reduced();
    var _xfBase = require_xfBase();
    module2.exports = function() {
      function XTakeWhile(f, xf) {
        this.xf = xf;
        this.f = f;
      }
      XTakeWhile.prototype["@@transducer/init"] = _xfBase.init;
      XTakeWhile.prototype["@@transducer/result"] = _xfBase.result;
      XTakeWhile.prototype["@@transducer/step"] = function(result, input) {
        return this.f(input) ? this.xf["@@transducer/step"](result, input) : _reduced(result);
      };
      return _curry2(function _xtakeWhile(f, xf) {
        return new XTakeWhile(f, xf);
      });
    }();
  });

  // node_modules/ramda/src/takeWhile.js
  var require_takeWhile = __commonJS((exports2, module2) => {
    var _curry2 = require_curry2();
    var _dispatchable = require_dispatchable();
    var _slice = require_slice();
    var _xtakeWhile = require_xtakeWhile();
    module2.exports = _curry2(_dispatchable("takeWhile", _xtakeWhile, function takeWhile(fn, list) {
      var idx = 0;
      var len = list.length;
      while (idx < len && fn(list[idx])) {
        idx += 1;
      }
      return _slice(list, 0, idx);
    }));
  });

  // node_modules/ramda/src/trim.js
  var require_trim = __commonJS((exports2, module2) => {
    var _curry1 = require_curry1();
    module2.exports = function() {
      var ws = "	\n\v\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
      var zeroWidth = "\u200B";
      var hasProtoTrim = typeof String.prototype.trim === "function";
      if (!hasProtoTrim || (ws.trim() || !zeroWidth.trim())) {
        return _curry1(function trim(str) {
          var beginRx = new RegExp("^[" + ws + "][" + ws + "]*");
          var endRx = new RegExp("[" + ws + "][" + ws + "]*$");
          return str.replace(beginRx, "").replace(endRx, "");
        });
      } else {
        return _curry1(function trim(str) {
          return str.trim();
        });
      }
    }();
  });

  // node_modules/parse5/lib/common/unicode.js
  var require_unicode = __commonJS((exports2) => {
    "use strict";
    exports2.REPLACEMENT_CHARACTER = "\uFFFD";
    exports2.CODE_POINTS = {
      EOF: -1,
      NULL: 0,
      TABULATION: 9,
      CARRIAGE_RETURN: 13,
      LINE_FEED: 10,
      FORM_FEED: 12,
      SPACE: 32,
      EXCLAMATION_MARK: 33,
      QUOTATION_MARK: 34,
      NUMBER_SIGN: 35,
      AMPERSAND: 38,
      APOSTROPHE: 39,
      HYPHEN_MINUS: 45,
      SOLIDUS: 47,
      DIGIT_0: 48,
      DIGIT_9: 57,
      SEMICOLON: 59,
      LESS_THAN_SIGN: 60,
      EQUALS_SIGN: 61,
      GREATER_THAN_SIGN: 62,
      QUESTION_MARK: 63,
      LATIN_CAPITAL_A: 65,
      LATIN_CAPITAL_F: 70,
      LATIN_CAPITAL_X: 88,
      LATIN_CAPITAL_Z: 90,
      GRAVE_ACCENT: 96,
      LATIN_SMALL_A: 97,
      LATIN_SMALL_F: 102,
      LATIN_SMALL_X: 120,
      LATIN_SMALL_Z: 122,
      REPLACEMENT_CHARACTER: 65533
    };
    exports2.CODE_POINT_SEQUENCES = {
      DASH_DASH_STRING: [45, 45],
      DOCTYPE_STRING: [68, 79, 67, 84, 89, 80, 69],
      CDATA_START_STRING: [91, 67, 68, 65, 84, 65, 91],
      CDATA_END_STRING: [93, 93, 62],
      SCRIPT_STRING: [115, 99, 114, 105, 112, 116],
      PUBLIC_STRING: [80, 85, 66, 76, 73, 67],
      SYSTEM_STRING: [83, 89, 83, 84, 69, 77]
    };
  });

  // node_modules/parse5/lib/tokenizer/preprocessor.js
  var require_preprocessor = __commonJS((exports2, module2) => {
    "use strict";
    var UNICODE = require_unicode();
    var $ = UNICODE.CODE_POINTS;
    function isSurrogatePair(cp1, cp2) {
      return cp1 >= 55296 && cp1 <= 56319 && cp2 >= 56320 && cp2 <= 57343;
    }
    function getSurrogatePairCodePoint(cp1, cp2) {
      return (cp1 - 55296) * 1024 + 9216 + cp2;
    }
    var DEFAULT_BUFFER_WATERLINE = 1 << 16;
    var Preprocessor = module2.exports = function() {
      this.html = null;
      this.pos = -1;
      this.lastGapPos = -1;
      this.lastCharPos = -1;
      this.gapStack = [];
      this.skipNextNewLine = false;
      this.lastChunkWritten = false;
      this.endOfChunkHit = false;
      this.bufferWaterline = DEFAULT_BUFFER_WATERLINE;
    };
    Preprocessor.prototype.dropParsedChunk = function() {
      if (this.pos > this.bufferWaterline) {
        this.lastCharPos -= this.pos;
        this.html = this.html.substring(this.pos);
        this.pos = 0;
        this.lastGapPos = -1;
        this.gapStack = [];
      }
    };
    Preprocessor.prototype._addGap = function() {
      this.gapStack.push(this.lastGapPos);
      this.lastGapPos = this.pos;
    };
    Preprocessor.prototype._processHighRangeCodePoint = function(cp) {
      if (this.pos !== this.lastCharPos) {
        var nextCp = this.html.charCodeAt(this.pos + 1);
        if (isSurrogatePair(cp, nextCp)) {
          this.pos++;
          cp = getSurrogatePairCodePoint(cp, nextCp);
          this._addGap();
        }
      } else if (!this.lastChunkWritten) {
        this.endOfChunkHit = true;
        return $.EOF;
      }
      return cp;
    };
    Preprocessor.prototype.write = function(chunk, isLastChunk) {
      if (this.html)
        this.html += chunk;
      else
        this.html = chunk;
      this.lastCharPos = this.html.length - 1;
      this.endOfChunkHit = false;
      this.lastChunkWritten = isLastChunk;
    };
    Preprocessor.prototype.insertHtmlAtCurrentPos = function(chunk) {
      this.html = this.html.substring(0, this.pos + 1) + chunk + this.html.substring(this.pos + 1, this.html.length);
      this.lastCharPos = this.html.length - 1;
      this.endOfChunkHit = false;
    };
    Preprocessor.prototype.advance = function() {
      this.pos++;
      if (this.pos > this.lastCharPos) {
        if (!this.lastChunkWritten)
          this.endOfChunkHit = true;
        return $.EOF;
      }
      var cp = this.html.charCodeAt(this.pos);
      if (this.skipNextNewLine && cp === $.LINE_FEED) {
        this.skipNextNewLine = false;
        this._addGap();
        return this.advance();
      }
      if (cp === $.CARRIAGE_RETURN) {
        this.skipNextNewLine = true;
        return $.LINE_FEED;
      }
      this.skipNextNewLine = false;
      return cp >= 55296 ? this._processHighRangeCodePoint(cp) : cp;
    };
    Preprocessor.prototype.retreat = function() {
      if (this.pos === this.lastGapPos) {
        this.lastGapPos = this.gapStack.pop();
        this.pos--;
      }
      this.pos--;
    };
  });

  // node_modules/parse5/lib/tokenizer/named_entity_data.js
  var require_named_entity_data = __commonJS((exports2, module2) => {
    "use strict";
    module2.exports = new Uint16Array([4, 52, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 106, 303, 412, 810, 1432, 1701, 1796, 1987, 2114, 2360, 2420, 2484, 3170, 3251, 4140, 4393, 4575, 4610, 5106, 5512, 5728, 6117, 6274, 6315, 6345, 6427, 6516, 7002, 7910, 8733, 9323, 9870, 10170, 10631, 10893, 11318, 11386, 11467, 12773, 13092, 14474, 14922, 15448, 15542, 16419, 17666, 18166, 18611, 19004, 19095, 19298, 19397, 4, 16, 69, 77, 97, 98, 99, 102, 103, 108, 109, 110, 111, 112, 114, 115, 116, 117, 140, 150, 158, 169, 176, 194, 199, 210, 216, 222, 226, 242, 256, 266, 283, 294, 108, 105, 103, 5, 198, 1, 59, 148, 1, 198, 80, 5, 38, 1, 59, 156, 1, 38, 99, 117, 116, 101, 5, 193, 1, 59, 167, 1, 193, 114, 101, 118, 101, 59, 1, 258, 4, 2, 105, 121, 182, 191, 114, 99, 5, 194, 1, 59, 189, 1, 194, 59, 1, 1040, 114, 59, 3, 55349, 56580, 114, 97, 118, 101, 5, 192, 1, 59, 208, 1, 192, 112, 104, 97, 59, 1, 913, 97, 99, 114, 59, 1, 256, 100, 59, 1, 10835, 4, 2, 103, 112, 232, 237, 111, 110, 59, 1, 260, 102, 59, 3, 55349, 56632, 112, 108, 121, 70, 117, 110, 99, 116, 105, 111, 110, 59, 1, 8289, 105, 110, 103, 5, 197, 1, 59, 264, 1, 197, 4, 2, 99, 115, 272, 277, 114, 59, 3, 55349, 56476, 105, 103, 110, 59, 1, 8788, 105, 108, 100, 101, 5, 195, 1, 59, 292, 1, 195, 109, 108, 5, 196, 1, 59, 301, 1, 196, 4, 8, 97, 99, 101, 102, 111, 114, 115, 117, 321, 350, 354, 383, 388, 394, 400, 405, 4, 2, 99, 114, 327, 336, 107, 115, 108, 97, 115, 104, 59, 1, 8726, 4, 2, 118, 119, 342, 345, 59, 1, 10983, 101, 100, 59, 1, 8966, 121, 59, 1, 1041, 4, 3, 99, 114, 116, 362, 369, 379, 97, 117, 115, 101, 59, 1, 8757, 110, 111, 117, 108, 108, 105, 115, 59, 1, 8492, 97, 59, 1, 914, 114, 59, 3, 55349, 56581, 112, 102, 59, 3, 55349, 56633, 101, 118, 101, 59, 1, 728, 99, 114, 59, 1, 8492, 109, 112, 101, 113, 59, 1, 8782, 4, 14, 72, 79, 97, 99, 100, 101, 102, 104, 105, 108, 111, 114, 115, 117, 442, 447, 456, 504, 542, 547, 569, 573, 577, 616, 678, 784, 790, 796, 99, 121, 59, 1, 1063, 80, 89, 5, 169, 1, 59, 454, 1, 169, 4, 3, 99, 112, 121, 464, 470, 497, 117, 116, 101, 59, 1, 262, 4, 2, 59, 105, 476, 478, 1, 8914, 116, 97, 108, 68, 105, 102, 102, 101, 114, 101, 110, 116, 105, 97, 108, 68, 59, 1, 8517, 108, 101, 121, 115, 59, 1, 8493, 4, 4, 97, 101, 105, 111, 514, 520, 530, 535, 114, 111, 110, 59, 1, 268, 100, 105, 108, 5, 199, 1, 59, 528, 1, 199, 114, 99, 59, 1, 264, 110, 105, 110, 116, 59, 1, 8752, 111, 116, 59, 1, 266, 4, 2, 100, 110, 553, 560, 105, 108, 108, 97, 59, 1, 184, 116, 101, 114, 68, 111, 116, 59, 1, 183, 114, 59, 1, 8493, 105, 59, 1, 935, 114, 99, 108, 101, 4, 4, 68, 77, 80, 84, 591, 596, 603, 609, 111, 116, 59, 1, 8857, 105, 110, 117, 115, 59, 1, 8854, 108, 117, 115, 59, 1, 8853, 105, 109, 101, 115, 59, 1, 8855, 111, 4, 2, 99, 115, 623, 646, 107, 119, 105, 115, 101, 67, 111, 110, 116, 111, 117, 114, 73, 110, 116, 101, 103, 114, 97, 108, 59, 1, 8754, 101, 67, 117, 114, 108, 121, 4, 2, 68, 81, 658, 671, 111, 117, 98, 108, 101, 81, 117, 111, 116, 101, 59, 1, 8221, 117, 111, 116, 101, 59, 1, 8217, 4, 4, 108, 110, 112, 117, 688, 701, 736, 753, 111, 110, 4, 2, 59, 101, 696, 698, 1, 8759, 59, 1, 10868, 4, 3, 103, 105, 116, 709, 717, 722, 114, 117, 101, 110, 116, 59, 1, 8801, 110, 116, 59, 1, 8751, 111, 117, 114, 73, 110, 116, 101, 103, 114, 97, 108, 59, 1, 8750, 4, 2, 102, 114, 742, 745, 59, 1, 8450, 111, 100, 117, 99, 116, 59, 1, 8720, 110, 116, 101, 114, 67, 108, 111, 99, 107, 119, 105, 115, 101, 67, 111, 110, 116, 111, 117, 114, 73, 110, 116, 101, 103, 114, 97, 108, 59, 1, 8755, 111, 115, 115, 59, 1, 10799, 99, 114, 59, 3, 55349, 56478, 112, 4, 2, 59, 67, 803, 805, 1, 8915, 97, 112, 59, 1, 8781, 4, 11, 68, 74, 83, 90, 97, 99, 101, 102, 105, 111, 115, 834, 850, 855, 860, 865, 888, 903, 916, 921, 1011, 1415, 4, 2, 59, 111, 840, 842, 1, 8517, 116, 114, 97, 104, 100, 59, 1, 10513, 99, 121, 59, 1, 1026, 99, 121, 59, 1, 1029, 99, 121, 59, 1, 1039, 4, 3, 103, 114, 115, 873, 879, 883, 103, 101, 114, 59, 1, 8225, 114, 59, 1, 8609, 104, 118, 59, 1, 10980, 4, 2, 97, 121, 894, 900, 114, 111, 110, 59, 1, 270, 59, 1, 1044, 108, 4, 2, 59, 116, 910, 912, 1, 8711, 97, 59, 1, 916, 114, 59, 3, 55349, 56583, 4, 2, 97, 102, 927, 998, 4, 2, 99, 109, 933, 992, 114, 105, 116, 105, 99, 97, 108, 4, 4, 65, 68, 71, 84, 950, 957, 978, 985, 99, 117, 116, 101, 59, 1, 180, 111, 4, 2, 116, 117, 964, 967, 59, 1, 729, 98, 108, 101, 65, 99, 117, 116, 101, 59, 1, 733, 114, 97, 118, 101, 59, 1, 96, 105, 108, 100, 101, 59, 1, 732, 111, 110, 100, 59, 1, 8900, 102, 101, 114, 101, 110, 116, 105, 97, 108, 68, 59, 1, 8518, 4, 4, 112, 116, 117, 119, 1021, 1026, 1048, 1249, 102, 59, 3, 55349, 56635, 4, 3, 59, 68, 69, 1034, 1036, 1041, 1, 168, 111, 116, 59, 1, 8412, 113, 117, 97, 108, 59, 1, 8784, 98, 108, 101, 4, 6, 67, 68, 76, 82, 85, 86, 1065, 1082, 1101, 1189, 1211, 1236, 111, 110, 116, 111, 117, 114, 73, 110, 116, 101, 103, 114, 97, 108, 59, 1, 8751, 111, 4, 2, 116, 119, 1089, 1092, 59, 1, 168, 110, 65, 114, 114, 111, 119, 59, 1, 8659, 4, 2, 101, 111, 1107, 1141, 102, 116, 4, 3, 65, 82, 84, 1117, 1124, 1136, 114, 114, 111, 119, 59, 1, 8656, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 8660, 101, 101, 59, 1, 10980, 110, 103, 4, 2, 76, 82, 1149, 1177, 101, 102, 116, 4, 2, 65, 82, 1158, 1165, 114, 114, 111, 119, 59, 1, 10232, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 10234, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 10233, 105, 103, 104, 116, 4, 2, 65, 84, 1199, 1206, 114, 114, 111, 119, 59, 1, 8658, 101, 101, 59, 1, 8872, 112, 4, 2, 65, 68, 1218, 1225, 114, 114, 111, 119, 59, 1, 8657, 111, 119, 110, 65, 114, 114, 111, 119, 59, 1, 8661, 101, 114, 116, 105, 99, 97, 108, 66, 97, 114, 59, 1, 8741, 110, 4, 6, 65, 66, 76, 82, 84, 97, 1264, 1292, 1299, 1352, 1391, 1408, 114, 114, 111, 119, 4, 3, 59, 66, 85, 1276, 1278, 1283, 1, 8595, 97, 114, 59, 1, 10515, 112, 65, 114, 114, 111, 119, 59, 1, 8693, 114, 101, 118, 101, 59, 1, 785, 101, 102, 116, 4, 3, 82, 84, 86, 1310, 1323, 1334, 105, 103, 104, 116, 86, 101, 99, 116, 111, 114, 59, 1, 10576, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1, 10590, 101, 99, 116, 111, 114, 4, 2, 59, 66, 1345, 1347, 1, 8637, 97, 114, 59, 1, 10582, 105, 103, 104, 116, 4, 2, 84, 86, 1362, 1373, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1, 10591, 101, 99, 116, 111, 114, 4, 2, 59, 66, 1384, 1386, 1, 8641, 97, 114, 59, 1, 10583, 101, 101, 4, 2, 59, 65, 1399, 1401, 1, 8868, 114, 114, 111, 119, 59, 1, 8615, 114, 114, 111, 119, 59, 1, 8659, 4, 2, 99, 116, 1421, 1426, 114, 59, 3, 55349, 56479, 114, 111, 107, 59, 1, 272, 4, 16, 78, 84, 97, 99, 100, 102, 103, 108, 109, 111, 112, 113, 115, 116, 117, 120, 1466, 1470, 1478, 1489, 1515, 1520, 1525, 1536, 1544, 1593, 1609, 1617, 1650, 1664, 1668, 1677, 71, 59, 1, 330, 72, 5, 208, 1, 59, 1476, 1, 208, 99, 117, 116, 101, 5, 201, 1, 59, 1487, 1, 201, 4, 3, 97, 105, 121, 1497, 1503, 1512, 114, 111, 110, 59, 1, 282, 114, 99, 5, 202, 1, 59, 1510, 1, 202, 59, 1, 1069, 111, 116, 59, 1, 278, 114, 59, 3, 55349, 56584, 114, 97, 118, 101, 5, 200, 1, 59, 1534, 1, 200, 101, 109, 101, 110, 116, 59, 1, 8712, 4, 2, 97, 112, 1550, 1555, 99, 114, 59, 1, 274, 116, 121, 4, 2, 83, 86, 1563, 1576, 109, 97, 108, 108, 83, 113, 117, 97, 114, 101, 59, 1, 9723, 101, 114, 121, 83, 109, 97, 108, 108, 83, 113, 117, 97, 114, 101, 59, 1, 9643, 4, 2, 103, 112, 1599, 1604, 111, 110, 59, 1, 280, 102, 59, 3, 55349, 56636, 115, 105, 108, 111, 110, 59, 1, 917, 117, 4, 2, 97, 105, 1624, 1640, 108, 4, 2, 59, 84, 1631, 1633, 1, 10869, 105, 108, 100, 101, 59, 1, 8770, 108, 105, 98, 114, 105, 117, 109, 59, 1, 8652, 4, 2, 99, 105, 1656, 1660, 114, 59, 1, 8496, 109, 59, 1, 10867, 97, 59, 1, 919, 109, 108, 5, 203, 1, 59, 1675, 1, 203, 4, 2, 105, 112, 1683, 1689, 115, 116, 115, 59, 1, 8707, 111, 110, 101, 110, 116, 105, 97, 108, 69, 59, 1, 8519, 4, 5, 99, 102, 105, 111, 115, 1713, 1717, 1722, 1762, 1791, 121, 59, 1, 1060, 114, 59, 3, 55349, 56585, 108, 108, 101, 100, 4, 2, 83, 86, 1732, 1745, 109, 97, 108, 108, 83, 113, 117, 97, 114, 101, 59, 1, 9724, 101, 114, 121, 83, 109, 97, 108, 108, 83, 113, 117, 97, 114, 101, 59, 1, 9642, 4, 3, 112, 114, 117, 1770, 1775, 1781, 102, 59, 3, 55349, 56637, 65, 108, 108, 59, 1, 8704, 114, 105, 101, 114, 116, 114, 102, 59, 1, 8497, 99, 114, 59, 1, 8497, 4, 12, 74, 84, 97, 98, 99, 100, 102, 103, 111, 114, 115, 116, 1822, 1827, 1834, 1848, 1855, 1877, 1882, 1887, 1890, 1896, 1978, 1984, 99, 121, 59, 1, 1027, 5, 62, 1, 59, 1832, 1, 62, 109, 109, 97, 4, 2, 59, 100, 1843, 1845, 1, 915, 59, 1, 988, 114, 101, 118, 101, 59, 1, 286, 4, 3, 101, 105, 121, 1863, 1869, 1874, 100, 105, 108, 59, 1, 290, 114, 99, 59, 1, 284, 59, 1, 1043, 111, 116, 59, 1, 288, 114, 59, 3, 55349, 56586, 59, 1, 8921, 112, 102, 59, 3, 55349, 56638, 101, 97, 116, 101, 114, 4, 6, 69, 70, 71, 76, 83, 84, 1915, 1933, 1944, 1953, 1959, 1971, 113, 117, 97, 108, 4, 2, 59, 76, 1925, 1927, 1, 8805, 101, 115, 115, 59, 1, 8923, 117, 108, 108, 69, 113, 117, 97, 108, 59, 1, 8807, 114, 101, 97, 116, 101, 114, 59, 1, 10914, 101, 115, 115, 59, 1, 8823, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 1, 10878, 105, 108, 100, 101, 59, 1, 8819, 99, 114, 59, 3, 55349, 56482, 59, 1, 8811, 4, 8, 65, 97, 99, 102, 105, 111, 115, 117, 2005, 2012, 2026, 2032, 2036, 2049, 2073, 2089, 82, 68, 99, 121, 59, 1, 1066, 4, 2, 99, 116, 2018, 2023, 101, 107, 59, 1, 711, 59, 1, 94, 105, 114, 99, 59, 1, 292, 114, 59, 1, 8460, 108, 98, 101, 114, 116, 83, 112, 97, 99, 101, 59, 1, 8459, 4, 2, 112, 114, 2055, 2059, 102, 59, 1, 8461, 105, 122, 111, 110, 116, 97, 108, 76, 105, 110, 101, 59, 1, 9472, 4, 2, 99, 116, 2079, 2083, 114, 59, 1, 8459, 114, 111, 107, 59, 1, 294, 109, 112, 4, 2, 68, 69, 2097, 2107, 111, 119, 110, 72, 117, 109, 112, 59, 1, 8782, 113, 117, 97, 108, 59, 1, 8783, 4, 14, 69, 74, 79, 97, 99, 100, 102, 103, 109, 110, 111, 115, 116, 117, 2144, 2149, 2155, 2160, 2171, 2189, 2194, 2198, 2209, 2245, 2307, 2329, 2334, 2341, 99, 121, 59, 1, 1045, 108, 105, 103, 59, 1, 306, 99, 121, 59, 1, 1025, 99, 117, 116, 101, 5, 205, 1, 59, 2169, 1, 205, 4, 2, 105, 121, 2177, 2186, 114, 99, 5, 206, 1, 59, 2184, 1, 206, 59, 1, 1048, 111, 116, 59, 1, 304, 114, 59, 1, 8465, 114, 97, 118, 101, 5, 204, 1, 59, 2207, 1, 204, 4, 3, 59, 97, 112, 2217, 2219, 2238, 1, 8465, 4, 2, 99, 103, 2225, 2229, 114, 59, 1, 298, 105, 110, 97, 114, 121, 73, 59, 1, 8520, 108, 105, 101, 115, 59, 1, 8658, 4, 2, 116, 118, 2251, 2281, 4, 2, 59, 101, 2257, 2259, 1, 8748, 4, 2, 103, 114, 2265, 2271, 114, 97, 108, 59, 1, 8747, 115, 101, 99, 116, 105, 111, 110, 59, 1, 8898, 105, 115, 105, 98, 108, 101, 4, 2, 67, 84, 2293, 2300, 111, 109, 109, 97, 59, 1, 8291, 105, 109, 101, 115, 59, 1, 8290, 4, 3, 103, 112, 116, 2315, 2320, 2325, 111, 110, 59, 1, 302, 102, 59, 3, 55349, 56640, 97, 59, 1, 921, 99, 114, 59, 1, 8464, 105, 108, 100, 101, 59, 1, 296, 4, 2, 107, 109, 2347, 2352, 99, 121, 59, 1, 1030, 108, 5, 207, 1, 59, 2358, 1, 207, 4, 5, 99, 102, 111, 115, 117, 2372, 2386, 2391, 2397, 2414, 4, 2, 105, 121, 2378, 2383, 114, 99, 59, 1, 308, 59, 1, 1049, 114, 59, 3, 55349, 56589, 112, 102, 59, 3, 55349, 56641, 4, 2, 99, 101, 2403, 2408, 114, 59, 3, 55349, 56485, 114, 99, 121, 59, 1, 1032, 107, 99, 121, 59, 1, 1028, 4, 7, 72, 74, 97, 99, 102, 111, 115, 2436, 2441, 2446, 2452, 2467, 2472, 2478, 99, 121, 59, 1, 1061, 99, 121, 59, 1, 1036, 112, 112, 97, 59, 1, 922, 4, 2, 101, 121, 2458, 2464, 100, 105, 108, 59, 1, 310, 59, 1, 1050, 114, 59, 3, 55349, 56590, 112, 102, 59, 3, 55349, 56642, 99, 114, 59, 3, 55349, 56486, 4, 11, 74, 84, 97, 99, 101, 102, 108, 109, 111, 115, 116, 2508, 2513, 2520, 2562, 2585, 2981, 2986, 3004, 3011, 3146, 3167, 99, 121, 59, 1, 1033, 5, 60, 1, 59, 2518, 1, 60, 4, 5, 99, 109, 110, 112, 114, 2532, 2538, 2544, 2548, 2558, 117, 116, 101, 59, 1, 313, 98, 100, 97, 59, 1, 923, 103, 59, 1, 10218, 108, 97, 99, 101, 116, 114, 102, 59, 1, 8466, 114, 59, 1, 8606, 4, 3, 97, 101, 121, 2570, 2576, 2582, 114, 111, 110, 59, 1, 317, 100, 105, 108, 59, 1, 315, 59, 1, 1051, 4, 2, 102, 115, 2591, 2907, 116, 4, 10, 65, 67, 68, 70, 82, 84, 85, 86, 97, 114, 2614, 2663, 2672, 2728, 2735, 2760, 2820, 2870, 2888, 2895, 4, 2, 110, 114, 2620, 2633, 103, 108, 101, 66, 114, 97, 99, 107, 101, 116, 59, 1, 10216, 114, 111, 119, 4, 3, 59, 66, 82, 2644, 2646, 2651, 1, 8592, 97, 114, 59, 1, 8676, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 8646, 101, 105, 108, 105, 110, 103, 59, 1, 8968, 111, 4, 2, 117, 119, 2679, 2692, 98, 108, 101, 66, 114, 97, 99, 107, 101, 116, 59, 1, 10214, 110, 4, 2, 84, 86, 2699, 2710, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1, 10593, 101, 99, 116, 111, 114, 4, 2, 59, 66, 2721, 2723, 1, 8643, 97, 114, 59, 1, 10585, 108, 111, 111, 114, 59, 1, 8970, 105, 103, 104, 116, 4, 2, 65, 86, 2745, 2752, 114, 114, 111, 119, 59, 1, 8596, 101, 99, 116, 111, 114, 59, 1, 10574, 4, 2, 101, 114, 2766, 2792, 101, 4, 3, 59, 65, 86, 2775, 2777, 2784, 1, 8867, 114, 114, 111, 119, 59, 1, 8612, 101, 99, 116, 111, 114, 59, 1, 10586, 105, 97, 110, 103, 108, 101, 4, 3, 59, 66, 69, 2806, 2808, 2813, 1, 8882, 97, 114, 59, 1, 10703, 113, 117, 97, 108, 59, 1, 8884, 112, 4, 3, 68, 84, 86, 2829, 2841, 2852, 111, 119, 110, 86, 101, 99, 116, 111, 114, 59, 1, 10577, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1, 10592, 101, 99, 116, 111, 114, 4, 2, 59, 66, 2863, 2865, 1, 8639, 97, 114, 59, 1, 10584, 101, 99, 116, 111, 114, 4, 2, 59, 66, 2881, 2883, 1, 8636, 97, 114, 59, 1, 10578, 114, 114, 111, 119, 59, 1, 8656, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8660, 115, 4, 6, 69, 70, 71, 76, 83, 84, 2922, 2936, 2947, 2956, 2962, 2974, 113, 117, 97, 108, 71, 114, 101, 97, 116, 101, 114, 59, 1, 8922, 117, 108, 108, 69, 113, 117, 97, 108, 59, 1, 8806, 114, 101, 97, 116, 101, 114, 59, 1, 8822, 101, 115, 115, 59, 1, 10913, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 1, 10877, 105, 108, 100, 101, 59, 1, 8818, 114, 59, 3, 55349, 56591, 4, 2, 59, 101, 2992, 2994, 1, 8920, 102, 116, 97, 114, 114, 111, 119, 59, 1, 8666, 105, 100, 111, 116, 59, 1, 319, 4, 3, 110, 112, 119, 3019, 3110, 3115, 103, 4, 4, 76, 82, 108, 114, 3030, 3058, 3070, 3098, 101, 102, 116, 4, 2, 65, 82, 3039, 3046, 114, 114, 111, 119, 59, 1, 10229, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 10231, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 10230, 101, 102, 116, 4, 2, 97, 114, 3079, 3086, 114, 114, 111, 119, 59, 1, 10232, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 10234, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 10233, 102, 59, 3, 55349, 56643, 101, 114, 4, 2, 76, 82, 3123, 3134, 101, 102, 116, 65, 114, 114, 111, 119, 59, 1, 8601, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 8600, 4, 3, 99, 104, 116, 3154, 3158, 3161, 114, 59, 1, 8466, 59, 1, 8624, 114, 111, 107, 59, 1, 321, 59, 1, 8810, 4, 8, 97, 99, 101, 102, 105, 111, 115, 117, 3188, 3192, 3196, 3222, 3227, 3237, 3243, 3248, 112, 59, 1, 10501, 121, 59, 1, 1052, 4, 2, 100, 108, 3202, 3213, 105, 117, 109, 83, 112, 97, 99, 101, 59, 1, 8287, 108, 105, 110, 116, 114, 102, 59, 1, 8499, 114, 59, 3, 55349, 56592, 110, 117, 115, 80, 108, 117, 115, 59, 1, 8723, 112, 102, 59, 3, 55349, 56644, 99, 114, 59, 1, 8499, 59, 1, 924, 4, 9, 74, 97, 99, 101, 102, 111, 115, 116, 117, 3271, 3276, 3283, 3306, 3422, 3427, 4120, 4126, 4137, 99, 121, 59, 1, 1034, 99, 117, 116, 101, 59, 1, 323, 4, 3, 97, 101, 121, 3291, 3297, 3303, 114, 111, 110, 59, 1, 327, 100, 105, 108, 59, 1, 325, 59, 1, 1053, 4, 3, 103, 115, 119, 3314, 3380, 3415, 97, 116, 105, 118, 101, 4, 3, 77, 84, 86, 3327, 3340, 3365, 101, 100, 105, 117, 109, 83, 112, 97, 99, 101, 59, 1, 8203, 104, 105, 4, 2, 99, 110, 3348, 3357, 107, 83, 112, 97, 99, 101, 59, 1, 8203, 83, 112, 97, 99, 101, 59, 1, 8203, 101, 114, 121, 84, 104, 105, 110, 83, 112, 97, 99, 101, 59, 1, 8203, 116, 101, 100, 4, 2, 71, 76, 3389, 3405, 114, 101, 97, 116, 101, 114, 71, 114, 101, 97, 116, 101, 114, 59, 1, 8811, 101, 115, 115, 76, 101, 115, 115, 59, 1, 8810, 76, 105, 110, 101, 59, 1, 10, 114, 59, 3, 55349, 56593, 4, 4, 66, 110, 112, 116, 3437, 3444, 3460, 3464, 114, 101, 97, 107, 59, 1, 8288, 66, 114, 101, 97, 107, 105, 110, 103, 83, 112, 97, 99, 101, 59, 1, 160, 102, 59, 1, 8469, 4, 13, 59, 67, 68, 69, 71, 72, 76, 78, 80, 82, 83, 84, 86, 3492, 3494, 3517, 3536, 3578, 3657, 3685, 3784, 3823, 3860, 3915, 4066, 4107, 1, 10988, 4, 2, 111, 117, 3500, 3510, 110, 103, 114, 117, 101, 110, 116, 59, 1, 8802, 112, 67, 97, 112, 59, 1, 8813, 111, 117, 98, 108, 101, 86, 101, 114, 116, 105, 99, 97, 108, 66, 97, 114, 59, 1, 8742, 4, 3, 108, 113, 120, 3544, 3552, 3571, 101, 109, 101, 110, 116, 59, 1, 8713, 117, 97, 108, 4, 2, 59, 84, 3561, 3563, 1, 8800, 105, 108, 100, 101, 59, 3, 8770, 824, 105, 115, 116, 115, 59, 1, 8708, 114, 101, 97, 116, 101, 114, 4, 7, 59, 69, 70, 71, 76, 83, 84, 3600, 3602, 3609, 3621, 3631, 3637, 3650, 1, 8815, 113, 117, 97, 108, 59, 1, 8817, 117, 108, 108, 69, 113, 117, 97, 108, 59, 3, 8807, 824, 114, 101, 97, 116, 101, 114, 59, 3, 8811, 824, 101, 115, 115, 59, 1, 8825, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 3, 10878, 824, 105, 108, 100, 101, 59, 1, 8821, 117, 109, 112, 4, 2, 68, 69, 3666, 3677, 111, 119, 110, 72, 117, 109, 112, 59, 3, 8782, 824, 113, 117, 97, 108, 59, 3, 8783, 824, 101, 4, 2, 102, 115, 3692, 3724, 116, 84, 114, 105, 97, 110, 103, 108, 101, 4, 3, 59, 66, 69, 3709, 3711, 3717, 1, 8938, 97, 114, 59, 3, 10703, 824, 113, 117, 97, 108, 59, 1, 8940, 115, 4, 6, 59, 69, 71, 76, 83, 84, 3739, 3741, 3748, 3757, 3764, 3777, 1, 8814, 113, 117, 97, 108, 59, 1, 8816, 114, 101, 97, 116, 101, 114, 59, 1, 8824, 101, 115, 115, 59, 3, 8810, 824, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 3, 10877, 824, 105, 108, 100, 101, 59, 1, 8820, 101, 115, 116, 101, 100, 4, 2, 71, 76, 3795, 3812, 114, 101, 97, 116, 101, 114, 71, 114, 101, 97, 116, 101, 114, 59, 3, 10914, 824, 101, 115, 115, 76, 101, 115, 115, 59, 3, 10913, 824, 114, 101, 99, 101, 100, 101, 115, 4, 3, 59, 69, 83, 3838, 3840, 3848, 1, 8832, 113, 117, 97, 108, 59, 3, 10927, 824, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 1, 8928, 4, 2, 101, 105, 3866, 3881, 118, 101, 114, 115, 101, 69, 108, 101, 109, 101, 110, 116, 59, 1, 8716, 103, 104, 116, 84, 114, 105, 97, 110, 103, 108, 101, 4, 3, 59, 66, 69, 3900, 3902, 3908, 1, 8939, 97, 114, 59, 3, 10704, 824, 113, 117, 97, 108, 59, 1, 8941, 4, 2, 113, 117, 3921, 3973, 117, 97, 114, 101, 83, 117, 4, 2, 98, 112, 3933, 3952, 115, 101, 116, 4, 2, 59, 69, 3942, 3945, 3, 8847, 824, 113, 117, 97, 108, 59, 1, 8930, 101, 114, 115, 101, 116, 4, 2, 59, 69, 3963, 3966, 3, 8848, 824, 113, 117, 97, 108, 59, 1, 8931, 4, 3, 98, 99, 112, 3981, 4e3, 4045, 115, 101, 116, 4, 2, 59, 69, 3990, 3993, 3, 8834, 8402, 113, 117, 97, 108, 59, 1, 8840, 99, 101, 101, 100, 115, 4, 4, 59, 69, 83, 84, 4015, 4017, 4025, 4037, 1, 8833, 113, 117, 97, 108, 59, 3, 10928, 824, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 1, 8929, 105, 108, 100, 101, 59, 3, 8831, 824, 101, 114, 115, 101, 116, 4, 2, 59, 69, 4056, 4059, 3, 8835, 8402, 113, 117, 97, 108, 59, 1, 8841, 105, 108, 100, 101, 4, 4, 59, 69, 70, 84, 4080, 4082, 4089, 4100, 1, 8769, 113, 117, 97, 108, 59, 1, 8772, 117, 108, 108, 69, 113, 117, 97, 108, 59, 1, 8775, 105, 108, 100, 101, 59, 1, 8777, 101, 114, 116, 105, 99, 97, 108, 66, 97, 114, 59, 1, 8740, 99, 114, 59, 3, 55349, 56489, 105, 108, 100, 101, 5, 209, 1, 59, 4135, 1, 209, 59, 1, 925, 4, 14, 69, 97, 99, 100, 102, 103, 109, 111, 112, 114, 115, 116, 117, 118, 4170, 4176, 4187, 4205, 4212, 4217, 4228, 4253, 4259, 4292, 4295, 4316, 4337, 4346, 108, 105, 103, 59, 1, 338, 99, 117, 116, 101, 5, 211, 1, 59, 4185, 1, 211, 4, 2, 105, 121, 4193, 4202, 114, 99, 5, 212, 1, 59, 4200, 1, 212, 59, 1, 1054, 98, 108, 97, 99, 59, 1, 336, 114, 59, 3, 55349, 56594, 114, 97, 118, 101, 5, 210, 1, 59, 4226, 1, 210, 4, 3, 97, 101, 105, 4236, 4241, 4246, 99, 114, 59, 1, 332, 103, 97, 59, 1, 937, 99, 114, 111, 110, 59, 1, 927, 112, 102, 59, 3, 55349, 56646, 101, 110, 67, 117, 114, 108, 121, 4, 2, 68, 81, 4272, 4285, 111, 117, 98, 108, 101, 81, 117, 111, 116, 101, 59, 1, 8220, 117, 111, 116, 101, 59, 1, 8216, 59, 1, 10836, 4, 2, 99, 108, 4301, 4306, 114, 59, 3, 55349, 56490, 97, 115, 104, 5, 216, 1, 59, 4314, 1, 216, 105, 4, 2, 108, 109, 4323, 4332, 100, 101, 5, 213, 1, 59, 4330, 1, 213, 101, 115, 59, 1, 10807, 109, 108, 5, 214, 1, 59, 4344, 1, 214, 101, 114, 4, 2, 66, 80, 4354, 4380, 4, 2, 97, 114, 4360, 4364, 114, 59, 1, 8254, 97, 99, 4, 2, 101, 107, 4372, 4375, 59, 1, 9182, 101, 116, 59, 1, 9140, 97, 114, 101, 110, 116, 104, 101, 115, 105, 115, 59, 1, 9180, 4, 9, 97, 99, 102, 104, 105, 108, 111, 114, 115, 4413, 4422, 4426, 4431, 4435, 4438, 4448, 4471, 4561, 114, 116, 105, 97, 108, 68, 59, 1, 8706, 121, 59, 1, 1055, 114, 59, 3, 55349, 56595, 105, 59, 1, 934, 59, 1, 928, 117, 115, 77, 105, 110, 117, 115, 59, 1, 177, 4, 2, 105, 112, 4454, 4467, 110, 99, 97, 114, 101, 112, 108, 97, 110, 101, 59, 1, 8460, 102, 59, 1, 8473, 4, 4, 59, 101, 105, 111, 4481, 4483, 4526, 4531, 1, 10939, 99, 101, 100, 101, 115, 4, 4, 59, 69, 83, 84, 4498, 4500, 4507, 4519, 1, 8826, 113, 117, 97, 108, 59, 1, 10927, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 1, 8828, 105, 108, 100, 101, 59, 1, 8830, 109, 101, 59, 1, 8243, 4, 2, 100, 112, 4537, 4543, 117, 99, 116, 59, 1, 8719, 111, 114, 116, 105, 111, 110, 4, 2, 59, 97, 4555, 4557, 1, 8759, 108, 59, 1, 8733, 4, 2, 99, 105, 4567, 4572, 114, 59, 3, 55349, 56491, 59, 1, 936, 4, 4, 85, 102, 111, 115, 4585, 4594, 4599, 4604, 79, 84, 5, 34, 1, 59, 4592, 1, 34, 114, 59, 3, 55349, 56596, 112, 102, 59, 1, 8474, 99, 114, 59, 3, 55349, 56492, 4, 12, 66, 69, 97, 99, 101, 102, 104, 105, 111, 114, 115, 117, 4636, 4642, 4650, 4681, 4704, 4763, 4767, 4771, 5047, 5069, 5081, 5094, 97, 114, 114, 59, 1, 10512, 71, 5, 174, 1, 59, 4648, 1, 174, 4, 3, 99, 110, 114, 4658, 4664, 4668, 117, 116, 101, 59, 1, 340, 103, 59, 1, 10219, 114, 4, 2, 59, 116, 4675, 4677, 1, 8608, 108, 59, 1, 10518, 4, 3, 97, 101, 121, 4689, 4695, 4701, 114, 111, 110, 59, 1, 344, 100, 105, 108, 59, 1, 342, 59, 1, 1056, 4, 2, 59, 118, 4710, 4712, 1, 8476, 101, 114, 115, 101, 4, 2, 69, 85, 4722, 4748, 4, 2, 108, 113, 4728, 4736, 101, 109, 101, 110, 116, 59, 1, 8715, 117, 105, 108, 105, 98, 114, 105, 117, 109, 59, 1, 8651, 112, 69, 113, 117, 105, 108, 105, 98, 114, 105, 117, 109, 59, 1, 10607, 114, 59, 1, 8476, 111, 59, 1, 929, 103, 104, 116, 4, 8, 65, 67, 68, 70, 84, 85, 86, 97, 4792, 4840, 4849, 4905, 4912, 4972, 5022, 5040, 4, 2, 110, 114, 4798, 4811, 103, 108, 101, 66, 114, 97, 99, 107, 101, 116, 59, 1, 10217, 114, 111, 119, 4, 3, 59, 66, 76, 4822, 4824, 4829, 1, 8594, 97, 114, 59, 1, 8677, 101, 102, 116, 65, 114, 114, 111, 119, 59, 1, 8644, 101, 105, 108, 105, 110, 103, 59, 1, 8969, 111, 4, 2, 117, 119, 4856, 4869, 98, 108, 101, 66, 114, 97, 99, 107, 101, 116, 59, 1, 10215, 110, 4, 2, 84, 86, 4876, 4887, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1, 10589, 101, 99, 116, 111, 114, 4, 2, 59, 66, 4898, 4900, 1, 8642, 97, 114, 59, 1, 10581, 108, 111, 111, 114, 59, 1, 8971, 4, 2, 101, 114, 4918, 4944, 101, 4, 3, 59, 65, 86, 4927, 4929, 4936, 1, 8866, 114, 114, 111, 119, 59, 1, 8614, 101, 99, 116, 111, 114, 59, 1, 10587, 105, 97, 110, 103, 108, 101, 4, 3, 59, 66, 69, 4958, 4960, 4965, 1, 8883, 97, 114, 59, 1, 10704, 113, 117, 97, 108, 59, 1, 8885, 112, 4, 3, 68, 84, 86, 4981, 4993, 5004, 111, 119, 110, 86, 101, 99, 116, 111, 114, 59, 1, 10575, 101, 101, 86, 101, 99, 116, 111, 114, 59, 1, 10588, 101, 99, 116, 111, 114, 4, 2, 59, 66, 5015, 5017, 1, 8638, 97, 114, 59, 1, 10580, 101, 99, 116, 111, 114, 4, 2, 59, 66, 5033, 5035, 1, 8640, 97, 114, 59, 1, 10579, 114, 114, 111, 119, 59, 1, 8658, 4, 2, 112, 117, 5053, 5057, 102, 59, 1, 8477, 110, 100, 73, 109, 112, 108, 105, 101, 115, 59, 1, 10608, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8667, 4, 2, 99, 104, 5087, 5091, 114, 59, 1, 8475, 59, 1, 8625, 108, 101, 68, 101, 108, 97, 121, 101, 100, 59, 1, 10740, 4, 13, 72, 79, 97, 99, 102, 104, 105, 109, 111, 113, 115, 116, 117, 5134, 5150, 5157, 5164, 5198, 5203, 5259, 5265, 5277, 5283, 5374, 5380, 5385, 4, 2, 67, 99, 5140, 5146, 72, 99, 121, 59, 1, 1065, 121, 59, 1, 1064, 70, 84, 99, 121, 59, 1, 1068, 99, 117, 116, 101, 59, 1, 346, 4, 5, 59, 97, 101, 105, 121, 5176, 5178, 5184, 5190, 5195, 1, 10940, 114, 111, 110, 59, 1, 352, 100, 105, 108, 59, 1, 350, 114, 99, 59, 1, 348, 59, 1, 1057, 114, 59, 3, 55349, 56598, 111, 114, 116, 4, 4, 68, 76, 82, 85, 5216, 5227, 5238, 5250, 111, 119, 110, 65, 114, 114, 111, 119, 59, 1, 8595, 101, 102, 116, 65, 114, 114, 111, 119, 59, 1, 8592, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 8594, 112, 65, 114, 114, 111, 119, 59, 1, 8593, 103, 109, 97, 59, 1, 931, 97, 108, 108, 67, 105, 114, 99, 108, 101, 59, 1, 8728, 112, 102, 59, 3, 55349, 56650, 4, 2, 114, 117, 5289, 5293, 116, 59, 1, 8730, 97, 114, 101, 4, 4, 59, 73, 83, 85, 5306, 5308, 5322, 5367, 1, 9633, 110, 116, 101, 114, 115, 101, 99, 116, 105, 111, 110, 59, 1, 8851, 117, 4, 2, 98, 112, 5329, 5347, 115, 101, 116, 4, 2, 59, 69, 5338, 5340, 1, 8847, 113, 117, 97, 108, 59, 1, 8849, 101, 114, 115, 101, 116, 4, 2, 59, 69, 5358, 5360, 1, 8848, 113, 117, 97, 108, 59, 1, 8850, 110, 105, 111, 110, 59, 1, 8852, 99, 114, 59, 3, 55349, 56494, 97, 114, 59, 1, 8902, 4, 4, 98, 99, 109, 112, 5395, 5420, 5475, 5478, 4, 2, 59, 115, 5401, 5403, 1, 8912, 101, 116, 4, 2, 59, 69, 5411, 5413, 1, 8912, 113, 117, 97, 108, 59, 1, 8838, 4, 2, 99, 104, 5426, 5468, 101, 101, 100, 115, 4, 4, 59, 69, 83, 84, 5440, 5442, 5449, 5461, 1, 8827, 113, 117, 97, 108, 59, 1, 10928, 108, 97, 110, 116, 69, 113, 117, 97, 108, 59, 1, 8829, 105, 108, 100, 101, 59, 1, 8831, 84, 104, 97, 116, 59, 1, 8715, 59, 1, 8721, 4, 3, 59, 101, 115, 5486, 5488, 5507, 1, 8913, 114, 115, 101, 116, 4, 2, 59, 69, 5498, 5500, 1, 8835, 113, 117, 97, 108, 59, 1, 8839, 101, 116, 59, 1, 8913, 4, 11, 72, 82, 83, 97, 99, 102, 104, 105, 111, 114, 115, 5536, 5546, 5552, 5567, 5579, 5602, 5607, 5655, 5695, 5701, 5711, 79, 82, 78, 5, 222, 1, 59, 5544, 1, 222, 65, 68, 69, 59, 1, 8482, 4, 2, 72, 99, 5558, 5563, 99, 121, 59, 1, 1035, 121, 59, 1, 1062, 4, 2, 98, 117, 5573, 5576, 59, 1, 9, 59, 1, 932, 4, 3, 97, 101, 121, 5587, 5593, 5599, 114, 111, 110, 59, 1, 356, 100, 105, 108, 59, 1, 354, 59, 1, 1058, 114, 59, 3, 55349, 56599, 4, 2, 101, 105, 5613, 5631, 4, 2, 114, 116, 5619, 5627, 101, 102, 111, 114, 101, 59, 1, 8756, 97, 59, 1, 920, 4, 2, 99, 110, 5637, 5647, 107, 83, 112, 97, 99, 101, 59, 3, 8287, 8202, 83, 112, 97, 99, 101, 59, 1, 8201, 108, 100, 101, 4, 4, 59, 69, 70, 84, 5668, 5670, 5677, 5688, 1, 8764, 113, 117, 97, 108, 59, 1, 8771, 117, 108, 108, 69, 113, 117, 97, 108, 59, 1, 8773, 105, 108, 100, 101, 59, 1, 8776, 112, 102, 59, 3, 55349, 56651, 105, 112, 108, 101, 68, 111, 116, 59, 1, 8411, 4, 2, 99, 116, 5717, 5722, 114, 59, 3, 55349, 56495, 114, 111, 107, 59, 1, 358, 4, 14, 97, 98, 99, 100, 102, 103, 109, 110, 111, 112, 114, 115, 116, 117, 5758, 5789, 5805, 5823, 5830, 5835, 5846, 5852, 5921, 5937, 6089, 6095, 6101, 6108, 4, 2, 99, 114, 5764, 5774, 117, 116, 101, 5, 218, 1, 59, 5772, 1, 218, 114, 4, 2, 59, 111, 5781, 5783, 1, 8607, 99, 105, 114, 59, 1, 10569, 114, 4, 2, 99, 101, 5796, 5800, 121, 59, 1, 1038, 118, 101, 59, 1, 364, 4, 2, 105, 121, 5811, 5820, 114, 99, 5, 219, 1, 59, 5818, 1, 219, 59, 1, 1059, 98, 108, 97, 99, 59, 1, 368, 114, 59, 3, 55349, 56600, 114, 97, 118, 101, 5, 217, 1, 59, 5844, 1, 217, 97, 99, 114, 59, 1, 362, 4, 2, 100, 105, 5858, 5905, 101, 114, 4, 2, 66, 80, 5866, 5892, 4, 2, 97, 114, 5872, 5876, 114, 59, 1, 95, 97, 99, 4, 2, 101, 107, 5884, 5887, 59, 1, 9183, 101, 116, 59, 1, 9141, 97, 114, 101, 110, 116, 104, 101, 115, 105, 115, 59, 1, 9181, 111, 110, 4, 2, 59, 80, 5913, 5915, 1, 8899, 108, 117, 115, 59, 1, 8846, 4, 2, 103, 112, 5927, 5932, 111, 110, 59, 1, 370, 102, 59, 3, 55349, 56652, 4, 8, 65, 68, 69, 84, 97, 100, 112, 115, 5955, 5985, 5996, 6009, 6026, 6033, 6044, 6075, 114, 114, 111, 119, 4, 3, 59, 66, 68, 5967, 5969, 5974, 1, 8593, 97, 114, 59, 1, 10514, 111, 119, 110, 65, 114, 114, 111, 119, 59, 1, 8645, 111, 119, 110, 65, 114, 114, 111, 119, 59, 1, 8597, 113, 117, 105, 108, 105, 98, 114, 105, 117, 109, 59, 1, 10606, 101, 101, 4, 2, 59, 65, 6017, 6019, 1, 8869, 114, 114, 111, 119, 59, 1, 8613, 114, 114, 111, 119, 59, 1, 8657, 111, 119, 110, 97, 114, 114, 111, 119, 59, 1, 8661, 101, 114, 4, 2, 76, 82, 6052, 6063, 101, 102, 116, 65, 114, 114, 111, 119, 59, 1, 8598, 105, 103, 104, 116, 65, 114, 114, 111, 119, 59, 1, 8599, 105, 4, 2, 59, 108, 6082, 6084, 1, 978, 111, 110, 59, 1, 933, 105, 110, 103, 59, 1, 366, 99, 114, 59, 3, 55349, 56496, 105, 108, 100, 101, 59, 1, 360, 109, 108, 5, 220, 1, 59, 6115, 1, 220, 4, 9, 68, 98, 99, 100, 101, 102, 111, 115, 118, 6137, 6143, 6148, 6152, 6166, 6250, 6255, 6261, 6267, 97, 115, 104, 59, 1, 8875, 97, 114, 59, 1, 10987, 121, 59, 1, 1042, 97, 115, 104, 4, 2, 59, 108, 6161, 6163, 1, 8873, 59, 1, 10982, 4, 2, 101, 114, 6172, 6175, 59, 1, 8897, 4, 3, 98, 116, 121, 6183, 6188, 6238, 97, 114, 59, 1, 8214, 4, 2, 59, 105, 6194, 6196, 1, 8214, 99, 97, 108, 4, 4, 66, 76, 83, 84, 6209, 6214, 6220, 6231, 97, 114, 59, 1, 8739, 105, 110, 101, 59, 1, 124, 101, 112, 97, 114, 97, 116, 111, 114, 59, 1, 10072, 105, 108, 100, 101, 59, 1, 8768, 84, 104, 105, 110, 83, 112, 97, 99, 101, 59, 1, 8202, 114, 59, 3, 55349, 56601, 112, 102, 59, 3, 55349, 56653, 99, 114, 59, 3, 55349, 56497, 100, 97, 115, 104, 59, 1, 8874, 4, 5, 99, 101, 102, 111, 115, 6286, 6292, 6298, 6303, 6309, 105, 114, 99, 59, 1, 372, 100, 103, 101, 59, 1, 8896, 114, 59, 3, 55349, 56602, 112, 102, 59, 3, 55349, 56654, 99, 114, 59, 3, 55349, 56498, 4, 4, 102, 105, 111, 115, 6325, 6330, 6333, 6339, 114, 59, 3, 55349, 56603, 59, 1, 926, 112, 102, 59, 3, 55349, 56655, 99, 114, 59, 3, 55349, 56499, 4, 9, 65, 73, 85, 97, 99, 102, 111, 115, 117, 6365, 6370, 6375, 6380, 6391, 6405, 6410, 6416, 6422, 99, 121, 59, 1, 1071, 99, 121, 59, 1, 1031, 99, 121, 59, 1, 1070, 99, 117, 116, 101, 5, 221, 1, 59, 6389, 1, 221, 4, 2, 105, 121, 6397, 6402, 114, 99, 59, 1, 374, 59, 1, 1067, 114, 59, 3, 55349, 56604, 112, 102, 59, 3, 55349, 56656, 99, 114, 59, 3, 55349, 56500, 109, 108, 59, 1, 376, 4, 8, 72, 97, 99, 100, 101, 102, 111, 115, 6445, 6450, 6457, 6472, 6477, 6501, 6505, 6510, 99, 121, 59, 1, 1046, 99, 117, 116, 101, 59, 1, 377, 4, 2, 97, 121, 6463, 6469, 114, 111, 110, 59, 1, 381, 59, 1, 1047, 111, 116, 59, 1, 379, 4, 2, 114, 116, 6483, 6497, 111, 87, 105, 100, 116, 104, 83, 112, 97, 99, 101, 59, 1, 8203, 97, 59, 1, 918, 114, 59, 1, 8488, 112, 102, 59, 1, 8484, 99, 114, 59, 3, 55349, 56501, 4, 16, 97, 98, 99, 101, 102, 103, 108, 109, 110, 111, 112, 114, 115, 116, 117, 119, 6550, 6561, 6568, 6612, 6622, 6634, 6645, 6672, 6699, 6854, 6870, 6923, 6933, 6963, 6974, 6983, 99, 117, 116, 101, 5, 225, 1, 59, 6559, 1, 225, 114, 101, 118, 101, 59, 1, 259, 4, 6, 59, 69, 100, 105, 117, 121, 6582, 6584, 6588, 6591, 6600, 6609, 1, 8766, 59, 3, 8766, 819, 59, 1, 8767, 114, 99, 5, 226, 1, 59, 6598, 1, 226, 116, 101, 5, 180, 1, 59, 6607, 1, 180, 59, 1, 1072, 108, 105, 103, 5, 230, 1, 59, 6620, 1, 230, 4, 2, 59, 114, 6628, 6630, 1, 8289, 59, 3, 55349, 56606, 114, 97, 118, 101, 5, 224, 1, 59, 6643, 1, 224, 4, 2, 101, 112, 6651, 6667, 4, 2, 102, 112, 6657, 6663, 115, 121, 109, 59, 1, 8501, 104, 59, 1, 8501, 104, 97, 59, 1, 945, 4, 2, 97, 112, 6678, 6692, 4, 2, 99, 108, 6684, 6688, 114, 59, 1, 257, 103, 59, 1, 10815, 5, 38, 1, 59, 6697, 1, 38, 4, 2, 100, 103, 6705, 6737, 4, 5, 59, 97, 100, 115, 118, 6717, 6719, 6724, 6727, 6734, 1, 8743, 110, 100, 59, 1, 10837, 59, 1, 10844, 108, 111, 112, 101, 59, 1, 10840, 59, 1, 10842, 4, 7, 59, 101, 108, 109, 114, 115, 122, 6753, 6755, 6758, 6762, 6814, 6835, 6848, 1, 8736, 59, 1, 10660, 101, 59, 1, 8736, 115, 100, 4, 2, 59, 97, 6770, 6772, 1, 8737, 4, 8, 97, 98, 99, 100, 101, 102, 103, 104, 6790, 6793, 6796, 6799, 6802, 6805, 6808, 6811, 59, 1, 10664, 59, 1, 10665, 59, 1, 10666, 59, 1, 10667, 59, 1, 10668, 59, 1, 10669, 59, 1, 10670, 59, 1, 10671, 116, 4, 2, 59, 118, 6821, 6823, 1, 8735, 98, 4, 2, 59, 100, 6830, 6832, 1, 8894, 59, 1, 10653, 4, 2, 112, 116, 6841, 6845, 104, 59, 1, 8738, 59, 1, 197, 97, 114, 114, 59, 1, 9084, 4, 2, 103, 112, 6860, 6865, 111, 110, 59, 1, 261, 102, 59, 3, 55349, 56658, 4, 7, 59, 69, 97, 101, 105, 111, 112, 6886, 6888, 6891, 6897, 6900, 6904, 6908, 1, 8776, 59, 1, 10864, 99, 105, 114, 59, 1, 10863, 59, 1, 8778, 100, 59, 1, 8779, 115, 59, 1, 39, 114, 111, 120, 4, 2, 59, 101, 6917, 6919, 1, 8776, 113, 59, 1, 8778, 105, 110, 103, 5, 229, 1, 59, 6931, 1, 229, 4, 3, 99, 116, 121, 6941, 6946, 6949, 114, 59, 3, 55349, 56502, 59, 1, 42, 109, 112, 4, 2, 59, 101, 6957, 6959, 1, 8776, 113, 59, 1, 8781, 105, 108, 100, 101, 5, 227, 1, 59, 6972, 1, 227, 109, 108, 5, 228, 1, 59, 6981, 1, 228, 4, 2, 99, 105, 6989, 6997, 111, 110, 105, 110, 116, 59, 1, 8755, 110, 116, 59, 1, 10769, 4, 16, 78, 97, 98, 99, 100, 101, 102, 105, 107, 108, 110, 111, 112, 114, 115, 117, 7036, 7041, 7119, 7135, 7149, 7155, 7219, 7224, 7347, 7354, 7463, 7489, 7786, 7793, 7814, 7866, 111, 116, 59, 1, 10989, 4, 2, 99, 114, 7047, 7094, 107, 4, 4, 99, 101, 112, 115, 7058, 7064, 7073, 7080, 111, 110, 103, 59, 1, 8780, 112, 115, 105, 108, 111, 110, 59, 1, 1014, 114, 105, 109, 101, 59, 1, 8245, 105, 109, 4, 2, 59, 101, 7088, 7090, 1, 8765, 113, 59, 1, 8909, 4, 2, 118, 119, 7100, 7105, 101, 101, 59, 1, 8893, 101, 100, 4, 2, 59, 103, 7113, 7115, 1, 8965, 101, 59, 1, 8965, 114, 107, 4, 2, 59, 116, 7127, 7129, 1, 9141, 98, 114, 107, 59, 1, 9142, 4, 2, 111, 121, 7141, 7146, 110, 103, 59, 1, 8780, 59, 1, 1073, 113, 117, 111, 59, 1, 8222, 4, 5, 99, 109, 112, 114, 116, 7167, 7181, 7188, 7193, 7199, 97, 117, 115, 4, 2, 59, 101, 7176, 7178, 1, 8757, 59, 1, 8757, 112, 116, 121, 118, 59, 1, 10672, 115, 105, 59, 1, 1014, 110, 111, 117, 59, 1, 8492, 4, 3, 97, 104, 119, 7207, 7210, 7213, 59, 1, 946, 59, 1, 8502, 101, 101, 110, 59, 1, 8812, 114, 59, 3, 55349, 56607, 103, 4, 7, 99, 111, 115, 116, 117, 118, 119, 7241, 7262, 7288, 7305, 7328, 7335, 7340, 4, 3, 97, 105, 117, 7249, 7253, 7258, 112, 59, 1, 8898, 114, 99, 59, 1, 9711, 112, 59, 1, 8899, 4, 3, 100, 112, 116, 7270, 7275, 7281, 111, 116, 59, 1, 10752, 108, 117, 115, 59, 1, 10753, 105, 109, 101, 115, 59, 1, 10754, 4, 2, 113, 116, 7294, 7300, 99, 117, 112, 59, 1, 10758, 97, 114, 59, 1, 9733, 114, 105, 97, 110, 103, 108, 101, 4, 2, 100, 117, 7318, 7324, 111, 119, 110, 59, 1, 9661, 112, 59, 1, 9651, 112, 108, 117, 115, 59, 1, 10756, 101, 101, 59, 1, 8897, 101, 100, 103, 101, 59, 1, 8896, 97, 114, 111, 119, 59, 1, 10509, 4, 3, 97, 107, 111, 7362, 7436, 7458, 4, 2, 99, 110, 7368, 7432, 107, 4, 3, 108, 115, 116, 7377, 7386, 7394, 111, 122, 101, 110, 103, 101, 59, 1, 10731, 113, 117, 97, 114, 101, 59, 1, 9642, 114, 105, 97, 110, 103, 108, 101, 4, 4, 59, 100, 108, 114, 7411, 7413, 7419, 7425, 1, 9652, 111, 119, 110, 59, 1, 9662, 101, 102, 116, 59, 1, 9666, 105, 103, 104, 116, 59, 1, 9656, 107, 59, 1, 9251, 4, 2, 49, 51, 7442, 7454, 4, 2, 50, 52, 7448, 7451, 59, 1, 9618, 59, 1, 9617, 52, 59, 1, 9619, 99, 107, 59, 1, 9608, 4, 2, 101, 111, 7469, 7485, 4, 2, 59, 113, 7475, 7478, 3, 61, 8421, 117, 105, 118, 59, 3, 8801, 8421, 116, 59, 1, 8976, 4, 4, 112, 116, 119, 120, 7499, 7504, 7517, 7523, 102, 59, 3, 55349, 56659, 4, 2, 59, 116, 7510, 7512, 1, 8869, 111, 109, 59, 1, 8869, 116, 105, 101, 59, 1, 8904, 4, 12, 68, 72, 85, 86, 98, 100, 104, 109, 112, 116, 117, 118, 7549, 7571, 7597, 7619, 7655, 7660, 7682, 7708, 7715, 7721, 7728, 7750, 4, 4, 76, 82, 108, 114, 7559, 7562, 7565, 7568, 59, 1, 9559, 59, 1, 9556, 59, 1, 9558, 59, 1, 9555, 4, 5, 59, 68, 85, 100, 117, 7583, 7585, 7588, 7591, 7594, 1, 9552, 59, 1, 9574, 59, 1, 9577, 59, 1, 9572, 59, 1, 9575, 4, 4, 76, 82, 108, 114, 7607, 7610, 7613, 7616, 59, 1, 9565, 59, 1, 9562, 59, 1, 9564, 59, 1, 9561, 4, 7, 59, 72, 76, 82, 104, 108, 114, 7635, 7637, 7640, 7643, 7646, 7649, 7652, 1, 9553, 59, 1, 9580, 59, 1, 9571, 59, 1, 9568, 59, 1, 9579, 59, 1, 9570, 59, 1, 9567, 111, 120, 59, 1, 10697, 4, 4, 76, 82, 108, 114, 7670, 7673, 7676, 7679, 59, 1, 9557, 59, 1, 9554, 59, 1, 9488, 59, 1, 9484, 4, 5, 59, 68, 85, 100, 117, 7694, 7696, 7699, 7702, 7705, 1, 9472, 59, 1, 9573, 59, 1, 9576, 59, 1, 9516, 59, 1, 9524, 105, 110, 117, 115, 59, 1, 8863, 108, 117, 115, 59, 1, 8862, 105, 109, 101, 115, 59, 1, 8864, 4, 4, 76, 82, 108, 114, 7738, 7741, 7744, 7747, 59, 1, 9563, 59, 1, 9560, 59, 1, 9496, 59, 1, 9492, 4, 7, 59, 72, 76, 82, 104, 108, 114, 7766, 7768, 7771, 7774, 7777, 7780, 7783, 1, 9474, 59, 1, 9578, 59, 1, 9569, 59, 1, 9566, 59, 1, 9532, 59, 1, 9508, 59, 1, 9500, 114, 105, 109, 101, 59, 1, 8245, 4, 2, 101, 118, 7799, 7804, 118, 101, 59, 1, 728, 98, 97, 114, 5, 166, 1, 59, 7812, 1, 166, 4, 4, 99, 101, 105, 111, 7824, 7829, 7834, 7846, 114, 59, 3, 55349, 56503, 109, 105, 59, 1, 8271, 109, 4, 2, 59, 101, 7841, 7843, 1, 8765, 59, 1, 8909, 108, 4, 3, 59, 98, 104, 7855, 7857, 7860, 1, 92, 59, 1, 10693, 115, 117, 98, 59, 1, 10184, 4, 2, 108, 109, 7872, 7885, 108, 4, 2, 59, 101, 7879, 7881, 1, 8226, 116, 59, 1, 8226, 112, 4, 3, 59, 69, 101, 7894, 7896, 7899, 1, 8782, 59, 1, 10926, 4, 2, 59, 113, 7905, 7907, 1, 8783, 59, 1, 8783, 4, 15, 97, 99, 100, 101, 102, 104, 105, 108, 111, 114, 115, 116, 117, 119, 121, 7942, 8021, 8075, 8080, 8121, 8126, 8157, 8279, 8295, 8430, 8446, 8485, 8491, 8707, 8726, 4, 3, 99, 112, 114, 7950, 7956, 8007, 117, 116, 101, 59, 1, 263, 4, 6, 59, 97, 98, 99, 100, 115, 7970, 7972, 7977, 7984, 7998, 8003, 1, 8745, 110, 100, 59, 1, 10820, 114, 99, 117, 112, 59, 1, 10825, 4, 2, 97, 117, 7990, 7994, 112, 59, 1, 10827, 112, 59, 1, 10823, 111, 116, 59, 1, 10816, 59, 3, 8745, 65024, 4, 2, 101, 111, 8013, 8017, 116, 59, 1, 8257, 110, 59, 1, 711, 4, 4, 97, 101, 105, 117, 8031, 8046, 8056, 8061, 4, 2, 112, 114, 8037, 8041, 115, 59, 1, 10829, 111, 110, 59, 1, 269, 100, 105, 108, 5, 231, 1, 59, 8054, 1, 231, 114, 99, 59, 1, 265, 112, 115, 4, 2, 59, 115, 8069, 8071, 1, 10828, 109, 59, 1, 10832, 111, 116, 59, 1, 267, 4, 3, 100, 109, 110, 8088, 8097, 8104, 105, 108, 5, 184, 1, 59, 8095, 1, 184, 112, 116, 121, 118, 59, 1, 10674, 116, 5, 162, 2, 59, 101, 8112, 8114, 1, 162, 114, 100, 111, 116, 59, 1, 183, 114, 59, 3, 55349, 56608, 4, 3, 99, 101, 105, 8134, 8138, 8154, 121, 59, 1, 1095, 99, 107, 4, 2, 59, 109, 8146, 8148, 1, 10003, 97, 114, 107, 59, 1, 10003, 59, 1, 967, 114, 4, 7, 59, 69, 99, 101, 102, 109, 115, 8174, 8176, 8179, 8258, 8261, 8268, 8273, 1, 9675, 59, 1, 10691, 4, 3, 59, 101, 108, 8187, 8189, 8193, 1, 710, 113, 59, 1, 8791, 101, 4, 2, 97, 100, 8200, 8223, 114, 114, 111, 119, 4, 2, 108, 114, 8210, 8216, 101, 102, 116, 59, 1, 8634, 105, 103, 104, 116, 59, 1, 8635, 4, 5, 82, 83, 97, 99, 100, 8235, 8238, 8241, 8246, 8252, 59, 1, 174, 59, 1, 9416, 115, 116, 59, 1, 8859, 105, 114, 99, 59, 1, 8858, 97, 115, 104, 59, 1, 8861, 59, 1, 8791, 110, 105, 110, 116, 59, 1, 10768, 105, 100, 59, 1, 10991, 99, 105, 114, 59, 1, 10690, 117, 98, 115, 4, 2, 59, 117, 8288, 8290, 1, 9827, 105, 116, 59, 1, 9827, 4, 4, 108, 109, 110, 112, 8305, 8326, 8376, 8400, 111, 110, 4, 2, 59, 101, 8313, 8315, 1, 58, 4, 2, 59, 113, 8321, 8323, 1, 8788, 59, 1, 8788, 4, 2, 109, 112, 8332, 8344, 97, 4, 2, 59, 116, 8339, 8341, 1, 44, 59, 1, 64, 4, 3, 59, 102, 108, 8352, 8354, 8358, 1, 8705, 110, 59, 1, 8728, 101, 4, 2, 109, 120, 8365, 8371, 101, 110, 116, 59, 1, 8705, 101, 115, 59, 1, 8450, 4, 2, 103, 105, 8382, 8395, 4, 2, 59, 100, 8388, 8390, 1, 8773, 111, 116, 59, 1, 10861, 110, 116, 59, 1, 8750, 4, 3, 102, 114, 121, 8408, 8412, 8417, 59, 3, 55349, 56660, 111, 100, 59, 1, 8720, 5, 169, 2, 59, 115, 8424, 8426, 1, 169, 114, 59, 1, 8471, 4, 2, 97, 111, 8436, 8441, 114, 114, 59, 1, 8629, 115, 115, 59, 1, 10007, 4, 2, 99, 117, 8452, 8457, 114, 59, 3, 55349, 56504, 4, 2, 98, 112, 8463, 8474, 4, 2, 59, 101, 8469, 8471, 1, 10959, 59, 1, 10961, 4, 2, 59, 101, 8480, 8482, 1, 10960, 59, 1, 10962, 100, 111, 116, 59, 1, 8943, 4, 7, 100, 101, 108, 112, 114, 118, 119, 8507, 8522, 8536, 8550, 8600, 8697, 8702, 97, 114, 114, 4, 2, 108, 114, 8516, 8519, 59, 1, 10552, 59, 1, 10549, 4, 2, 112, 115, 8528, 8532, 114, 59, 1, 8926, 99, 59, 1, 8927, 97, 114, 114, 4, 2, 59, 112, 8545, 8547, 1, 8630, 59, 1, 10557, 4, 6, 59, 98, 99, 100, 111, 115, 8564, 8566, 8573, 8587, 8592, 8596, 1, 8746, 114, 99, 97, 112, 59, 1, 10824, 4, 2, 97, 117, 8579, 8583, 112, 59, 1, 10822, 112, 59, 1, 10826, 111, 116, 59, 1, 8845, 114, 59, 1, 10821, 59, 3, 8746, 65024, 4, 4, 97, 108, 114, 118, 8610, 8623, 8663, 8672, 114, 114, 4, 2, 59, 109, 8618, 8620, 1, 8631, 59, 1, 10556, 121, 4, 3, 101, 118, 119, 8632, 8651, 8656, 113, 4, 2, 112, 115, 8639, 8645, 114, 101, 99, 59, 1, 8926, 117, 99, 99, 59, 1, 8927, 101, 101, 59, 1, 8910, 101, 100, 103, 101, 59, 1, 8911, 101, 110, 5, 164, 1, 59, 8670, 1, 164, 101, 97, 114, 114, 111, 119, 4, 2, 108, 114, 8684, 8690, 101, 102, 116, 59, 1, 8630, 105, 103, 104, 116, 59, 1, 8631, 101, 101, 59, 1, 8910, 101, 100, 59, 1, 8911, 4, 2, 99, 105, 8713, 8721, 111, 110, 105, 110, 116, 59, 1, 8754, 110, 116, 59, 1, 8753, 108, 99, 116, 121, 59, 1, 9005, 4, 19, 65, 72, 97, 98, 99, 100, 101, 102, 104, 105, 106, 108, 111, 114, 115, 116, 117, 119, 122, 8773, 8778, 8783, 8821, 8839, 8854, 8887, 8914, 8930, 8944, 9036, 9041, 9058, 9197, 9227, 9258, 9281, 9297, 9305, 114, 114, 59, 1, 8659, 97, 114, 59, 1, 10597, 4, 4, 103, 108, 114, 115, 8793, 8799, 8805, 8809, 103, 101, 114, 59, 1, 8224, 101, 116, 104, 59, 1, 8504, 114, 59, 1, 8595, 104, 4, 2, 59, 118, 8816, 8818, 1, 8208, 59, 1, 8867, 4, 2, 107, 108, 8827, 8834, 97, 114, 111, 119, 59, 1, 10511, 97, 99, 59, 1, 733, 4, 2, 97, 121, 8845, 8851, 114, 111, 110, 59, 1, 271, 59, 1, 1076, 4, 3, 59, 97, 111, 8862, 8864, 8880, 1, 8518, 4, 2, 103, 114, 8870, 8876, 103, 101, 114, 59, 1, 8225, 114, 59, 1, 8650, 116, 115, 101, 113, 59, 1, 10871, 4, 3, 103, 108, 109, 8895, 8902, 8907, 5, 176, 1, 59, 8900, 1, 176, 116, 97, 59, 1, 948, 112, 116, 121, 118, 59, 1, 10673, 4, 2, 105, 114, 8920, 8926, 115, 104, 116, 59, 1, 10623, 59, 3, 55349, 56609, 97, 114, 4, 2, 108, 114, 8938, 8941, 59, 1, 8643, 59, 1, 8642, 4, 5, 97, 101, 103, 115, 118, 8956, 8986, 8989, 8996, 9001, 109, 4, 3, 59, 111, 115, 8965, 8967, 8983, 1, 8900, 110, 100, 4, 2, 59, 115, 8975, 8977, 1, 8900, 117, 105, 116, 59, 1, 9830, 59, 1, 9830, 59, 1, 168, 97, 109, 109, 97, 59, 1, 989, 105, 110, 59, 1, 8946, 4, 3, 59, 105, 111, 9009, 9011, 9031, 1, 247, 100, 101, 5, 247, 2, 59, 111, 9020, 9022, 1, 247, 110, 116, 105, 109, 101, 115, 59, 1, 8903, 110, 120, 59, 1, 8903, 99, 121, 59, 1, 1106, 99, 4, 2, 111, 114, 9048, 9053, 114, 110, 59, 1, 8990, 111, 112, 59, 1, 8973, 4, 5, 108, 112, 116, 117, 119, 9070, 9076, 9081, 9130, 9144, 108, 97, 114, 59, 1, 36, 102, 59, 3, 55349, 56661, 4, 5, 59, 101, 109, 112, 115, 9093, 9095, 9109, 9116, 9122, 1, 729, 113, 4, 2, 59, 100, 9102, 9104, 1, 8784, 111, 116, 59, 1, 8785, 105, 110, 117, 115, 59, 1, 8760, 108, 117, 115, 59, 1, 8724, 113, 117, 97, 114, 101, 59, 1, 8865, 98, 108, 101, 98, 97, 114, 119, 101, 100, 103, 101, 59, 1, 8966, 110, 4, 3, 97, 100, 104, 9153, 9160, 9172, 114, 114, 111, 119, 59, 1, 8595, 111, 119, 110, 97, 114, 114, 111, 119, 115, 59, 1, 8650, 97, 114, 112, 111, 111, 110, 4, 2, 108, 114, 9184, 9190, 101, 102, 116, 59, 1, 8643, 105, 103, 104, 116, 59, 1, 8642, 4, 2, 98, 99, 9203, 9211, 107, 97, 114, 111, 119, 59, 1, 10512, 4, 2, 111, 114, 9217, 9222, 114, 110, 59, 1, 8991, 111, 112, 59, 1, 8972, 4, 3, 99, 111, 116, 9235, 9248, 9252, 4, 2, 114, 121, 9241, 9245, 59, 3, 55349, 56505, 59, 1, 1109, 108, 59, 1, 10742, 114, 111, 107, 59, 1, 273, 4, 2, 100, 114, 9264, 9269, 111, 116, 59, 1, 8945, 105, 4, 2, 59, 102, 9276, 9278, 1, 9663, 59, 1, 9662, 4, 2, 97, 104, 9287, 9292, 114, 114, 59, 1, 8693, 97, 114, 59, 1, 10607, 97, 110, 103, 108, 101, 59, 1, 10662, 4, 2, 99, 105, 9311, 9315, 121, 59, 1, 1119, 103, 114, 97, 114, 114, 59, 1, 10239, 4, 18, 68, 97, 99, 100, 101, 102, 103, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 120, 9361, 9376, 9398, 9439, 9444, 9447, 9462, 9495, 9531, 9585, 9598, 9614, 9659, 9755, 9771, 9792, 9808, 9826, 4, 2, 68, 111, 9367, 9372, 111, 116, 59, 1, 10871, 116, 59, 1, 8785, 4, 2, 99, 115, 9382, 9392, 117, 116, 101, 5, 233, 1, 59, 9390, 1, 233, 116, 101, 114, 59, 1, 10862, 4, 4, 97, 105, 111, 121, 9408, 9414, 9430, 9436, 114, 111, 110, 59, 1, 283, 114, 4, 2, 59, 99, 9421, 9423, 1, 8790, 5, 234, 1, 59, 9428, 1, 234, 108, 111, 110, 59, 1, 8789, 59, 1, 1101, 111, 116, 59, 1, 279, 59, 1, 8519, 4, 2, 68, 114, 9453, 9458, 111, 116, 59, 1, 8786, 59, 3, 55349, 56610, 4, 3, 59, 114, 115, 9470, 9472, 9482, 1, 10906, 97, 118, 101, 5, 232, 1, 59, 9480, 1, 232, 4, 2, 59, 100, 9488, 9490, 1, 10902, 111, 116, 59, 1, 10904, 4, 4, 59, 105, 108, 115, 9505, 9507, 9515, 9518, 1, 10905, 110, 116, 101, 114, 115, 59, 1, 9191, 59, 1, 8467, 4, 2, 59, 100, 9524, 9526, 1, 10901, 111, 116, 59, 1, 10903, 4, 3, 97, 112, 115, 9539, 9544, 9564, 99, 114, 59, 1, 275, 116, 121, 4, 3, 59, 115, 118, 9554, 9556, 9561, 1, 8709, 101, 116, 59, 1, 8709, 59, 1, 8709, 112, 4, 2, 49, 59, 9571, 9583, 4, 2, 51, 52, 9577, 9580, 59, 1, 8196, 59, 1, 8197, 1, 8195, 4, 2, 103, 115, 9591, 9594, 59, 1, 331, 112, 59, 1, 8194, 4, 2, 103, 112, 9604, 9609, 111, 110, 59, 1, 281, 102, 59, 3, 55349, 56662, 4, 3, 97, 108, 115, 9622, 9635, 9640, 114, 4, 2, 59, 115, 9629, 9631, 1, 8917, 108, 59, 1, 10723, 117, 115, 59, 1, 10865, 105, 4, 3, 59, 108, 118, 9649, 9651, 9656, 1, 949, 111, 110, 59, 1, 949, 59, 1, 1013, 4, 4, 99, 115, 117, 118, 9669, 9686, 9716, 9747, 4, 2, 105, 111, 9675, 9680, 114, 99, 59, 1, 8790, 108, 111, 110, 59, 1, 8789, 4, 2, 105, 108, 9692, 9696, 109, 59, 1, 8770, 97, 110, 116, 4, 2, 103, 108, 9705, 9710, 116, 114, 59, 1, 10902, 101, 115, 115, 59, 1, 10901, 4, 3, 97, 101, 105, 9724, 9729, 9734, 108, 115, 59, 1, 61, 115, 116, 59, 1, 8799, 118, 4, 2, 59, 68, 9741, 9743, 1, 8801, 68, 59, 1, 10872, 112, 97, 114, 115, 108, 59, 1, 10725, 4, 2, 68, 97, 9761, 9766, 111, 116, 59, 1, 8787, 114, 114, 59, 1, 10609, 4, 3, 99, 100, 105, 9779, 9783, 9788, 114, 59, 1, 8495, 111, 116, 59, 1, 8784, 109, 59, 1, 8770, 4, 2, 97, 104, 9798, 9801, 59, 1, 951, 5, 240, 1, 59, 9806, 1, 240, 4, 2, 109, 114, 9814, 9822, 108, 5, 235, 1, 59, 9820, 1, 235, 111, 59, 1, 8364, 4, 3, 99, 105, 112, 9834, 9838, 9843, 108, 59, 1, 33, 115, 116, 59, 1, 8707, 4, 2, 101, 111, 9849, 9859, 99, 116, 97, 116, 105, 111, 110, 59, 1, 8496, 110, 101, 110, 116, 105, 97, 108, 101, 59, 1, 8519, 4, 12, 97, 99, 101, 102, 105, 106, 108, 110, 111, 112, 114, 115, 9896, 9910, 9914, 9921, 9954, 9960, 9967, 9989, 9994, 10027, 10036, 10164, 108, 108, 105, 110, 103, 100, 111, 116, 115, 101, 113, 59, 1, 8786, 121, 59, 1, 1092, 109, 97, 108, 101, 59, 1, 9792, 4, 3, 105, 108, 114, 9929, 9935, 9950, 108, 105, 103, 59, 1, 64259, 4, 2, 105, 108, 9941, 9945, 103, 59, 1, 64256, 105, 103, 59, 1, 64260, 59, 3, 55349, 56611, 108, 105, 103, 59, 1, 64257, 108, 105, 103, 59, 3, 102, 106, 4, 3, 97, 108, 116, 9975, 9979, 9984, 116, 59, 1, 9837, 105, 103, 59, 1, 64258, 110, 115, 59, 1, 9649, 111, 102, 59, 1, 402, 4, 2, 112, 114, 1e4, 10005, 102, 59, 3, 55349, 56663, 4, 2, 97, 107, 10011, 10016, 108, 108, 59, 1, 8704, 4, 2, 59, 118, 10022, 10024, 1, 8916, 59, 1, 10969, 97, 114, 116, 105, 110, 116, 59, 1, 10765, 4, 2, 97, 111, 10042, 10159, 4, 2, 99, 115, 10048, 10155, 4, 6, 49, 50, 51, 52, 53, 55, 10062, 10102, 10114, 10135, 10139, 10151, 4, 6, 50, 51, 52, 53, 54, 56, 10076, 10083, 10086, 10093, 10096, 10099, 5, 189, 1, 59, 10081, 1, 189, 59, 1, 8531, 5, 188, 1, 59, 10091, 1, 188, 59, 1, 8533, 59, 1, 8537, 59, 1, 8539, 4, 2, 51, 53, 10108, 10111, 59, 1, 8532, 59, 1, 8534, 4, 3, 52, 53, 56, 10122, 10129, 10132, 5, 190, 1, 59, 10127, 1, 190, 59, 1, 8535, 59, 1, 8540, 53, 59, 1, 8536, 4, 2, 54, 56, 10145, 10148, 59, 1, 8538, 59, 1, 8541, 56, 59, 1, 8542, 108, 59, 1, 8260, 119, 110, 59, 1, 8994, 99, 114, 59, 3, 55349, 56507, 4, 17, 69, 97, 98, 99, 100, 101, 102, 103, 105, 106, 108, 110, 111, 114, 115, 116, 118, 10206, 10217, 10247, 10254, 10268, 10273, 10358, 10363, 10374, 10380, 10385, 10406, 10458, 10464, 10470, 10497, 10610, 4, 2, 59, 108, 10212, 10214, 1, 8807, 59, 1, 10892, 4, 3, 99, 109, 112, 10225, 10231, 10244, 117, 116, 101, 59, 1, 501, 109, 97, 4, 2, 59, 100, 10239, 10241, 1, 947, 59, 1, 989, 59, 1, 10886, 114, 101, 118, 101, 59, 1, 287, 4, 2, 105, 121, 10260, 10265, 114, 99, 59, 1, 285, 59, 1, 1075, 111, 116, 59, 1, 289, 4, 4, 59, 108, 113, 115, 10283, 10285, 10288, 10308, 1, 8805, 59, 1, 8923, 4, 3, 59, 113, 115, 10296, 10298, 10301, 1, 8805, 59, 1, 8807, 108, 97, 110, 116, 59, 1, 10878, 4, 4, 59, 99, 100, 108, 10318, 10320, 10324, 10345, 1, 10878, 99, 59, 1, 10921, 111, 116, 4, 2, 59, 111, 10332, 10334, 1, 10880, 4, 2, 59, 108, 10340, 10342, 1, 10882, 59, 1, 10884, 4, 2, 59, 101, 10351, 10354, 3, 8923, 65024, 115, 59, 1, 10900, 114, 59, 3, 55349, 56612, 4, 2, 59, 103, 10369, 10371, 1, 8811, 59, 1, 8921, 109, 101, 108, 59, 1, 8503, 99, 121, 59, 1, 1107, 4, 4, 59, 69, 97, 106, 10395, 10397, 10400, 10403, 1, 8823, 59, 1, 10898, 59, 1, 10917, 59, 1, 10916, 4, 4, 69, 97, 101, 115, 10416, 10419, 10434, 10453, 59, 1, 8809, 112, 4, 2, 59, 112, 10426, 10428, 1, 10890, 114, 111, 120, 59, 1, 10890, 4, 2, 59, 113, 10440, 10442, 1, 10888, 4, 2, 59, 113, 10448, 10450, 1, 10888, 59, 1, 8809, 105, 109, 59, 1, 8935, 112, 102, 59, 3, 55349, 56664, 97, 118, 101, 59, 1, 96, 4, 2, 99, 105, 10476, 10480, 114, 59, 1, 8458, 109, 4, 3, 59, 101, 108, 10489, 10491, 10494, 1, 8819, 59, 1, 10894, 59, 1, 10896, 5, 62, 6, 59, 99, 100, 108, 113, 114, 10512, 10514, 10527, 10532, 10538, 10545, 1, 62, 4, 2, 99, 105, 10520, 10523, 59, 1, 10919, 114, 59, 1, 10874, 111, 116, 59, 1, 8919, 80, 97, 114, 59, 1, 10645, 117, 101, 115, 116, 59, 1, 10876, 4, 5, 97, 100, 101, 108, 115, 10557, 10574, 10579, 10599, 10605, 4, 2, 112, 114, 10563, 10570, 112, 114, 111, 120, 59, 1, 10886, 114, 59, 1, 10616, 111, 116, 59, 1, 8919, 113, 4, 2, 108, 113, 10586, 10592, 101, 115, 115, 59, 1, 8923, 108, 101, 115, 115, 59, 1, 10892, 101, 115, 115, 59, 1, 8823, 105, 109, 59, 1, 8819, 4, 2, 101, 110, 10616, 10626, 114, 116, 110, 101, 113, 113, 59, 3, 8809, 65024, 69, 59, 3, 8809, 65024, 4, 10, 65, 97, 98, 99, 101, 102, 107, 111, 115, 121, 10653, 10658, 10713, 10718, 10724, 10760, 10765, 10786, 10850, 10875, 114, 114, 59, 1, 8660, 4, 4, 105, 108, 109, 114, 10668, 10674, 10678, 10684, 114, 115, 112, 59, 1, 8202, 102, 59, 1, 189, 105, 108, 116, 59, 1, 8459, 4, 2, 100, 114, 10690, 10695, 99, 121, 59, 1, 1098, 4, 3, 59, 99, 119, 10703, 10705, 10710, 1, 8596, 105, 114, 59, 1, 10568, 59, 1, 8621, 97, 114, 59, 1, 8463, 105, 114, 99, 59, 1, 293, 4, 3, 97, 108, 114, 10732, 10748, 10754, 114, 116, 115, 4, 2, 59, 117, 10741, 10743, 1, 9829, 105, 116, 59, 1, 9829, 108, 105, 112, 59, 1, 8230, 99, 111, 110, 59, 1, 8889, 114, 59, 3, 55349, 56613, 115, 4, 2, 101, 119, 10772, 10779, 97, 114, 111, 119, 59, 1, 10533, 97, 114, 111, 119, 59, 1, 10534, 4, 5, 97, 109, 111, 112, 114, 10798, 10803, 10809, 10839, 10844, 114, 114, 59, 1, 8703, 116, 104, 116, 59, 1, 8763, 107, 4, 2, 108, 114, 10816, 10827, 101, 102, 116, 97, 114, 114, 111, 119, 59, 1, 8617, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8618, 102, 59, 3, 55349, 56665, 98, 97, 114, 59, 1, 8213, 4, 3, 99, 108, 116, 10858, 10863, 10869, 114, 59, 3, 55349, 56509, 97, 115, 104, 59, 1, 8463, 114, 111, 107, 59, 1, 295, 4, 2, 98, 112, 10881, 10887, 117, 108, 108, 59, 1, 8259, 104, 101, 110, 59, 1, 8208, 4, 15, 97, 99, 101, 102, 103, 105, 106, 109, 110, 111, 112, 113, 115, 116, 117, 10925, 10936, 10958, 10977, 10990, 11001, 11039, 11045, 11101, 11192, 11220, 11226, 11237, 11285, 11299, 99, 117, 116, 101, 5, 237, 1, 59, 10934, 1, 237, 4, 3, 59, 105, 121, 10944, 10946, 10955, 1, 8291, 114, 99, 5, 238, 1, 59, 10953, 1, 238, 59, 1, 1080, 4, 2, 99, 120, 10964, 10968, 121, 59, 1, 1077, 99, 108, 5, 161, 1, 59, 10975, 1, 161, 4, 2, 102, 114, 10983, 10986, 59, 1, 8660, 59, 3, 55349, 56614, 114, 97, 118, 101, 5, 236, 1, 59, 10999, 1, 236, 4, 4, 59, 105, 110, 111, 11011, 11013, 11028, 11034, 1, 8520, 4, 2, 105, 110, 11019, 11024, 110, 116, 59, 1, 10764, 116, 59, 1, 8749, 102, 105, 110, 59, 1, 10716, 116, 97, 59, 1, 8489, 108, 105, 103, 59, 1, 307, 4, 3, 97, 111, 112, 11053, 11092, 11096, 4, 3, 99, 103, 116, 11061, 11065, 11088, 114, 59, 1, 299, 4, 3, 101, 108, 112, 11073, 11076, 11082, 59, 1, 8465, 105, 110, 101, 59, 1, 8464, 97, 114, 116, 59, 1, 8465, 104, 59, 1, 305, 102, 59, 1, 8887, 101, 100, 59, 1, 437, 4, 5, 59, 99, 102, 111, 116, 11113, 11115, 11121, 11136, 11142, 1, 8712, 97, 114, 101, 59, 1, 8453, 105, 110, 4, 2, 59, 116, 11129, 11131, 1, 8734, 105, 101, 59, 1, 10717, 100, 111, 116, 59, 1, 305, 4, 5, 59, 99, 101, 108, 112, 11154, 11156, 11161, 11179, 11186, 1, 8747, 97, 108, 59, 1, 8890, 4, 2, 103, 114, 11167, 11173, 101, 114, 115, 59, 1, 8484, 99, 97, 108, 59, 1, 8890, 97, 114, 104, 107, 59, 1, 10775, 114, 111, 100, 59, 1, 10812, 4, 4, 99, 103, 112, 116, 11202, 11206, 11211, 11216, 121, 59, 1, 1105, 111, 110, 59, 1, 303, 102, 59, 3, 55349, 56666, 97, 59, 1, 953, 114, 111, 100, 59, 1, 10812, 117, 101, 115, 116, 5, 191, 1, 59, 11235, 1, 191, 4, 2, 99, 105, 11243, 11248, 114, 59, 3, 55349, 56510, 110, 4, 5, 59, 69, 100, 115, 118, 11261, 11263, 11266, 11271, 11282, 1, 8712, 59, 1, 8953, 111, 116, 59, 1, 8949, 4, 2, 59, 118, 11277, 11279, 1, 8948, 59, 1, 8947, 59, 1, 8712, 4, 2, 59, 105, 11291, 11293, 1, 8290, 108, 100, 101, 59, 1, 297, 4, 2, 107, 109, 11305, 11310, 99, 121, 59, 1, 1110, 108, 5, 239, 1, 59, 11316, 1, 239, 4, 6, 99, 102, 109, 111, 115, 117, 11332, 11346, 11351, 11357, 11363, 11380, 4, 2, 105, 121, 11338, 11343, 114, 99, 59, 1, 309, 59, 1, 1081, 114, 59, 3, 55349, 56615, 97, 116, 104, 59, 1, 567, 112, 102, 59, 3, 55349, 56667, 4, 2, 99, 101, 11369, 11374, 114, 59, 3, 55349, 56511, 114, 99, 121, 59, 1, 1112, 107, 99, 121, 59, 1, 1108, 4, 8, 97, 99, 102, 103, 104, 106, 111, 115, 11404, 11418, 11433, 11438, 11445, 11450, 11455, 11461, 112, 112, 97, 4, 2, 59, 118, 11413, 11415, 1, 954, 59, 1, 1008, 4, 2, 101, 121, 11424, 11430, 100, 105, 108, 59, 1, 311, 59, 1, 1082, 114, 59, 3, 55349, 56616, 114, 101, 101, 110, 59, 1, 312, 99, 121, 59, 1, 1093, 99, 121, 59, 1, 1116, 112, 102, 59, 3, 55349, 56668, 99, 114, 59, 3, 55349, 56512, 4, 23, 65, 66, 69, 72, 97, 98, 99, 100, 101, 102, 103, 104, 106, 108, 109, 110, 111, 112, 114, 115, 116, 117, 118, 11515, 11538, 11544, 11555, 11560, 11721, 11780, 11818, 11868, 12136, 12160, 12171, 12203, 12208, 12246, 12275, 12327, 12509, 12523, 12569, 12641, 12732, 12752, 4, 3, 97, 114, 116, 11523, 11528, 11532, 114, 114, 59, 1, 8666, 114, 59, 1, 8656, 97, 105, 108, 59, 1, 10523, 97, 114, 114, 59, 1, 10510, 4, 2, 59, 103, 11550, 11552, 1, 8806, 59, 1, 10891, 97, 114, 59, 1, 10594, 4, 9, 99, 101, 103, 109, 110, 112, 113, 114, 116, 11580, 11586, 11594, 11600, 11606, 11624, 11627, 11636, 11694, 117, 116, 101, 59, 1, 314, 109, 112, 116, 121, 118, 59, 1, 10676, 114, 97, 110, 59, 1, 8466, 98, 100, 97, 59, 1, 955, 103, 4, 3, 59, 100, 108, 11615, 11617, 11620, 1, 10216, 59, 1, 10641, 101, 59, 1, 10216, 59, 1, 10885, 117, 111, 5, 171, 1, 59, 11634, 1, 171, 114, 4, 8, 59, 98, 102, 104, 108, 112, 115, 116, 11655, 11657, 11669, 11673, 11677, 11681, 11685, 11690, 1, 8592, 4, 2, 59, 102, 11663, 11665, 1, 8676, 115, 59, 1, 10527, 115, 59, 1, 10525, 107, 59, 1, 8617, 112, 59, 1, 8619, 108, 59, 1, 10553, 105, 109, 59, 1, 10611, 108, 59, 1, 8610, 4, 3, 59, 97, 101, 11702, 11704, 11709, 1, 10923, 105, 108, 59, 1, 10521, 4, 2, 59, 115, 11715, 11717, 1, 10925, 59, 3, 10925, 65024, 4, 3, 97, 98, 114, 11729, 11734, 11739, 114, 114, 59, 1, 10508, 114, 107, 59, 1, 10098, 4, 2, 97, 107, 11745, 11758, 99, 4, 2, 101, 107, 11752, 11755, 59, 1, 123, 59, 1, 91, 4, 2, 101, 115, 11764, 11767, 59, 1, 10635, 108, 4, 2, 100, 117, 11774, 11777, 59, 1, 10639, 59, 1, 10637, 4, 4, 97, 101, 117, 121, 11790, 11796, 11811, 11815, 114, 111, 110, 59, 1, 318, 4, 2, 100, 105, 11802, 11807, 105, 108, 59, 1, 316, 108, 59, 1, 8968, 98, 59, 1, 123, 59, 1, 1083, 4, 4, 99, 113, 114, 115, 11828, 11832, 11845, 11864, 97, 59, 1, 10550, 117, 111, 4, 2, 59, 114, 11840, 11842, 1, 8220, 59, 1, 8222, 4, 2, 100, 117, 11851, 11857, 104, 97, 114, 59, 1, 10599, 115, 104, 97, 114, 59, 1, 10571, 104, 59, 1, 8626, 4, 5, 59, 102, 103, 113, 115, 11880, 11882, 12008, 12011, 12031, 1, 8804, 116, 4, 5, 97, 104, 108, 114, 116, 11895, 11913, 11935, 11947, 11996, 114, 114, 111, 119, 4, 2, 59, 116, 11905, 11907, 1, 8592, 97, 105, 108, 59, 1, 8610, 97, 114, 112, 111, 111, 110, 4, 2, 100, 117, 11925, 11931, 111, 119, 110, 59, 1, 8637, 112, 59, 1, 8636, 101, 102, 116, 97, 114, 114, 111, 119, 115, 59, 1, 8647, 105, 103, 104, 116, 4, 3, 97, 104, 115, 11959, 11974, 11984, 114, 114, 111, 119, 4, 2, 59, 115, 11969, 11971, 1, 8596, 59, 1, 8646, 97, 114, 112, 111, 111, 110, 115, 59, 1, 8651, 113, 117, 105, 103, 97, 114, 114, 111, 119, 59, 1, 8621, 104, 114, 101, 101, 116, 105, 109, 101, 115, 59, 1, 8907, 59, 1, 8922, 4, 3, 59, 113, 115, 12019, 12021, 12024, 1, 8804, 59, 1, 8806, 108, 97, 110, 116, 59, 1, 10877, 4, 5, 59, 99, 100, 103, 115, 12043, 12045, 12049, 12070, 12083, 1, 10877, 99, 59, 1, 10920, 111, 116, 4, 2, 59, 111, 12057, 12059, 1, 10879, 4, 2, 59, 114, 12065, 12067, 1, 10881, 59, 1, 10883, 4, 2, 59, 101, 12076, 12079, 3, 8922, 65024, 115, 59, 1, 10899, 4, 5, 97, 100, 101, 103, 115, 12095, 12103, 12108, 12126, 12131, 112, 112, 114, 111, 120, 59, 1, 10885, 111, 116, 59, 1, 8918, 113, 4, 2, 103, 113, 12115, 12120, 116, 114, 59, 1, 8922, 103, 116, 114, 59, 1, 10891, 116, 114, 59, 1, 8822, 105, 109, 59, 1, 8818, 4, 3, 105, 108, 114, 12144, 12150, 12156, 115, 104, 116, 59, 1, 10620, 111, 111, 114, 59, 1, 8970, 59, 3, 55349, 56617, 4, 2, 59, 69, 12166, 12168, 1, 8822, 59, 1, 10897, 4, 2, 97, 98, 12177, 12198, 114, 4, 2, 100, 117, 12184, 12187, 59, 1, 8637, 4, 2, 59, 108, 12193, 12195, 1, 8636, 59, 1, 10602, 108, 107, 59, 1, 9604, 99, 121, 59, 1, 1113, 4, 5, 59, 97, 99, 104, 116, 12220, 12222, 12227, 12235, 12241, 1, 8810, 114, 114, 59, 1, 8647, 111, 114, 110, 101, 114, 59, 1, 8990, 97, 114, 100, 59, 1, 10603, 114, 105, 59, 1, 9722, 4, 2, 105, 111, 12252, 12258, 100, 111, 116, 59, 1, 320, 117, 115, 116, 4, 2, 59, 97, 12267, 12269, 1, 9136, 99, 104, 101, 59, 1, 9136, 4, 4, 69, 97, 101, 115, 12285, 12288, 12303, 12322, 59, 1, 8808, 112, 4, 2, 59, 112, 12295, 12297, 1, 10889, 114, 111, 120, 59, 1, 10889, 4, 2, 59, 113, 12309, 12311, 1, 10887, 4, 2, 59, 113, 12317, 12319, 1, 10887, 59, 1, 8808, 105, 109, 59, 1, 8934, 4, 8, 97, 98, 110, 111, 112, 116, 119, 122, 12345, 12359, 12364, 12421, 12446, 12467, 12474, 12490, 4, 2, 110, 114, 12351, 12355, 103, 59, 1, 10220, 114, 59, 1, 8701, 114, 107, 59, 1, 10214, 103, 4, 3, 108, 109, 114, 12373, 12401, 12409, 101, 102, 116, 4, 2, 97, 114, 12382, 12389, 114, 114, 111, 119, 59, 1, 10229, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 10231, 97, 112, 115, 116, 111, 59, 1, 10236, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 10230, 112, 97, 114, 114, 111, 119, 4, 2, 108, 114, 12433, 12439, 101, 102, 116, 59, 1, 8619, 105, 103, 104, 116, 59, 1, 8620, 4, 3, 97, 102, 108, 12454, 12458, 12462, 114, 59, 1, 10629, 59, 3, 55349, 56669, 117, 115, 59, 1, 10797, 105, 109, 101, 115, 59, 1, 10804, 4, 2, 97, 98, 12480, 12485, 115, 116, 59, 1, 8727, 97, 114, 59, 1, 95, 4, 3, 59, 101, 102, 12498, 12500, 12506, 1, 9674, 110, 103, 101, 59, 1, 9674, 59, 1, 10731, 97, 114, 4, 2, 59, 108, 12517, 12519, 1, 40, 116, 59, 1, 10643, 4, 5, 97, 99, 104, 109, 116, 12535, 12540, 12548, 12561, 12564, 114, 114, 59, 1, 8646, 111, 114, 110, 101, 114, 59, 1, 8991, 97, 114, 4, 2, 59, 100, 12556, 12558, 1, 8651, 59, 1, 10605, 59, 1, 8206, 114, 105, 59, 1, 8895, 4, 6, 97, 99, 104, 105, 113, 116, 12583, 12589, 12594, 12597, 12614, 12635, 113, 117, 111, 59, 1, 8249, 114, 59, 3, 55349, 56513, 59, 1, 8624, 109, 4, 3, 59, 101, 103, 12606, 12608, 12611, 1, 8818, 59, 1, 10893, 59, 1, 10895, 4, 2, 98, 117, 12620, 12623, 59, 1, 91, 111, 4, 2, 59, 114, 12630, 12632, 1, 8216, 59, 1, 8218, 114, 111, 107, 59, 1, 322, 5, 60, 8, 59, 99, 100, 104, 105, 108, 113, 114, 12660, 12662, 12675, 12680, 12686, 12692, 12698, 12705, 1, 60, 4, 2, 99, 105, 12668, 12671, 59, 1, 10918, 114, 59, 1, 10873, 111, 116, 59, 1, 8918, 114, 101, 101, 59, 1, 8907, 109, 101, 115, 59, 1, 8905, 97, 114, 114, 59, 1, 10614, 117, 101, 115, 116, 59, 1, 10875, 4, 2, 80, 105, 12711, 12716, 97, 114, 59, 1, 10646, 4, 3, 59, 101, 102, 12724, 12726, 12729, 1, 9667, 59, 1, 8884, 59, 1, 9666, 114, 4, 2, 100, 117, 12739, 12746, 115, 104, 97, 114, 59, 1, 10570, 104, 97, 114, 59, 1, 10598, 4, 2, 101, 110, 12758, 12768, 114, 116, 110, 101, 113, 113, 59, 3, 8808, 65024, 69, 59, 3, 8808, 65024, 4, 14, 68, 97, 99, 100, 101, 102, 104, 105, 108, 110, 111, 112, 115, 117, 12803, 12809, 12893, 12908, 12914, 12928, 12933, 12937, 13011, 13025, 13032, 13049, 13052, 13069, 68, 111, 116, 59, 1, 8762, 4, 4, 99, 108, 112, 114, 12819, 12827, 12849, 12887, 114, 5, 175, 1, 59, 12825, 1, 175, 4, 2, 101, 116, 12833, 12836, 59, 1, 9794, 4, 2, 59, 101, 12842, 12844, 1, 10016, 115, 101, 59, 1, 10016, 4, 2, 59, 115, 12855, 12857, 1, 8614, 116, 111, 4, 4, 59, 100, 108, 117, 12869, 12871, 12877, 12883, 1, 8614, 111, 119, 110, 59, 1, 8615, 101, 102, 116, 59, 1, 8612, 112, 59, 1, 8613, 107, 101, 114, 59, 1, 9646, 4, 2, 111, 121, 12899, 12905, 109, 109, 97, 59, 1, 10793, 59, 1, 1084, 97, 115, 104, 59, 1, 8212, 97, 115, 117, 114, 101, 100, 97, 110, 103, 108, 101, 59, 1, 8737, 114, 59, 3, 55349, 56618, 111, 59, 1, 8487, 4, 3, 99, 100, 110, 12945, 12954, 12985, 114, 111, 5, 181, 1, 59, 12952, 1, 181, 4, 4, 59, 97, 99, 100, 12964, 12966, 12971, 12976, 1, 8739, 115, 116, 59, 1, 42, 105, 114, 59, 1, 10992, 111, 116, 5, 183, 1, 59, 12983, 1, 183, 117, 115, 4, 3, 59, 98, 100, 12995, 12997, 13e3, 1, 8722, 59, 1, 8863, 4, 2, 59, 117, 13006, 13008, 1, 8760, 59, 1, 10794, 4, 2, 99, 100, 13017, 13021, 112, 59, 1, 10971, 114, 59, 1, 8230, 112, 108, 117, 115, 59, 1, 8723, 4, 2, 100, 112, 13038, 13044, 101, 108, 115, 59, 1, 8871, 102, 59, 3, 55349, 56670, 59, 1, 8723, 4, 2, 99, 116, 13058, 13063, 114, 59, 3, 55349, 56514, 112, 111, 115, 59, 1, 8766, 4, 3, 59, 108, 109, 13077, 13079, 13087, 1, 956, 116, 105, 109, 97, 112, 59, 1, 8888, 97, 112, 59, 1, 8888, 4, 24, 71, 76, 82, 86, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 108, 109, 111, 112, 114, 115, 116, 117, 118, 119, 13142, 13165, 13217, 13229, 13247, 13330, 13359, 13414, 13420, 13508, 13513, 13579, 13602, 13626, 13631, 13762, 13767, 13855, 13936, 13995, 14214, 14285, 14312, 14432, 4, 2, 103, 116, 13148, 13152, 59, 3, 8921, 824, 4, 2, 59, 118, 13158, 13161, 3, 8811, 8402, 59, 3, 8811, 824, 4, 3, 101, 108, 116, 13173, 13200, 13204, 102, 116, 4, 2, 97, 114, 13181, 13188, 114, 114, 111, 119, 59, 1, 8653, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8654, 59, 3, 8920, 824, 4, 2, 59, 118, 13210, 13213, 3, 8810, 8402, 59, 3, 8810, 824, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8655, 4, 2, 68, 100, 13235, 13241, 97, 115, 104, 59, 1, 8879, 97, 115, 104, 59, 1, 8878, 4, 5, 98, 99, 110, 112, 116, 13259, 13264, 13270, 13275, 13308, 108, 97, 59, 1, 8711, 117, 116, 101, 59, 1, 324, 103, 59, 3, 8736, 8402, 4, 5, 59, 69, 105, 111, 112, 13287, 13289, 13293, 13298, 13302, 1, 8777, 59, 3, 10864, 824, 100, 59, 3, 8779, 824, 115, 59, 1, 329, 114, 111, 120, 59, 1, 8777, 117, 114, 4, 2, 59, 97, 13316, 13318, 1, 9838, 108, 4, 2, 59, 115, 13325, 13327, 1, 9838, 59, 1, 8469, 4, 2, 115, 117, 13336, 13344, 112, 5, 160, 1, 59, 13342, 1, 160, 109, 112, 4, 2, 59, 101, 13352, 13355, 3, 8782, 824, 59, 3, 8783, 824, 4, 5, 97, 101, 111, 117, 121, 13371, 13385, 13391, 13407, 13411, 4, 2, 112, 114, 13377, 13380, 59, 1, 10819, 111, 110, 59, 1, 328, 100, 105, 108, 59, 1, 326, 110, 103, 4, 2, 59, 100, 13399, 13401, 1, 8775, 111, 116, 59, 3, 10861, 824, 112, 59, 1, 10818, 59, 1, 1085, 97, 115, 104, 59, 1, 8211, 4, 7, 59, 65, 97, 100, 113, 115, 120, 13436, 13438, 13443, 13466, 13472, 13478, 13494, 1, 8800, 114, 114, 59, 1, 8663, 114, 4, 2, 104, 114, 13450, 13454, 107, 59, 1, 10532, 4, 2, 59, 111, 13460, 13462, 1, 8599, 119, 59, 1, 8599, 111, 116, 59, 3, 8784, 824, 117, 105, 118, 59, 1, 8802, 4, 2, 101, 105, 13484, 13489, 97, 114, 59, 1, 10536, 109, 59, 3, 8770, 824, 105, 115, 116, 4, 2, 59, 115, 13503, 13505, 1, 8708, 59, 1, 8708, 114, 59, 3, 55349, 56619, 4, 4, 69, 101, 115, 116, 13523, 13527, 13563, 13568, 59, 3, 8807, 824, 4, 3, 59, 113, 115, 13535, 13537, 13559, 1, 8817, 4, 3, 59, 113, 115, 13545, 13547, 13551, 1, 8817, 59, 3, 8807, 824, 108, 97, 110, 116, 59, 3, 10878, 824, 59, 3, 10878, 824, 105, 109, 59, 1, 8821, 4, 2, 59, 114, 13574, 13576, 1, 8815, 59, 1, 8815, 4, 3, 65, 97, 112, 13587, 13592, 13597, 114, 114, 59, 1, 8654, 114, 114, 59, 1, 8622, 97, 114, 59, 1, 10994, 4, 3, 59, 115, 118, 13610, 13612, 13623, 1, 8715, 4, 2, 59, 100, 13618, 13620, 1, 8956, 59, 1, 8954, 59, 1, 8715, 99, 121, 59, 1, 1114, 4, 7, 65, 69, 97, 100, 101, 115, 116, 13647, 13652, 13656, 13661, 13665, 13737, 13742, 114, 114, 59, 1, 8653, 59, 3, 8806, 824, 114, 114, 59, 1, 8602, 114, 59, 1, 8229, 4, 4, 59, 102, 113, 115, 13675, 13677, 13703, 13725, 1, 8816, 116, 4, 2, 97, 114, 13684, 13691, 114, 114, 111, 119, 59, 1, 8602, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8622, 4, 3, 59, 113, 115, 13711, 13713, 13717, 1, 8816, 59, 3, 8806, 824, 108, 97, 110, 116, 59, 3, 10877, 824, 4, 2, 59, 115, 13731, 13734, 3, 10877, 824, 59, 1, 8814, 105, 109, 59, 1, 8820, 4, 2, 59, 114, 13748, 13750, 1, 8814, 105, 4, 2, 59, 101, 13757, 13759, 1, 8938, 59, 1, 8940, 105, 100, 59, 1, 8740, 4, 2, 112, 116, 13773, 13778, 102, 59, 3, 55349, 56671, 5, 172, 3, 59, 105, 110, 13787, 13789, 13829, 1, 172, 110, 4, 4, 59, 69, 100, 118, 13800, 13802, 13806, 13812, 1, 8713, 59, 3, 8953, 824, 111, 116, 59, 3, 8949, 824, 4, 3, 97, 98, 99, 13820, 13823, 13826, 59, 1, 8713, 59, 1, 8951, 59, 1, 8950, 105, 4, 2, 59, 118, 13836, 13838, 1, 8716, 4, 3, 97, 98, 99, 13846, 13849, 13852, 59, 1, 8716, 59, 1, 8958, 59, 1, 8957, 4, 3, 97, 111, 114, 13863, 13892, 13899, 114, 4, 4, 59, 97, 115, 116, 13874, 13876, 13883, 13888, 1, 8742, 108, 108, 101, 108, 59, 1, 8742, 108, 59, 3, 11005, 8421, 59, 3, 8706, 824, 108, 105, 110, 116, 59, 1, 10772, 4, 3, 59, 99, 101, 13907, 13909, 13914, 1, 8832, 117, 101, 59, 1, 8928, 4, 2, 59, 99, 13920, 13923, 3, 10927, 824, 4, 2, 59, 101, 13929, 13931, 1, 8832, 113, 59, 3, 10927, 824, 4, 4, 65, 97, 105, 116, 13946, 13951, 13971, 13982, 114, 114, 59, 1, 8655, 114, 114, 4, 3, 59, 99, 119, 13961, 13963, 13967, 1, 8603, 59, 3, 10547, 824, 59, 3, 8605, 824, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8603, 114, 105, 4, 2, 59, 101, 13990, 13992, 1, 8939, 59, 1, 8941, 4, 7, 99, 104, 105, 109, 112, 113, 117, 14011, 14036, 14060, 14080, 14085, 14090, 14106, 4, 4, 59, 99, 101, 114, 14021, 14023, 14028, 14032, 1, 8833, 117, 101, 59, 1, 8929, 59, 3, 10928, 824, 59, 3, 55349, 56515, 111, 114, 116, 4, 2, 109, 112, 14045, 14050, 105, 100, 59, 1, 8740, 97, 114, 97, 108, 108, 101, 108, 59, 1, 8742, 109, 4, 2, 59, 101, 14067, 14069, 1, 8769, 4, 2, 59, 113, 14075, 14077, 1, 8772, 59, 1, 8772, 105, 100, 59, 1, 8740, 97, 114, 59, 1, 8742, 115, 117, 4, 2, 98, 112, 14098, 14102, 101, 59, 1, 8930, 101, 59, 1, 8931, 4, 3, 98, 99, 112, 14114, 14157, 14171, 4, 4, 59, 69, 101, 115, 14124, 14126, 14130, 14133, 1, 8836, 59, 3, 10949, 824, 59, 1, 8840, 101, 116, 4, 2, 59, 101, 14141, 14144, 3, 8834, 8402, 113, 4, 2, 59, 113, 14151, 14153, 1, 8840, 59, 3, 10949, 824, 99, 4, 2, 59, 101, 14164, 14166, 1, 8833, 113, 59, 3, 10928, 824, 4, 4, 59, 69, 101, 115, 14181, 14183, 14187, 14190, 1, 8837, 59, 3, 10950, 824, 59, 1, 8841, 101, 116, 4, 2, 59, 101, 14198, 14201, 3, 8835, 8402, 113, 4, 2, 59, 113, 14208, 14210, 1, 8841, 59, 3, 10950, 824, 4, 4, 103, 105, 108, 114, 14224, 14228, 14238, 14242, 108, 59, 1, 8825, 108, 100, 101, 5, 241, 1, 59, 14236, 1, 241, 103, 59, 1, 8824, 105, 97, 110, 103, 108, 101, 4, 2, 108, 114, 14254, 14269, 101, 102, 116, 4, 2, 59, 101, 14263, 14265, 1, 8938, 113, 59, 1, 8940, 105, 103, 104, 116, 4, 2, 59, 101, 14279, 14281, 1, 8939, 113, 59, 1, 8941, 4, 2, 59, 109, 14291, 14293, 1, 957, 4, 3, 59, 101, 115, 14301, 14303, 14308, 1, 35, 114, 111, 59, 1, 8470, 112, 59, 1, 8199, 4, 9, 68, 72, 97, 100, 103, 105, 108, 114, 115, 14332, 14338, 14344, 14349, 14355, 14369, 14376, 14408, 14426, 97, 115, 104, 59, 1, 8877, 97, 114, 114, 59, 1, 10500, 112, 59, 3, 8781, 8402, 97, 115, 104, 59, 1, 8876, 4, 2, 101, 116, 14361, 14365, 59, 3, 8805, 8402, 59, 3, 62, 8402, 110, 102, 105, 110, 59, 1, 10718, 4, 3, 65, 101, 116, 14384, 14389, 14393, 114, 114, 59, 1, 10498, 59, 3, 8804, 8402, 4, 2, 59, 114, 14399, 14402, 3, 60, 8402, 105, 101, 59, 3, 8884, 8402, 4, 2, 65, 116, 14414, 14419, 114, 114, 59, 1, 10499, 114, 105, 101, 59, 3, 8885, 8402, 105, 109, 59, 3, 8764, 8402, 4, 3, 65, 97, 110, 14440, 14445, 14468, 114, 114, 59, 1, 8662, 114, 4, 2, 104, 114, 14452, 14456, 107, 59, 1, 10531, 4, 2, 59, 111, 14462, 14464, 1, 8598, 119, 59, 1, 8598, 101, 97, 114, 59, 1, 10535, 4, 18, 83, 97, 99, 100, 101, 102, 103, 104, 105, 108, 109, 111, 112, 114, 115, 116, 117, 118, 14512, 14515, 14535, 14560, 14597, 14603, 14618, 14643, 14657, 14662, 14701, 14741, 14747, 14769, 14851, 14877, 14907, 14916, 59, 1, 9416, 4, 2, 99, 115, 14521, 14531, 117, 116, 101, 5, 243, 1, 59, 14529, 1, 243, 116, 59, 1, 8859, 4, 2, 105, 121, 14541, 14557, 114, 4, 2, 59, 99, 14548, 14550, 1, 8858, 5, 244, 1, 59, 14555, 1, 244, 59, 1, 1086, 4, 5, 97, 98, 105, 111, 115, 14572, 14577, 14583, 14587, 14591, 115, 104, 59, 1, 8861, 108, 97, 99, 59, 1, 337, 118, 59, 1, 10808, 116, 59, 1, 8857, 111, 108, 100, 59, 1, 10684, 108, 105, 103, 59, 1, 339, 4, 2, 99, 114, 14609, 14614, 105, 114, 59, 1, 10687, 59, 3, 55349, 56620, 4, 3, 111, 114, 116, 14626, 14630, 14640, 110, 59, 1, 731, 97, 118, 101, 5, 242, 1, 59, 14638, 1, 242, 59, 1, 10689, 4, 2, 98, 109, 14649, 14654, 97, 114, 59, 1, 10677, 59, 1, 937, 110, 116, 59, 1, 8750, 4, 4, 97, 99, 105, 116, 14672, 14677, 14693, 14698, 114, 114, 59, 1, 8634, 4, 2, 105, 114, 14683, 14687, 114, 59, 1, 10686, 111, 115, 115, 59, 1, 10683, 110, 101, 59, 1, 8254, 59, 1, 10688, 4, 3, 97, 101, 105, 14709, 14714, 14719, 99, 114, 59, 1, 333, 103, 97, 59, 1, 969, 4, 3, 99, 100, 110, 14727, 14733, 14736, 114, 111, 110, 59, 1, 959, 59, 1, 10678, 117, 115, 59, 1, 8854, 112, 102, 59, 3, 55349, 56672, 4, 3, 97, 101, 108, 14755, 14759, 14764, 114, 59, 1, 10679, 114, 112, 59, 1, 10681, 117, 115, 59, 1, 8853, 4, 7, 59, 97, 100, 105, 111, 115, 118, 14785, 14787, 14792, 14831, 14837, 14841, 14848, 1, 8744, 114, 114, 59, 1, 8635, 4, 4, 59, 101, 102, 109, 14802, 14804, 14817, 14824, 1, 10845, 114, 4, 2, 59, 111, 14811, 14813, 1, 8500, 102, 59, 1, 8500, 5, 170, 1, 59, 14822, 1, 170, 5, 186, 1, 59, 14829, 1, 186, 103, 111, 102, 59, 1, 8886, 114, 59, 1, 10838, 108, 111, 112, 101, 59, 1, 10839, 59, 1, 10843, 4, 3, 99, 108, 111, 14859, 14863, 14873, 114, 59, 1, 8500, 97, 115, 104, 5, 248, 1, 59, 14871, 1, 248, 108, 59, 1, 8856, 105, 4, 2, 108, 109, 14884, 14893, 100, 101, 5, 245, 1, 59, 14891, 1, 245, 101, 115, 4, 2, 59, 97, 14901, 14903, 1, 8855, 115, 59, 1, 10806, 109, 108, 5, 246, 1, 59, 14914, 1, 246, 98, 97, 114, 59, 1, 9021, 4, 12, 97, 99, 101, 102, 104, 105, 108, 109, 111, 114, 115, 117, 14948, 14992, 14996, 15033, 15038, 15068, 15090, 15189, 15192, 15222, 15427, 15441, 114, 4, 4, 59, 97, 115, 116, 14959, 14961, 14976, 14989, 1, 8741, 5, 182, 2, 59, 108, 14968, 14970, 1, 182, 108, 101, 108, 59, 1, 8741, 4, 2, 105, 108, 14982, 14986, 109, 59, 1, 10995, 59, 1, 11005, 59, 1, 8706, 121, 59, 1, 1087, 114, 4, 5, 99, 105, 109, 112, 116, 15009, 15014, 15019, 15024, 15027, 110, 116, 59, 1, 37, 111, 100, 59, 1, 46, 105, 108, 59, 1, 8240, 59, 1, 8869, 101, 110, 107, 59, 1, 8241, 114, 59, 3, 55349, 56621, 4, 3, 105, 109, 111, 15046, 15057, 15063, 4, 2, 59, 118, 15052, 15054, 1, 966, 59, 1, 981, 109, 97, 116, 59, 1, 8499, 110, 101, 59, 1, 9742, 4, 3, 59, 116, 118, 15076, 15078, 15087, 1, 960, 99, 104, 102, 111, 114, 107, 59, 1, 8916, 59, 1, 982, 4, 2, 97, 117, 15096, 15119, 110, 4, 2, 99, 107, 15103, 15115, 107, 4, 2, 59, 104, 15110, 15112, 1, 8463, 59, 1, 8462, 118, 59, 1, 8463, 115, 4, 9, 59, 97, 98, 99, 100, 101, 109, 115, 116, 15140, 15142, 15148, 15151, 15156, 15168, 15171, 15179, 15184, 1, 43, 99, 105, 114, 59, 1, 10787, 59, 1, 8862, 105, 114, 59, 1, 10786, 4, 2, 111, 117, 15162, 15165, 59, 1, 8724, 59, 1, 10789, 59, 1, 10866, 110, 5, 177, 1, 59, 15177, 1, 177, 105, 109, 59, 1, 10790, 119, 111, 59, 1, 10791, 59, 1, 177, 4, 3, 105, 112, 117, 15200, 15208, 15213, 110, 116, 105, 110, 116, 59, 1, 10773, 102, 59, 3, 55349, 56673, 110, 100, 5, 163, 1, 59, 15220, 1, 163, 4, 10, 59, 69, 97, 99, 101, 105, 110, 111, 115, 117, 15244, 15246, 15249, 15253, 15258, 15334, 15347, 15367, 15416, 15421, 1, 8826, 59, 1, 10931, 112, 59, 1, 10935, 117, 101, 59, 1, 8828, 4, 2, 59, 99, 15264, 15266, 1, 10927, 4, 6, 59, 97, 99, 101, 110, 115, 15280, 15282, 15290, 15299, 15303, 15329, 1, 8826, 112, 112, 114, 111, 120, 59, 1, 10935, 117, 114, 108, 121, 101, 113, 59, 1, 8828, 113, 59, 1, 10927, 4, 3, 97, 101, 115, 15311, 15319, 15324, 112, 112, 114, 111, 120, 59, 1, 10937, 113, 113, 59, 1, 10933, 105, 109, 59, 1, 8936, 105, 109, 59, 1, 8830, 109, 101, 4, 2, 59, 115, 15342, 15344, 1, 8242, 59, 1, 8473, 4, 3, 69, 97, 115, 15355, 15358, 15362, 59, 1, 10933, 112, 59, 1, 10937, 105, 109, 59, 1, 8936, 4, 3, 100, 102, 112, 15375, 15378, 15404, 59, 1, 8719, 4, 3, 97, 108, 115, 15386, 15392, 15398, 108, 97, 114, 59, 1, 9006, 105, 110, 101, 59, 1, 8978, 117, 114, 102, 59, 1, 8979, 4, 2, 59, 116, 15410, 15412, 1, 8733, 111, 59, 1, 8733, 105, 109, 59, 1, 8830, 114, 101, 108, 59, 1, 8880, 4, 2, 99, 105, 15433, 15438, 114, 59, 3, 55349, 56517, 59, 1, 968, 110, 99, 115, 112, 59, 1, 8200, 4, 6, 102, 105, 111, 112, 115, 117, 15462, 15467, 15472, 15478, 15485, 15491, 114, 59, 3, 55349, 56622, 110, 116, 59, 1, 10764, 112, 102, 59, 3, 55349, 56674, 114, 105, 109, 101, 59, 1, 8279, 99, 114, 59, 3, 55349, 56518, 4, 3, 97, 101, 111, 15499, 15520, 15534, 116, 4, 2, 101, 105, 15506, 15515, 114, 110, 105, 111, 110, 115, 59, 1, 8461, 110, 116, 59, 1, 10774, 115, 116, 4, 2, 59, 101, 15528, 15530, 1, 63, 113, 59, 1, 8799, 116, 5, 34, 1, 59, 15540, 1, 34, 4, 21, 65, 66, 72, 97, 98, 99, 100, 101, 102, 104, 105, 108, 109, 110, 111, 112, 114, 115, 116, 117, 120, 15586, 15609, 15615, 15620, 15796, 15855, 15893, 15931, 15977, 16001, 16039, 16183, 16204, 16222, 16228, 16285, 16312, 16318, 16363, 16408, 16416, 4, 3, 97, 114, 116, 15594, 15599, 15603, 114, 114, 59, 1, 8667, 114, 59, 1, 8658, 97, 105, 108, 59, 1, 10524, 97, 114, 114, 59, 1, 10511, 97, 114, 59, 1, 10596, 4, 7, 99, 100, 101, 110, 113, 114, 116, 15636, 15651, 15656, 15664, 15687, 15696, 15770, 4, 2, 101, 117, 15642, 15646, 59, 3, 8765, 817, 116, 101, 59, 1, 341, 105, 99, 59, 1, 8730, 109, 112, 116, 121, 118, 59, 1, 10675, 103, 4, 4, 59, 100, 101, 108, 15675, 15677, 15680, 15683, 1, 10217, 59, 1, 10642, 59, 1, 10661, 101, 59, 1, 10217, 117, 111, 5, 187, 1, 59, 15694, 1, 187, 114, 4, 11, 59, 97, 98, 99, 102, 104, 108, 112, 115, 116, 119, 15721, 15723, 15727, 15739, 15742, 15746, 15750, 15754, 15758, 15763, 15767, 1, 8594, 112, 59, 1, 10613, 4, 2, 59, 102, 15733, 15735, 1, 8677, 115, 59, 1, 10528, 59, 1, 10547, 115, 59, 1, 10526, 107, 59, 1, 8618, 112, 59, 1, 8620, 108, 59, 1, 10565, 105, 109, 59, 1, 10612, 108, 59, 1, 8611, 59, 1, 8605, 4, 2, 97, 105, 15776, 15781, 105, 108, 59, 1, 10522, 111, 4, 2, 59, 110, 15788, 15790, 1, 8758, 97, 108, 115, 59, 1, 8474, 4, 3, 97, 98, 114, 15804, 15809, 15814, 114, 114, 59, 1, 10509, 114, 107, 59, 1, 10099, 4, 2, 97, 107, 15820, 15833, 99, 4, 2, 101, 107, 15827, 15830, 59, 1, 125, 59, 1, 93, 4, 2, 101, 115, 15839, 15842, 59, 1, 10636, 108, 4, 2, 100, 117, 15849, 15852, 59, 1, 10638, 59, 1, 10640, 4, 4, 97, 101, 117, 121, 15865, 15871, 15886, 15890, 114, 111, 110, 59, 1, 345, 4, 2, 100, 105, 15877, 15882, 105, 108, 59, 1, 343, 108, 59, 1, 8969, 98, 59, 1, 125, 59, 1, 1088, 4, 4, 99, 108, 113, 115, 15903, 15907, 15914, 15927, 97, 59, 1, 10551, 100, 104, 97, 114, 59, 1, 10601, 117, 111, 4, 2, 59, 114, 15922, 15924, 1, 8221, 59, 1, 8221, 104, 59, 1, 8627, 4, 3, 97, 99, 103, 15939, 15966, 15970, 108, 4, 4, 59, 105, 112, 115, 15950, 15952, 15957, 15963, 1, 8476, 110, 101, 59, 1, 8475, 97, 114, 116, 59, 1, 8476, 59, 1, 8477, 116, 59, 1, 9645, 5, 174, 1, 59, 15975, 1, 174, 4, 3, 105, 108, 114, 15985, 15991, 15997, 115, 104, 116, 59, 1, 10621, 111, 111, 114, 59, 1, 8971, 59, 3, 55349, 56623, 4, 2, 97, 111, 16007, 16028, 114, 4, 2, 100, 117, 16014, 16017, 59, 1, 8641, 4, 2, 59, 108, 16023, 16025, 1, 8640, 59, 1, 10604, 4, 2, 59, 118, 16034, 16036, 1, 961, 59, 1, 1009, 4, 3, 103, 110, 115, 16047, 16167, 16171, 104, 116, 4, 6, 97, 104, 108, 114, 115, 116, 16063, 16081, 16103, 16130, 16143, 16155, 114, 114, 111, 119, 4, 2, 59, 116, 16073, 16075, 1, 8594, 97, 105, 108, 59, 1, 8611, 97, 114, 112, 111, 111, 110, 4, 2, 100, 117, 16093, 16099, 111, 119, 110, 59, 1, 8641, 112, 59, 1, 8640, 101, 102, 116, 4, 2, 97, 104, 16112, 16120, 114, 114, 111, 119, 115, 59, 1, 8644, 97, 114, 112, 111, 111, 110, 115, 59, 1, 8652, 105, 103, 104, 116, 97, 114, 114, 111, 119, 115, 59, 1, 8649, 113, 117, 105, 103, 97, 114, 114, 111, 119, 59, 1, 8605, 104, 114, 101, 101, 116, 105, 109, 101, 115, 59, 1, 8908, 103, 59, 1, 730, 105, 110, 103, 100, 111, 116, 115, 101, 113, 59, 1, 8787, 4, 3, 97, 104, 109, 16191, 16196, 16201, 114, 114, 59, 1, 8644, 97, 114, 59, 1, 8652, 59, 1, 8207, 111, 117, 115, 116, 4, 2, 59, 97, 16214, 16216, 1, 9137, 99, 104, 101, 59, 1, 9137, 109, 105, 100, 59, 1, 10990, 4, 4, 97, 98, 112, 116, 16238, 16252, 16257, 16278, 4, 2, 110, 114, 16244, 16248, 103, 59, 1, 10221, 114, 59, 1, 8702, 114, 107, 59, 1, 10215, 4, 3, 97, 102, 108, 16265, 16269, 16273, 114, 59, 1, 10630, 59, 3, 55349, 56675, 117, 115, 59, 1, 10798, 105, 109, 101, 115, 59, 1, 10805, 4, 2, 97, 112, 16291, 16304, 114, 4, 2, 59, 103, 16298, 16300, 1, 41, 116, 59, 1, 10644, 111, 108, 105, 110, 116, 59, 1, 10770, 97, 114, 114, 59, 1, 8649, 4, 4, 97, 99, 104, 113, 16328, 16334, 16339, 16342, 113, 117, 111, 59, 1, 8250, 114, 59, 3, 55349, 56519, 59, 1, 8625, 4, 2, 98, 117, 16348, 16351, 59, 1, 93, 111, 4, 2, 59, 114, 16358, 16360, 1, 8217, 59, 1, 8217, 4, 3, 104, 105, 114, 16371, 16377, 16383, 114, 101, 101, 59, 1, 8908, 109, 101, 115, 59, 1, 8906, 105, 4, 4, 59, 101, 102, 108, 16394, 16396, 16399, 16402, 1, 9657, 59, 1, 8885, 59, 1, 9656, 116, 114, 105, 59, 1, 10702, 108, 117, 104, 97, 114, 59, 1, 10600, 59, 1, 8478, 4, 19, 97, 98, 99, 100, 101, 102, 104, 105, 108, 109, 111, 112, 113, 114, 115, 116, 117, 119, 122, 16459, 16466, 16472, 16572, 16590, 16672, 16687, 16746, 16844, 16850, 16924, 16963, 16988, 17115, 17121, 17154, 17206, 17614, 17656, 99, 117, 116, 101, 59, 1, 347, 113, 117, 111, 59, 1, 8218, 4, 10, 59, 69, 97, 99, 101, 105, 110, 112, 115, 121, 16494, 16496, 16499, 16513, 16518, 16531, 16536, 16556, 16564, 16569, 1, 8827, 59, 1, 10932, 4, 2, 112, 114, 16505, 16508, 59, 1, 10936, 111, 110, 59, 1, 353, 117, 101, 59, 1, 8829, 4, 2, 59, 100, 16524, 16526, 1, 10928, 105, 108, 59, 1, 351, 114, 99, 59, 1, 349, 4, 3, 69, 97, 115, 16544, 16547, 16551, 59, 1, 10934, 112, 59, 1, 10938, 105, 109, 59, 1, 8937, 111, 108, 105, 110, 116, 59, 1, 10771, 105, 109, 59, 1, 8831, 59, 1, 1089, 111, 116, 4, 3, 59, 98, 101, 16582, 16584, 16587, 1, 8901, 59, 1, 8865, 59, 1, 10854, 4, 7, 65, 97, 99, 109, 115, 116, 120, 16606, 16611, 16634, 16642, 16646, 16652, 16668, 114, 114, 59, 1, 8664, 114, 4, 2, 104, 114, 16618, 16622, 107, 59, 1, 10533, 4, 2, 59, 111, 16628, 16630, 1, 8600, 119, 59, 1, 8600, 116, 5, 167, 1, 59, 16640, 1, 167, 105, 59, 1, 59, 119, 97, 114, 59, 1, 10537, 109, 4, 2, 105, 110, 16659, 16665, 110, 117, 115, 59, 1, 8726, 59, 1, 8726, 116, 59, 1, 10038, 114, 4, 2, 59, 111, 16679, 16682, 3, 55349, 56624, 119, 110, 59, 1, 8994, 4, 4, 97, 99, 111, 121, 16697, 16702, 16716, 16739, 114, 112, 59, 1, 9839, 4, 2, 104, 121, 16708, 16713, 99, 121, 59, 1, 1097, 59, 1, 1096, 114, 116, 4, 2, 109, 112, 16724, 16729, 105, 100, 59, 1, 8739, 97, 114, 97, 108, 108, 101, 108, 59, 1, 8741, 5, 173, 1, 59, 16744, 1, 173, 4, 2, 103, 109, 16752, 16770, 109, 97, 4, 3, 59, 102, 118, 16762, 16764, 16767, 1, 963, 59, 1, 962, 59, 1, 962, 4, 8, 59, 100, 101, 103, 108, 110, 112, 114, 16788, 16790, 16795, 16806, 16817, 16828, 16832, 16838, 1, 8764, 111, 116, 59, 1, 10858, 4, 2, 59, 113, 16801, 16803, 1, 8771, 59, 1, 8771, 4, 2, 59, 69, 16812, 16814, 1, 10910, 59, 1, 10912, 4, 2, 59, 69, 16823, 16825, 1, 10909, 59, 1, 10911, 101, 59, 1, 8774, 108, 117, 115, 59, 1, 10788, 97, 114, 114, 59, 1, 10610, 97, 114, 114, 59, 1, 8592, 4, 4, 97, 101, 105, 116, 16860, 16883, 16891, 16904, 4, 2, 108, 115, 16866, 16878, 108, 115, 101, 116, 109, 105, 110, 117, 115, 59, 1, 8726, 104, 112, 59, 1, 10803, 112, 97, 114, 115, 108, 59, 1, 10724, 4, 2, 100, 108, 16897, 16900, 59, 1, 8739, 101, 59, 1, 8995, 4, 2, 59, 101, 16910, 16912, 1, 10922, 4, 2, 59, 115, 16918, 16920, 1, 10924, 59, 3, 10924, 65024, 4, 3, 102, 108, 112, 16932, 16938, 16958, 116, 99, 121, 59, 1, 1100, 4, 2, 59, 98, 16944, 16946, 1, 47, 4, 2, 59, 97, 16952, 16954, 1, 10692, 114, 59, 1, 9023, 102, 59, 3, 55349, 56676, 97, 4, 2, 100, 114, 16970, 16985, 101, 115, 4, 2, 59, 117, 16978, 16980, 1, 9824, 105, 116, 59, 1, 9824, 59, 1, 8741, 4, 3, 99, 115, 117, 16996, 17028, 17089, 4, 2, 97, 117, 17002, 17015, 112, 4, 2, 59, 115, 17009, 17011, 1, 8851, 59, 3, 8851, 65024, 112, 4, 2, 59, 115, 17022, 17024, 1, 8852, 59, 3, 8852, 65024, 117, 4, 2, 98, 112, 17035, 17062, 4, 3, 59, 101, 115, 17043, 17045, 17048, 1, 8847, 59, 1, 8849, 101, 116, 4, 2, 59, 101, 17056, 17058, 1, 8847, 113, 59, 1, 8849, 4, 3, 59, 101, 115, 17070, 17072, 17075, 1, 8848, 59, 1, 8850, 101, 116, 4, 2, 59, 101, 17083, 17085, 1, 8848, 113, 59, 1, 8850, 4, 3, 59, 97, 102, 17097, 17099, 17112, 1, 9633, 114, 4, 2, 101, 102, 17106, 17109, 59, 1, 9633, 59, 1, 9642, 59, 1, 9642, 97, 114, 114, 59, 1, 8594, 4, 4, 99, 101, 109, 116, 17131, 17136, 17142, 17148, 114, 59, 3, 55349, 56520, 116, 109, 110, 59, 1, 8726, 105, 108, 101, 59, 1, 8995, 97, 114, 102, 59, 1, 8902, 4, 2, 97, 114, 17160, 17172, 114, 4, 2, 59, 102, 17167, 17169, 1, 9734, 59, 1, 9733, 4, 2, 97, 110, 17178, 17202, 105, 103, 104, 116, 4, 2, 101, 112, 17188, 17197, 112, 115, 105, 108, 111, 110, 59, 1, 1013, 104, 105, 59, 1, 981, 115, 59, 1, 175, 4, 5, 98, 99, 109, 110, 112, 17218, 17351, 17420, 17423, 17427, 4, 9, 59, 69, 100, 101, 109, 110, 112, 114, 115, 17238, 17240, 17243, 17248, 17261, 17267, 17279, 17285, 17291, 1, 8834, 59, 1, 10949, 111, 116, 59, 1, 10941, 4, 2, 59, 100, 17254, 17256, 1, 8838, 111, 116, 59, 1, 10947, 117, 108, 116, 59, 1, 10945, 4, 2, 69, 101, 17273, 17276, 59, 1, 10955, 59, 1, 8842, 108, 117, 115, 59, 1, 10943, 97, 114, 114, 59, 1, 10617, 4, 3, 101, 105, 117, 17299, 17335, 17339, 116, 4, 3, 59, 101, 110, 17308, 17310, 17322, 1, 8834, 113, 4, 2, 59, 113, 17317, 17319, 1, 8838, 59, 1, 10949, 101, 113, 4, 2, 59, 113, 17330, 17332, 1, 8842, 59, 1, 10955, 109, 59, 1, 10951, 4, 2, 98, 112, 17345, 17348, 59, 1, 10965, 59, 1, 10963, 99, 4, 6, 59, 97, 99, 101, 110, 115, 17366, 17368, 17376, 17385, 17389, 17415, 1, 8827, 112, 112, 114, 111, 120, 59, 1, 10936, 117, 114, 108, 121, 101, 113, 59, 1, 8829, 113, 59, 1, 10928, 4, 3, 97, 101, 115, 17397, 17405, 17410, 112, 112, 114, 111, 120, 59, 1, 10938, 113, 113, 59, 1, 10934, 105, 109, 59, 1, 8937, 105, 109, 59, 1, 8831, 59, 1, 8721, 103, 59, 1, 9834, 4, 13, 49, 50, 51, 59, 69, 100, 101, 104, 108, 109, 110, 112, 115, 17455, 17462, 17469, 17476, 17478, 17481, 17496, 17509, 17524, 17530, 17536, 17548, 17554, 5, 185, 1, 59, 17460, 1, 185, 5, 178, 1, 59, 17467, 1, 178, 5, 179, 1, 59, 17474, 1, 179, 1, 8835, 59, 1, 10950, 4, 2, 111, 115, 17487, 17491, 116, 59, 1, 10942, 117, 98, 59, 1, 10968, 4, 2, 59, 100, 17502, 17504, 1, 8839, 111, 116, 59, 1, 10948, 115, 4, 2, 111, 117, 17516, 17520, 108, 59, 1, 10185, 98, 59, 1, 10967, 97, 114, 114, 59, 1, 10619, 117, 108, 116, 59, 1, 10946, 4, 2, 69, 101, 17542, 17545, 59, 1, 10956, 59, 1, 8843, 108, 117, 115, 59, 1, 10944, 4, 3, 101, 105, 117, 17562, 17598, 17602, 116, 4, 3, 59, 101, 110, 17571, 17573, 17585, 1, 8835, 113, 4, 2, 59, 113, 17580, 17582, 1, 8839, 59, 1, 10950, 101, 113, 4, 2, 59, 113, 17593, 17595, 1, 8843, 59, 1, 10956, 109, 59, 1, 10952, 4, 2, 98, 112, 17608, 17611, 59, 1, 10964, 59, 1, 10966, 4, 3, 65, 97, 110, 17622, 17627, 17650, 114, 114, 59, 1, 8665, 114, 4, 2, 104, 114, 17634, 17638, 107, 59, 1, 10534, 4, 2, 59, 111, 17644, 17646, 1, 8601, 119, 59, 1, 8601, 119, 97, 114, 59, 1, 10538, 108, 105, 103, 5, 223, 1, 59, 17664, 1, 223, 4, 13, 97, 98, 99, 100, 101, 102, 104, 105, 111, 112, 114, 115, 119, 17694, 17709, 17714, 17737, 17742, 17749, 17754, 17860, 17905, 17957, 17964, 18090, 18122, 4, 2, 114, 117, 17700, 17706, 103, 101, 116, 59, 1, 8982, 59, 1, 964, 114, 107, 59, 1, 9140, 4, 3, 97, 101, 121, 17722, 17728, 17734, 114, 111, 110, 59, 1, 357, 100, 105, 108, 59, 1, 355, 59, 1, 1090, 111, 116, 59, 1, 8411, 108, 114, 101, 99, 59, 1, 8981, 114, 59, 3, 55349, 56625, 4, 4, 101, 105, 107, 111, 17764, 17805, 17836, 17851, 4, 2, 114, 116, 17770, 17786, 101, 4, 2, 52, 102, 17777, 17780, 59, 1, 8756, 111, 114, 101, 59, 1, 8756, 97, 4, 3, 59, 115, 118, 17795, 17797, 17802, 1, 952, 121, 109, 59, 1, 977, 59, 1, 977, 4, 2, 99, 110, 17811, 17831, 107, 4, 2, 97, 115, 17818, 17826, 112, 112, 114, 111, 120, 59, 1, 8776, 105, 109, 59, 1, 8764, 115, 112, 59, 1, 8201, 4, 2, 97, 115, 17842, 17846, 112, 59, 1, 8776, 105, 109, 59, 1, 8764, 114, 110, 5, 254, 1, 59, 17858, 1, 254, 4, 3, 108, 109, 110, 17868, 17873, 17901, 100, 101, 59, 1, 732, 101, 115, 5, 215, 3, 59, 98, 100, 17884, 17886, 17898, 1, 215, 4, 2, 59, 97, 17892, 17894, 1, 8864, 114, 59, 1, 10801, 59, 1, 10800, 116, 59, 1, 8749, 4, 3, 101, 112, 115, 17913, 17917, 17953, 97, 59, 1, 10536, 4, 4, 59, 98, 99, 102, 17927, 17929, 17934, 17939, 1, 8868, 111, 116, 59, 1, 9014, 105, 114, 59, 1, 10993, 4, 2, 59, 111, 17945, 17948, 3, 55349, 56677, 114, 107, 59, 1, 10970, 97, 59, 1, 10537, 114, 105, 109, 101, 59, 1, 8244, 4, 3, 97, 105, 112, 17972, 17977, 18082, 100, 101, 59, 1, 8482, 4, 7, 97, 100, 101, 109, 112, 115, 116, 17993, 18051, 18056, 18059, 18066, 18072, 18076, 110, 103, 108, 101, 4, 5, 59, 100, 108, 113, 114, 18009, 18011, 18017, 18032, 18035, 1, 9653, 111, 119, 110, 59, 1, 9663, 101, 102, 116, 4, 2, 59, 101, 18026, 18028, 1, 9667, 113, 59, 1, 8884, 59, 1, 8796, 105, 103, 104, 116, 4, 2, 59, 101, 18045, 18047, 1, 9657, 113, 59, 1, 8885, 111, 116, 59, 1, 9708, 59, 1, 8796, 105, 110, 117, 115, 59, 1, 10810, 108, 117, 115, 59, 1, 10809, 98, 59, 1, 10701, 105, 109, 101, 59, 1, 10811, 101, 122, 105, 117, 109, 59, 1, 9186, 4, 3, 99, 104, 116, 18098, 18111, 18116, 4, 2, 114, 121, 18104, 18108, 59, 3, 55349, 56521, 59, 1, 1094, 99, 121, 59, 1, 1115, 114, 111, 107, 59, 1, 359, 4, 2, 105, 111, 18128, 18133, 120, 116, 59, 1, 8812, 104, 101, 97, 100, 4, 2, 108, 114, 18143, 18154, 101, 102, 116, 97, 114, 114, 111, 119, 59, 1, 8606, 105, 103, 104, 116, 97, 114, 114, 111, 119, 59, 1, 8608, 4, 18, 65, 72, 97, 98, 99, 100, 102, 103, 104, 108, 109, 111, 112, 114, 115, 116, 117, 119, 18204, 18209, 18214, 18234, 18250, 18268, 18292, 18308, 18319, 18343, 18379, 18397, 18413, 18504, 18547, 18553, 18584, 18603, 114, 114, 59, 1, 8657, 97, 114, 59, 1, 10595, 4, 2, 99, 114, 18220, 18230, 117, 116, 101, 5, 250, 1, 59, 18228, 1, 250, 114, 59, 1, 8593, 114, 4, 2, 99, 101, 18241, 18245, 121, 59, 1, 1118, 118, 101, 59, 1, 365, 4, 2, 105, 121, 18256, 18265, 114, 99, 5, 251, 1, 59, 18263, 1, 251, 59, 1, 1091, 4, 3, 97, 98, 104, 18276, 18281, 18287, 114, 114, 59, 1, 8645, 108, 97, 99, 59, 1, 369, 97, 114, 59, 1, 10606, 4, 2, 105, 114, 18298, 18304, 115, 104, 116, 59, 1, 10622, 59, 3, 55349, 56626, 114, 97, 118, 101, 5, 249, 1, 59, 18317, 1, 249, 4, 2, 97, 98, 18325, 18338, 114, 4, 2, 108, 114, 18332, 18335, 59, 1, 8639, 59, 1, 8638, 108, 107, 59, 1, 9600, 4, 2, 99, 116, 18349, 18374, 4, 2, 111, 114, 18355, 18369, 114, 110, 4, 2, 59, 101, 18363, 18365, 1, 8988, 114, 59, 1, 8988, 111, 112, 59, 1, 8975, 114, 105, 59, 1, 9720, 4, 2, 97, 108, 18385, 18390, 99, 114, 59, 1, 363, 5, 168, 1, 59, 18395, 1, 168, 4, 2, 103, 112, 18403, 18408, 111, 110, 59, 1, 371, 102, 59, 3, 55349, 56678, 4, 6, 97, 100, 104, 108, 115, 117, 18427, 18434, 18445, 18470, 18475, 18494, 114, 114, 111, 119, 59, 1, 8593, 111, 119, 110, 97, 114, 114, 111, 119, 59, 1, 8597, 97, 114, 112, 111, 111, 110, 4, 2, 108, 114, 18457, 18463, 101, 102, 116, 59, 1, 8639, 105, 103, 104, 116, 59, 1, 8638, 117, 115, 59, 1, 8846, 105, 4, 3, 59, 104, 108, 18484, 18486, 18489, 1, 965, 59, 1, 978, 111, 110, 59, 1, 965, 112, 97, 114, 114, 111, 119, 115, 59, 1, 8648, 4, 3, 99, 105, 116, 18512, 18537, 18542, 4, 2, 111, 114, 18518, 18532, 114, 110, 4, 2, 59, 101, 18526, 18528, 1, 8989, 114, 59, 1, 8989, 111, 112, 59, 1, 8974, 110, 103, 59, 1, 367, 114, 105, 59, 1, 9721, 99, 114, 59, 3, 55349, 56522, 4, 3, 100, 105, 114, 18561, 18566, 18572, 111, 116, 59, 1, 8944, 108, 100, 101, 59, 1, 361, 105, 4, 2, 59, 102, 18579, 18581, 1, 9653, 59, 1, 9652, 4, 2, 97, 109, 18590, 18595, 114, 114, 59, 1, 8648, 108, 5, 252, 1, 59, 18601, 1, 252, 97, 110, 103, 108, 101, 59, 1, 10663, 4, 15, 65, 66, 68, 97, 99, 100, 101, 102, 108, 110, 111, 112, 114, 115, 122, 18643, 18648, 18661, 18667, 18847, 18851, 18857, 18904, 18909, 18915, 18931, 18937, 18943, 18949, 18996, 114, 114, 59, 1, 8661, 97, 114, 4, 2, 59, 118, 18656, 18658, 1, 10984, 59, 1, 10985, 97, 115, 104, 59, 1, 8872, 4, 2, 110, 114, 18673, 18679, 103, 114, 116, 59, 1, 10652, 4, 7, 101, 107, 110, 112, 114, 115, 116, 18695, 18704, 18711, 18720, 18742, 18754, 18810, 112, 115, 105, 108, 111, 110, 59, 1, 1013, 97, 112, 112, 97, 59, 1, 1008, 111, 116, 104, 105, 110, 103, 59, 1, 8709, 4, 3, 104, 105, 114, 18728, 18732, 18735, 105, 59, 1, 981, 59, 1, 982, 111, 112, 116, 111, 59, 1, 8733, 4, 2, 59, 104, 18748, 18750, 1, 8597, 111, 59, 1, 1009, 4, 2, 105, 117, 18760, 18766, 103, 109, 97, 59, 1, 962, 4, 2, 98, 112, 18772, 18791, 115, 101, 116, 110, 101, 113, 4, 2, 59, 113, 18784, 18787, 3, 8842, 65024, 59, 3, 10955, 65024, 115, 101, 116, 110, 101, 113, 4, 2, 59, 113, 18803, 18806, 3, 8843, 65024, 59, 3, 10956, 65024, 4, 2, 104, 114, 18816, 18822, 101, 116, 97, 59, 1, 977, 105, 97, 110, 103, 108, 101, 4, 2, 108, 114, 18834, 18840, 101, 102, 116, 59, 1, 8882, 105, 103, 104, 116, 59, 1, 8883, 121, 59, 1, 1074, 97, 115, 104, 59, 1, 8866, 4, 3, 101, 108, 114, 18865, 18884, 18890, 4, 3, 59, 98, 101, 18873, 18875, 18880, 1, 8744, 97, 114, 59, 1, 8891, 113, 59, 1, 8794, 108, 105, 112, 59, 1, 8942, 4, 2, 98, 116, 18896, 18901, 97, 114, 59, 1, 124, 59, 1, 124, 114, 59, 3, 55349, 56627, 116, 114, 105, 59, 1, 8882, 115, 117, 4, 2, 98, 112, 18923, 18927, 59, 3, 8834, 8402, 59, 3, 8835, 8402, 112, 102, 59, 3, 55349, 56679, 114, 111, 112, 59, 1, 8733, 116, 114, 105, 59, 1, 8883, 4, 2, 99, 117, 18955, 18960, 114, 59, 3, 55349, 56523, 4, 2, 98, 112, 18966, 18981, 110, 4, 2, 69, 101, 18973, 18977, 59, 3, 10955, 65024, 59, 3, 8842, 65024, 110, 4, 2, 69, 101, 18988, 18992, 59, 3, 10956, 65024, 59, 3, 8843, 65024, 105, 103, 122, 97, 103, 59, 1, 10650, 4, 7, 99, 101, 102, 111, 112, 114, 115, 19020, 19026, 19061, 19066, 19072, 19075, 19089, 105, 114, 99, 59, 1, 373, 4, 2, 100, 105, 19032, 19055, 4, 2, 98, 103, 19038, 19043, 97, 114, 59, 1, 10847, 101, 4, 2, 59, 113, 19050, 19052, 1, 8743, 59, 1, 8793, 101, 114, 112, 59, 1, 8472, 114, 59, 3, 55349, 56628, 112, 102, 59, 3, 55349, 56680, 59, 1, 8472, 4, 2, 59, 101, 19081, 19083, 1, 8768, 97, 116, 104, 59, 1, 8768, 99, 114, 59, 3, 55349, 56524, 4, 14, 99, 100, 102, 104, 105, 108, 109, 110, 111, 114, 115, 117, 118, 119, 19125, 19146, 19152, 19157, 19173, 19176, 19192, 19197, 19202, 19236, 19252, 19269, 19286, 19291, 4, 3, 97, 105, 117, 19133, 19137, 19142, 112, 59, 1, 8898, 114, 99, 59, 1, 9711, 112, 59, 1, 8899, 116, 114, 105, 59, 1, 9661, 114, 59, 3, 55349, 56629, 4, 2, 65, 97, 19163, 19168, 114, 114, 59, 1, 10234, 114, 114, 59, 1, 10231, 59, 1, 958, 4, 2, 65, 97, 19182, 19187, 114, 114, 59, 1, 10232, 114, 114, 59, 1, 10229, 97, 112, 59, 1, 10236, 105, 115, 59, 1, 8955, 4, 3, 100, 112, 116, 19210, 19215, 19230, 111, 116, 59, 1, 10752, 4, 2, 102, 108, 19221, 19225, 59, 3, 55349, 56681, 117, 115, 59, 1, 10753, 105, 109, 101, 59, 1, 10754, 4, 2, 65, 97, 19242, 19247, 114, 114, 59, 1, 10233, 114, 114, 59, 1, 10230, 4, 2, 99, 113, 19258, 19263, 114, 59, 3, 55349, 56525, 99, 117, 112, 59, 1, 10758, 4, 2, 112, 116, 19275, 19281, 108, 117, 115, 59, 1, 10756, 114, 105, 59, 1, 9651, 101, 101, 59, 1, 8897, 101, 100, 103, 101, 59, 1, 8896, 4, 8, 97, 99, 101, 102, 105, 111, 115, 117, 19316, 19335, 19349, 19357, 19362, 19367, 19373, 19379, 99, 4, 2, 117, 121, 19323, 19332, 116, 101, 5, 253, 1, 59, 19330, 1, 253, 59, 1, 1103, 4, 2, 105, 121, 19341, 19346, 114, 99, 59, 1, 375, 59, 1, 1099, 110, 5, 165, 1, 59, 19355, 1, 165, 114, 59, 3, 55349, 56630, 99, 121, 59, 1, 1111, 112, 102, 59, 3, 55349, 56682, 99, 114, 59, 3, 55349, 56526, 4, 2, 99, 109, 19385, 19389, 121, 59, 1, 1102, 108, 5, 255, 1, 59, 19395, 1, 255, 4, 10, 97, 99, 100, 101, 102, 104, 105, 111, 115, 119, 19419, 19426, 19441, 19446, 19462, 19467, 19472, 19480, 19486, 19492, 99, 117, 116, 101, 59, 1, 378, 4, 2, 97, 121, 19432, 19438, 114, 111, 110, 59, 1, 382, 59, 1, 1079, 111, 116, 59, 1, 380, 4, 2, 101, 116, 19452, 19458, 116, 114, 102, 59, 1, 8488, 97, 59, 1, 950, 114, 59, 3, 55349, 56631, 99, 121, 59, 1, 1078, 103, 114, 97, 114, 114, 59, 1, 8669, 112, 102, 59, 3, 55349, 56683, 99, 114, 59, 3, 55349, 56527, 4, 2, 106, 110, 19498, 19501, 59, 1, 8205, 106, 59, 1, 8204]);
  });

  // node_modules/parse5/lib/tokenizer/index.js
  var require_tokenizer = __commonJS((exports2, module2) => {
    "use strict";
    var Preprocessor = require_preprocessor();
    var UNICODE = require_unicode();
    var neTree = require_named_entity_data();
    var $ = UNICODE.CODE_POINTS;
    var $$ = UNICODE.CODE_POINT_SEQUENCES;
    var NUMERIC_ENTITY_REPLACEMENTS = {
      0: 65533,
      13: 13,
      128: 8364,
      129: 129,
      130: 8218,
      131: 402,
      132: 8222,
      133: 8230,
      134: 8224,
      135: 8225,
      136: 710,
      137: 8240,
      138: 352,
      139: 8249,
      140: 338,
      141: 141,
      142: 381,
      143: 143,
      144: 144,
      145: 8216,
      146: 8217,
      147: 8220,
      148: 8221,
      149: 8226,
      150: 8211,
      151: 8212,
      152: 732,
      153: 8482,
      154: 353,
      155: 8250,
      156: 339,
      157: 157,
      158: 382,
      159: 376
    };
    var HAS_DATA_FLAG = 1 << 0;
    var DATA_DUPLET_FLAG = 1 << 1;
    var HAS_BRANCHES_FLAG = 1 << 2;
    var MAX_BRANCH_MARKER_VALUE = HAS_DATA_FLAG | DATA_DUPLET_FLAG | HAS_BRANCHES_FLAG;
    var DATA_STATE = "DATA_STATE";
    var CHARACTER_REFERENCE_IN_DATA_STATE = "CHARACTER_REFERENCE_IN_DATA_STATE";
    var RCDATA_STATE = "RCDATA_STATE";
    var CHARACTER_REFERENCE_IN_RCDATA_STATE = "CHARACTER_REFERENCE_IN_RCDATA_STATE";
    var RAWTEXT_STATE = "RAWTEXT_STATE";
    var SCRIPT_DATA_STATE = "SCRIPT_DATA_STATE";
    var PLAINTEXT_STATE = "PLAINTEXT_STATE";
    var TAG_OPEN_STATE = "TAG_OPEN_STATE";
    var END_TAG_OPEN_STATE = "END_TAG_OPEN_STATE";
    var TAG_NAME_STATE = "TAG_NAME_STATE";
    var RCDATA_LESS_THAN_SIGN_STATE = "RCDATA_LESS_THAN_SIGN_STATE";
    var RCDATA_END_TAG_OPEN_STATE = "RCDATA_END_TAG_OPEN_STATE";
    var RCDATA_END_TAG_NAME_STATE = "RCDATA_END_TAG_NAME_STATE";
    var RAWTEXT_LESS_THAN_SIGN_STATE = "RAWTEXT_LESS_THAN_SIGN_STATE";
    var RAWTEXT_END_TAG_OPEN_STATE = "RAWTEXT_END_TAG_OPEN_STATE";
    var RAWTEXT_END_TAG_NAME_STATE = "RAWTEXT_END_TAG_NAME_STATE";
    var SCRIPT_DATA_LESS_THAN_SIGN_STATE = "SCRIPT_DATA_LESS_THAN_SIGN_STATE";
    var SCRIPT_DATA_END_TAG_OPEN_STATE = "SCRIPT_DATA_END_TAG_OPEN_STATE";
    var SCRIPT_DATA_END_TAG_NAME_STATE = "SCRIPT_DATA_END_TAG_NAME_STATE";
    var SCRIPT_DATA_ESCAPE_START_STATE = "SCRIPT_DATA_ESCAPE_START_STATE";
    var SCRIPT_DATA_ESCAPE_START_DASH_STATE = "SCRIPT_DATA_ESCAPE_START_DASH_STATE";
    var SCRIPT_DATA_ESCAPED_STATE = "SCRIPT_DATA_ESCAPED_STATE";
    var SCRIPT_DATA_ESCAPED_DASH_STATE = "SCRIPT_DATA_ESCAPED_DASH_STATE";
    var SCRIPT_DATA_ESCAPED_DASH_DASH_STATE = "SCRIPT_DATA_ESCAPED_DASH_DASH_STATE";
    var SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE";
    var SCRIPT_DATA_ESCAPED_END_TAG_OPEN_STATE = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN_STATE";
    var SCRIPT_DATA_ESCAPED_END_TAG_NAME_STATE = "SCRIPT_DATA_ESCAPED_END_TAG_NAME_STATE";
    var SCRIPT_DATA_DOUBLE_ESCAPE_START_STATE = "SCRIPT_DATA_DOUBLE_ESCAPE_START_STATE";
    var SCRIPT_DATA_DOUBLE_ESCAPED_STATE = "SCRIPT_DATA_DOUBLE_ESCAPED_STATE";
    var SCRIPT_DATA_DOUBLE_ESCAPED_DASH_STATE = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_STATE";
    var SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH_STATE = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH_STATE";
    var SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE";
    var SCRIPT_DATA_DOUBLE_ESCAPE_END_STATE = "SCRIPT_DATA_DOUBLE_ESCAPE_END_STATE";
    var BEFORE_ATTRIBUTE_NAME_STATE = "BEFORE_ATTRIBUTE_NAME_STATE";
    var ATTRIBUTE_NAME_STATE = "ATTRIBUTE_NAME_STATE";
    var AFTER_ATTRIBUTE_NAME_STATE = "AFTER_ATTRIBUTE_NAME_STATE";
    var BEFORE_ATTRIBUTE_VALUE_STATE = "BEFORE_ATTRIBUTE_VALUE_STATE";
    var ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE = "ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE";
    var ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE = "ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE";
    var ATTRIBUTE_VALUE_UNQUOTED_STATE = "ATTRIBUTE_VALUE_UNQUOTED_STATE";
    var CHARACTER_REFERENCE_IN_ATTRIBUTE_VALUE_STATE = "CHARACTER_REFERENCE_IN_ATTRIBUTE_VALUE_STATE";
    var AFTER_ATTRIBUTE_VALUE_QUOTED_STATE = "AFTER_ATTRIBUTE_VALUE_QUOTED_STATE";
    var SELF_CLOSING_START_TAG_STATE = "SELF_CLOSING_START_TAG_STATE";
    var BOGUS_COMMENT_STATE = "BOGUS_COMMENT_STATE";
    var BOGUS_COMMENT_STATE_CONTINUATION = "BOGUS_COMMENT_STATE_CONTINUATION";
    var MARKUP_DECLARATION_OPEN_STATE = "MARKUP_DECLARATION_OPEN_STATE";
    var COMMENT_START_STATE = "COMMENT_START_STATE";
    var COMMENT_START_DASH_STATE = "COMMENT_START_DASH_STATE";
    var COMMENT_STATE = "COMMENT_STATE";
    var COMMENT_END_DASH_STATE = "COMMENT_END_DASH_STATE";
    var COMMENT_END_STATE = "COMMENT_END_STATE";
    var COMMENT_END_BANG_STATE = "COMMENT_END_BANG_STATE";
    var DOCTYPE_STATE = "DOCTYPE_STATE";
    var DOCTYPE_NAME_STATE = "DOCTYPE_NAME_STATE";
    var AFTER_DOCTYPE_NAME_STATE = "AFTER_DOCTYPE_NAME_STATE";
    var BEFORE_DOCTYPE_PUBLIC_IDENTIFIER_STATE = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER_STATE";
    var DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED_STATE = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED_STATE";
    var DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED_STATE = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED_STATE";
    var BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS_STATE = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS_STATE";
    var BEFORE_DOCTYPE_SYSTEM_IDENTIFIER_STATE = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER_STATE";
    var DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE";
    var DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE";
    var AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE";
    var BOGUS_DOCTYPE_STATE = "BOGUS_DOCTYPE_STATE";
    var CDATA_SECTION_STATE = "CDATA_SECTION_STATE";
    function isWhitespace(cp) {
      return cp === $.SPACE || cp === $.LINE_FEED || cp === $.TABULATION || cp === $.FORM_FEED;
    }
    function isAsciiDigit(cp) {
      return cp >= $.DIGIT_0 && cp <= $.DIGIT_9;
    }
    function isAsciiUpper(cp) {
      return cp >= $.LATIN_CAPITAL_A && cp <= $.LATIN_CAPITAL_Z;
    }
    function isAsciiLower(cp) {
      return cp >= $.LATIN_SMALL_A && cp <= $.LATIN_SMALL_Z;
    }
    function isAsciiLetter(cp) {
      return isAsciiLower(cp) || isAsciiUpper(cp);
    }
    function isAsciiAlphaNumeric(cp) {
      return isAsciiLetter(cp) || isAsciiDigit(cp);
    }
    function isDigit(cp, isHex) {
      return isAsciiDigit(cp) || isHex && (cp >= $.LATIN_CAPITAL_A && cp <= $.LATIN_CAPITAL_F || cp >= $.LATIN_SMALL_A && cp <= $.LATIN_SMALL_F);
    }
    function isReservedCodePoint(cp) {
      return cp >= 55296 && cp <= 57343 || cp > 1114111;
    }
    function toAsciiLowerCodePoint(cp) {
      return cp + 32;
    }
    function toChar(cp) {
      if (cp <= 65535)
        return String.fromCharCode(cp);
      cp -= 65536;
      return String.fromCharCode(cp >>> 10 & 1023 | 55296) + String.fromCharCode(56320 | cp & 1023);
    }
    function toAsciiLowerChar(cp) {
      return String.fromCharCode(toAsciiLowerCodePoint(cp));
    }
    function findNamedEntityTreeBranch(nodeIx, cp) {
      var branchCount = neTree[++nodeIx], lo = ++nodeIx, hi = lo + branchCount - 1;
      while (lo <= hi) {
        var mid = lo + hi >>> 1, midCp = neTree[mid];
        if (midCp < cp)
          lo = mid + 1;
        else if (midCp > cp)
          hi = mid - 1;
        else
          return neTree[mid + branchCount];
      }
      return -1;
    }
    var Tokenizer = module2.exports = function() {
      this.preprocessor = new Preprocessor();
      this.tokenQueue = [];
      this.allowCDATA = false;
      this.state = DATA_STATE;
      this.returnState = "";
      this.tempBuff = [];
      this.additionalAllowedCp = void 0;
      this.lastStartTagName = "";
      this.consumedAfterSnapshot = -1;
      this.active = false;
      this.currentCharacterToken = null;
      this.currentToken = null;
      this.currentAttr = null;
    };
    Tokenizer.CHARACTER_TOKEN = "CHARACTER_TOKEN";
    Tokenizer.NULL_CHARACTER_TOKEN = "NULL_CHARACTER_TOKEN";
    Tokenizer.WHITESPACE_CHARACTER_TOKEN = "WHITESPACE_CHARACTER_TOKEN";
    Tokenizer.START_TAG_TOKEN = "START_TAG_TOKEN";
    Tokenizer.END_TAG_TOKEN = "END_TAG_TOKEN";
    Tokenizer.COMMENT_TOKEN = "COMMENT_TOKEN";
    Tokenizer.DOCTYPE_TOKEN = "DOCTYPE_TOKEN";
    Tokenizer.EOF_TOKEN = "EOF_TOKEN";
    Tokenizer.HIBERNATION_TOKEN = "HIBERNATION_TOKEN";
    Tokenizer.MODE = {
      DATA: DATA_STATE,
      RCDATA: RCDATA_STATE,
      RAWTEXT: RAWTEXT_STATE,
      SCRIPT_DATA: SCRIPT_DATA_STATE,
      PLAINTEXT: PLAINTEXT_STATE
    };
    Tokenizer.getTokenAttr = function(token, attrName) {
      for (var i = token.attrs.length - 1; i >= 0; i--) {
        if (token.attrs[i].name === attrName)
          return token.attrs[i].value;
      }
      return null;
    };
    Tokenizer.prototype.getNextToken = function() {
      while (!this.tokenQueue.length && this.active) {
        this._hibernationSnapshot();
        var cp = this._consume();
        if (!this._ensureHibernation())
          this[this.state](cp);
      }
      return this.tokenQueue.shift();
    };
    Tokenizer.prototype.write = function(chunk, isLastChunk) {
      this.active = true;
      this.preprocessor.write(chunk, isLastChunk);
    };
    Tokenizer.prototype.insertHtmlAtCurrentPos = function(chunk) {
      this.active = true;
      this.preprocessor.insertHtmlAtCurrentPos(chunk);
    };
    Tokenizer.prototype._hibernationSnapshot = function() {
      this.consumedAfterSnapshot = 0;
    };
    Tokenizer.prototype._ensureHibernation = function() {
      if (this.preprocessor.endOfChunkHit) {
        for (; this.consumedAfterSnapshot > 0; this.consumedAfterSnapshot--)
          this.preprocessor.retreat();
        this.active = false;
        this.tokenQueue.push({type: Tokenizer.HIBERNATION_TOKEN});
        return true;
      }
      return false;
    };
    Tokenizer.prototype._consume = function() {
      this.consumedAfterSnapshot++;
      return this.preprocessor.advance();
    };
    Tokenizer.prototype._unconsume = function() {
      this.consumedAfterSnapshot--;
      this.preprocessor.retreat();
    };
    Tokenizer.prototype._unconsumeSeveral = function(count) {
      while (count--)
        this._unconsume();
    };
    Tokenizer.prototype._reconsumeInState = function(state) {
      this.state = state;
      this._unconsume();
    };
    Tokenizer.prototype._consumeSubsequentIfMatch = function(pattern, startCp, caseSensitive) {
      var consumedCount = 0, isMatch = true, patternLength = pattern.length, patternPos = 0, cp = startCp, patternCp = void 0;
      for (; patternPos < patternLength; patternPos++) {
        if (patternPos > 0) {
          cp = this._consume();
          consumedCount++;
        }
        if (cp === $.EOF) {
          isMatch = false;
          break;
        }
        patternCp = pattern[patternPos];
        if (cp !== patternCp && (caseSensitive || cp !== toAsciiLowerCodePoint(patternCp))) {
          isMatch = false;
          break;
        }
      }
      if (!isMatch)
        this._unconsumeSeveral(consumedCount);
      return isMatch;
    };
    Tokenizer.prototype._lookahead = function() {
      var cp = this._consume();
      this._unconsume();
      return cp;
    };
    Tokenizer.prototype.isTempBufferEqualToScriptString = function() {
      if (this.tempBuff.length !== $$.SCRIPT_STRING.length)
        return false;
      for (var i = 0; i < this.tempBuff.length; i++) {
        if (this.tempBuff[i] !== $$.SCRIPT_STRING[i])
          return false;
      }
      return true;
    };
    Tokenizer.prototype._createStartTagToken = function() {
      this.currentToken = {
        type: Tokenizer.START_TAG_TOKEN,
        tagName: "",
        selfClosing: false,
        attrs: []
      };
    };
    Tokenizer.prototype._createEndTagToken = function() {
      this.currentToken = {
        type: Tokenizer.END_TAG_TOKEN,
        tagName: "",
        attrs: []
      };
    };
    Tokenizer.prototype._createCommentToken = function() {
      this.currentToken = {
        type: Tokenizer.COMMENT_TOKEN,
        data: ""
      };
    };
    Tokenizer.prototype._createDoctypeToken = function(initialName) {
      this.currentToken = {
        type: Tokenizer.DOCTYPE_TOKEN,
        name: initialName,
        forceQuirks: false,
        publicId: null,
        systemId: null
      };
    };
    Tokenizer.prototype._createCharacterToken = function(type, ch) {
      this.currentCharacterToken = {
        type,
        chars: ch
      };
    };
    Tokenizer.prototype._createAttr = function(attrNameFirstCh) {
      this.currentAttr = {
        name: attrNameFirstCh,
        value: ""
      };
    };
    Tokenizer.prototype._isDuplicateAttr = function() {
      return Tokenizer.getTokenAttr(this.currentToken, this.currentAttr.name) !== null;
    };
    Tokenizer.prototype._leaveAttrName = function(toState) {
      this.state = toState;
      if (!this._isDuplicateAttr())
        this.currentToken.attrs.push(this.currentAttr);
    };
    Tokenizer.prototype._leaveAttrValue = function(toState) {
      this.state = toState;
    };
    Tokenizer.prototype._isAppropriateEndTagToken = function() {
      return this.lastStartTagName === this.currentToken.tagName;
    };
    Tokenizer.prototype._emitCurrentToken = function() {
      this._emitCurrentCharacterToken();
      if (this.currentToken.type === Tokenizer.START_TAG_TOKEN)
        this.lastStartTagName = this.currentToken.tagName;
      this.tokenQueue.push(this.currentToken);
      this.currentToken = null;
    };
    Tokenizer.prototype._emitCurrentCharacterToken = function() {
      if (this.currentCharacterToken) {
        this.tokenQueue.push(this.currentCharacterToken);
        this.currentCharacterToken = null;
      }
    };
    Tokenizer.prototype._emitEOFToken = function() {
      this._emitCurrentCharacterToken();
      this.tokenQueue.push({type: Tokenizer.EOF_TOKEN});
    };
    Tokenizer.prototype._appendCharToCurrentCharacterToken = function(type, ch) {
      if (this.currentCharacterToken && this.currentCharacterToken.type !== type)
        this._emitCurrentCharacterToken();
      if (this.currentCharacterToken)
        this.currentCharacterToken.chars += ch;
      else
        this._createCharacterToken(type, ch);
    };
    Tokenizer.prototype._emitCodePoint = function(cp) {
      var type = Tokenizer.CHARACTER_TOKEN;
      if (isWhitespace(cp))
        type = Tokenizer.WHITESPACE_CHARACTER_TOKEN;
      else if (cp === $.NULL)
        type = Tokenizer.NULL_CHARACTER_TOKEN;
      this._appendCharToCurrentCharacterToken(type, toChar(cp));
    };
    Tokenizer.prototype._emitSeveralCodePoints = function(codePoints) {
      for (var i = 0; i < codePoints.length; i++)
        this._emitCodePoint(codePoints[i]);
    };
    Tokenizer.prototype._emitChar = function(ch) {
      this._appendCharToCurrentCharacterToken(Tokenizer.CHARACTER_TOKEN, ch);
    };
    Tokenizer.prototype._consumeNumericEntity = function(isHex) {
      var digits = "", nextCp = void 0;
      do {
        digits += toChar(this._consume());
        nextCp = this._lookahead();
      } while (nextCp !== $.EOF && isDigit(nextCp, isHex));
      if (this._lookahead() === $.SEMICOLON)
        this._consume();
      var referencedCp = parseInt(digits, isHex ? 16 : 10), replacement = NUMERIC_ENTITY_REPLACEMENTS[referencedCp];
      if (replacement)
        return replacement;
      if (isReservedCodePoint(referencedCp))
        return $.REPLACEMENT_CHARACTER;
      return referencedCp;
    };
    Tokenizer.prototype._consumeNamedEntity = function(inAttr) {
      var referencedCodePoints = null, referenceSize = 0, cp = null, consumedCount = 0, semicolonTerminated = false;
      for (var i = 0; i > -1; ) {
        var current = neTree[i], inNode = current < MAX_BRANCH_MARKER_VALUE, nodeWithData = inNode && current & HAS_DATA_FLAG;
        if (nodeWithData) {
          referencedCodePoints = current & DATA_DUPLET_FLAG ? [neTree[++i], neTree[++i]] : [neTree[++i]];
          referenceSize = consumedCount;
          if (cp === $.SEMICOLON) {
            semicolonTerminated = true;
            break;
          }
        }
        cp = this._consume();
        consumedCount++;
        if (cp === $.EOF)
          break;
        if (inNode)
          i = current & HAS_BRANCHES_FLAG ? findNamedEntityTreeBranch(i, cp) : -1;
        else
          i = cp === current ? ++i : -1;
      }
      if (referencedCodePoints) {
        if (!semicolonTerminated) {
          this._unconsumeSeveral(consumedCount - referenceSize);
          if (inAttr) {
            var nextCp = this._lookahead();
            if (nextCp === $.EQUALS_SIGN || isAsciiAlphaNumeric(nextCp)) {
              this._unconsumeSeveral(referenceSize);
              return null;
            }
          }
        }
        return referencedCodePoints;
      }
      this._unconsumeSeveral(consumedCount);
      return null;
    };
    Tokenizer.prototype._consumeCharacterReference = function(startCp, inAttr) {
      if (isWhitespace(startCp) || startCp === $.GREATER_THAN_SIGN || startCp === $.AMPERSAND || startCp === this.additionalAllowedCp || startCp === $.EOF) {
        this._unconsume();
        return null;
      }
      if (startCp === $.NUMBER_SIGN) {
        var isHex = false, nextCp = this._lookahead();
        if (nextCp === $.LATIN_SMALL_X || nextCp === $.LATIN_CAPITAL_X) {
          this._consume();
          isHex = true;
        }
        nextCp = this._lookahead();
        if (nextCp !== $.EOF && isDigit(nextCp, isHex))
          return [this._consumeNumericEntity(isHex)];
        this._unconsumeSeveral(isHex ? 2 : 1);
        return null;
      }
      this._unconsume();
      return this._consumeNamedEntity(inAttr);
    };
    var _ = Tokenizer.prototype;
    _[DATA_STATE] = function dataState(cp) {
      this.preprocessor.dropParsedChunk();
      if (cp === $.AMPERSAND)
        this.state = CHARACTER_REFERENCE_IN_DATA_STATE;
      else if (cp === $.LESS_THAN_SIGN)
        this.state = TAG_OPEN_STATE;
      else if (cp === $.NULL)
        this._emitCodePoint(cp);
      else if (cp === $.EOF)
        this._emitEOFToken();
      else
        this._emitCodePoint(cp);
    };
    _[CHARACTER_REFERENCE_IN_DATA_STATE] = function characterReferenceInDataState(cp) {
      this.additionalAllowedCp = void 0;
      var referencedCodePoints = this._consumeCharacterReference(cp, false);
      if (!this._ensureHibernation()) {
        if (referencedCodePoints)
          this._emitSeveralCodePoints(referencedCodePoints);
        else
          this._emitChar("&");
        this.state = DATA_STATE;
      }
    };
    _[RCDATA_STATE] = function rcdataState(cp) {
      this.preprocessor.dropParsedChunk();
      if (cp === $.AMPERSAND)
        this.state = CHARACTER_REFERENCE_IN_RCDATA_STATE;
      else if (cp === $.LESS_THAN_SIGN)
        this.state = RCDATA_LESS_THAN_SIGN_STATE;
      else if (cp === $.NULL)
        this._emitChar(UNICODE.REPLACEMENT_CHARACTER);
      else if (cp === $.EOF)
        this._emitEOFToken();
      else
        this._emitCodePoint(cp);
    };
    _[CHARACTER_REFERENCE_IN_RCDATA_STATE] = function characterReferenceInRcdataState(cp) {
      this.additionalAllowedCp = void 0;
      var referencedCodePoints = this._consumeCharacterReference(cp, false);
      if (!this._ensureHibernation()) {
        if (referencedCodePoints)
          this._emitSeveralCodePoints(referencedCodePoints);
        else
          this._emitChar("&");
        this.state = RCDATA_STATE;
      }
    };
    _[RAWTEXT_STATE] = function rawtextState(cp) {
      this.preprocessor.dropParsedChunk();
      if (cp === $.LESS_THAN_SIGN)
        this.state = RAWTEXT_LESS_THAN_SIGN_STATE;
      else if (cp === $.NULL)
        this._emitChar(UNICODE.REPLACEMENT_CHARACTER);
      else if (cp === $.EOF)
        this._emitEOFToken();
      else
        this._emitCodePoint(cp);
    };
    _[SCRIPT_DATA_STATE] = function scriptDataState(cp) {
      this.preprocessor.dropParsedChunk();
      if (cp === $.LESS_THAN_SIGN)
        this.state = SCRIPT_DATA_LESS_THAN_SIGN_STATE;
      else if (cp === $.NULL)
        this._emitChar(UNICODE.REPLACEMENT_CHARACTER);
      else if (cp === $.EOF)
        this._emitEOFToken();
      else
        this._emitCodePoint(cp);
    };
    _[PLAINTEXT_STATE] = function plaintextState(cp) {
      this.preprocessor.dropParsedChunk();
      if (cp === $.NULL)
        this._emitChar(UNICODE.REPLACEMENT_CHARACTER);
      else if (cp === $.EOF)
        this._emitEOFToken();
      else
        this._emitCodePoint(cp);
    };
    _[TAG_OPEN_STATE] = function tagOpenState(cp) {
      if (cp === $.EXCLAMATION_MARK)
        this.state = MARKUP_DECLARATION_OPEN_STATE;
      else if (cp === $.SOLIDUS)
        this.state = END_TAG_OPEN_STATE;
      else if (isAsciiLetter(cp)) {
        this._createStartTagToken();
        this._reconsumeInState(TAG_NAME_STATE);
      } else if (cp === $.QUESTION_MARK)
        this._reconsumeInState(BOGUS_COMMENT_STATE);
      else {
        this._emitChar("<");
        this._reconsumeInState(DATA_STATE);
      }
    };
    _[END_TAG_OPEN_STATE] = function endTagOpenState(cp) {
      if (isAsciiLetter(cp)) {
        this._createEndTagToken();
        this._reconsumeInState(TAG_NAME_STATE);
      } else if (cp === $.GREATER_THAN_SIGN)
        this.state = DATA_STATE;
      else if (cp === $.EOF) {
        this._reconsumeInState(DATA_STATE);
        this._emitChar("<");
        this._emitChar("/");
      } else
        this._reconsumeInState(BOGUS_COMMENT_STATE);
    };
    _[TAG_NAME_STATE] = function tagNameState(cp) {
      if (isWhitespace(cp))
        this.state = BEFORE_ATTRIBUTE_NAME_STATE;
      else if (cp === $.SOLIDUS)
        this.state = SELF_CLOSING_START_TAG_STATE;
      else if (cp === $.GREATER_THAN_SIGN) {
        this.state = DATA_STATE;
        this._emitCurrentToken();
      } else if (isAsciiUpper(cp))
        this.currentToken.tagName += toAsciiLowerChar(cp);
      else if (cp === $.NULL)
        this.currentToken.tagName += UNICODE.REPLACEMENT_CHARACTER;
      else if (cp === $.EOF)
        this._reconsumeInState(DATA_STATE);
      else
        this.currentToken.tagName += toChar(cp);
    };
    _[RCDATA_LESS_THAN_SIGN_STATE] = function rcdataLessThanSignState(cp) {
      if (cp === $.SOLIDUS) {
        this.tempBuff = [];
        this.state = RCDATA_END_TAG_OPEN_STATE;
      } else {
        this._emitChar("<");
        this._reconsumeInState(RCDATA_STATE);
      }
    };
    _[RCDATA_END_TAG_OPEN_STATE] = function rcdataEndTagOpenState(cp) {
      if (isAsciiLetter(cp)) {
        this._createEndTagToken();
        this._reconsumeInState(RCDATA_END_TAG_NAME_STATE);
      } else {
        this._emitChar("<");
        this._emitChar("/");
        this._reconsumeInState(RCDATA_STATE);
      }
    };
    _[RCDATA_END_TAG_NAME_STATE] = function rcdataEndTagNameState(cp) {
      if (isAsciiUpper(cp)) {
        this.currentToken.tagName += toAsciiLowerChar(cp);
        this.tempBuff.push(cp);
      } else if (isAsciiLower(cp)) {
        this.currentToken.tagName += toChar(cp);
        this.tempBuff.push(cp);
      } else {
        if (this._isAppropriateEndTagToken()) {
          if (isWhitespace(cp)) {
            this.state = BEFORE_ATTRIBUTE_NAME_STATE;
            return;
          }
          if (cp === $.SOLIDUS) {
            this.state = SELF_CLOSING_START_TAG_STATE;
            return;
          }
          if (cp === $.GREATER_THAN_SIGN) {
            this.state = DATA_STATE;
            this._emitCurrentToken();
            return;
          }
        }
        this._emitChar("<");
        this._emitChar("/");
        this._emitSeveralCodePoints(this.tempBuff);
        this._reconsumeInState(RCDATA_STATE);
      }
    };
    _[RAWTEXT_LESS_THAN_SIGN_STATE] = function rawtextLessThanSignState(cp) {
      if (cp === $.SOLIDUS) {
        this.tempBuff = [];
        this.state = RAWTEXT_END_TAG_OPEN_STATE;
      } else {
        this._emitChar("<");
        this._reconsumeInState(RAWTEXT_STATE);
      }
    };
    _[RAWTEXT_END_TAG_OPEN_STATE] = function rawtextEndTagOpenState(cp) {
      if (isAsciiLetter(cp)) {
        this._createEndTagToken();
        this._reconsumeInState(RAWTEXT_END_TAG_NAME_STATE);
      } else {
        this._emitChar("<");
        this._emitChar("/");
        this._reconsumeInState(RAWTEXT_STATE);
      }
    };
    _[RAWTEXT_END_TAG_NAME_STATE] = function rawtextEndTagNameState(cp) {
      if (isAsciiUpper(cp)) {
        this.currentToken.tagName += toAsciiLowerChar(cp);
        this.tempBuff.push(cp);
      } else if (isAsciiLower(cp)) {
        this.currentToken.tagName += toChar(cp);
        this.tempBuff.push(cp);
      } else {
        if (this._isAppropriateEndTagToken()) {
          if (isWhitespace(cp)) {
            this.state = BEFORE_ATTRIBUTE_NAME_STATE;
            return;
          }
          if (cp === $.SOLIDUS) {
            this.state = SELF_CLOSING_START_TAG_STATE;
            return;
          }
          if (cp === $.GREATER_THAN_SIGN) {
            this._emitCurrentToken();
            this.state = DATA_STATE;
            return;
          }
        }
        this._emitChar("<");
        this._emitChar("/");
        this._emitSeveralCodePoints(this.tempBuff);
        this._reconsumeInState(RAWTEXT_STATE);
      }
    };
    _[SCRIPT_DATA_LESS_THAN_SIGN_STATE] = function scriptDataLessThanSignState(cp) {
      if (cp === $.SOLIDUS) {
        this.tempBuff = [];
        this.state = SCRIPT_DATA_END_TAG_OPEN_STATE;
      } else if (cp === $.EXCLAMATION_MARK) {
        this.state = SCRIPT_DATA_ESCAPE_START_STATE;
        this._emitChar("<");
        this._emitChar("!");
      } else {
        this._emitChar("<");
        this._reconsumeInState(SCRIPT_DATA_STATE);
      }
    };
    _[SCRIPT_DATA_END_TAG_OPEN_STATE] = function scriptDataEndTagOpenState(cp) {
      if (isAsciiLetter(cp)) {
        this._createEndTagToken();
        this._reconsumeInState(SCRIPT_DATA_END_TAG_NAME_STATE);
      } else {
        this._emitChar("<");
        this._emitChar("/");
        this._reconsumeInState(SCRIPT_DATA_STATE);
      }
    };
    _[SCRIPT_DATA_END_TAG_NAME_STATE] = function scriptDataEndTagNameState(cp) {
      if (isAsciiUpper(cp)) {
        this.currentToken.tagName += toAsciiLowerChar(cp);
        this.tempBuff.push(cp);
      } else if (isAsciiLower(cp)) {
        this.currentToken.tagName += toChar(cp);
        this.tempBuff.push(cp);
      } else {
        if (this._isAppropriateEndTagToken()) {
          if (isWhitespace(cp)) {
            this.state = BEFORE_ATTRIBUTE_NAME_STATE;
            return;
          } else if (cp === $.SOLIDUS) {
            this.state = SELF_CLOSING_START_TAG_STATE;
            return;
          } else if (cp === $.GREATER_THAN_SIGN) {
            this._emitCurrentToken();
            this.state = DATA_STATE;
            return;
          }
        }
        this._emitChar("<");
        this._emitChar("/");
        this._emitSeveralCodePoints(this.tempBuff);
        this._reconsumeInState(SCRIPT_DATA_STATE);
      }
    };
    _[SCRIPT_DATA_ESCAPE_START_STATE] = function scriptDataEscapeStartState(cp) {
      if (cp === $.HYPHEN_MINUS) {
        this.state = SCRIPT_DATA_ESCAPE_START_DASH_STATE;
        this._emitChar("-");
      } else
        this._reconsumeInState(SCRIPT_DATA_STATE);
    };
    _[SCRIPT_DATA_ESCAPE_START_DASH_STATE] = function scriptDataEscapeStartDashState(cp) {
      if (cp === $.HYPHEN_MINUS) {
        this.state = SCRIPT_DATA_ESCAPED_DASH_DASH_STATE;
        this._emitChar("-");
      } else
        this._reconsumeInState(SCRIPT_DATA_STATE);
    };
    _[SCRIPT_DATA_ESCAPED_STATE] = function scriptDataEscapedState(cp) {
      if (cp === $.HYPHEN_MINUS) {
        this.state = SCRIPT_DATA_ESCAPED_DASH_STATE;
        this._emitChar("-");
      } else if (cp === $.LESS_THAN_SIGN)
        this.state = SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE;
      else if (cp === $.NULL)
        this._emitChar(UNICODE.REPLACEMENT_CHARACTER);
      else if (cp === $.EOF)
        this._reconsumeInState(DATA_STATE);
      else
        this._emitCodePoint(cp);
    };
    _[SCRIPT_DATA_ESCAPED_DASH_STATE] = function scriptDataEscapedDashState(cp) {
      if (cp === $.HYPHEN_MINUS) {
        this.state = SCRIPT_DATA_ESCAPED_DASH_DASH_STATE;
        this._emitChar("-");
      } else if (cp === $.LESS_THAN_SIGN)
        this.state = SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE;
      else if (cp === $.NULL) {
        this.state = SCRIPT_DATA_ESCAPED_STATE;
        this._emitChar(UNICODE.REPLACEMENT_CHARACTER);
      } else if (cp === $.EOF)
        this._reconsumeInState(DATA_STATE);
      else {
        this.state = SCRIPT_DATA_ESCAPED_STATE;
        this._emitCodePoint(cp);
      }
    };
    _[SCRIPT_DATA_ESCAPED_DASH_DASH_STATE] = function scriptDataEscapedDashDashState(cp) {
      if (cp === $.HYPHEN_MINUS)
        this._emitChar("-");
      else if (cp === $.LESS_THAN_SIGN)
        this.state = SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE;
      else if (cp === $.GREATER_THAN_SIGN) {
        this.state = SCRIPT_DATA_STATE;
        this._emitChar(">");
      } else if (cp === $.NULL) {
        this.state = SCRIPT_DATA_ESCAPED_STATE;
        this._emitChar(UNICODE.REPLACEMENT_CHARACTER);
      } else if (cp === $.EOF)
        this._reconsumeInState(DATA_STATE);
      else {
        this.state = SCRIPT_DATA_ESCAPED_STATE;
        this._emitCodePoint(cp);
      }
    };
    _[SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN_STATE] = function scriptDataEscapedLessThanSignState(cp) {
      if (cp === $.SOLIDUS) {
        this.tempBuff = [];
        this.state = SCRIPT_DATA_ESCAPED_END_TAG_OPEN_STATE;
      } else if (isAsciiLetter(cp)) {
        this.tempBuff = [];
        this._emitChar("<");
        this._reconsumeInState(SCRIPT_DATA_DOUBLE_ESCAPE_START_STATE);
      } else {
        this._emitChar("<");
        this._reconsumeInState(SCRIPT_DATA_ESCAPED_STATE);
      }
    };
    _[SCRIPT_DATA_ESCAPED_END_TAG_OPEN_STATE] = function scriptDataEscapedEndTagOpenState(cp) {
      if (isAsciiLetter(cp)) {
        this._createEndTagToken();
        this._reconsumeInState(SCRIPT_DATA_ESCAPED_END_TAG_NAME_STATE);
      } else {
        this._emitChar("<");
        this._emitChar("/");
        this._reconsumeInState(SCRIPT_DATA_ESCAPED_STATE);
      }
    };
    _[SCRIPT_DATA_ESCAPED_END_TAG_NAME_STATE] = function scriptDataEscapedEndTagNameState(cp) {
      if (isAsciiUpper(cp)) {
        this.currentToken.tagName += toAsciiLowerChar(cp);
        this.tempBuff.push(cp);
      } else if (isAsciiLower(cp)) {
        this.currentToken.tagName += toChar(cp);
        this.tempBuff.push(cp);
      } else {
        if (this._isAppropriateEndTagToken()) {
          if (isWhitespace(cp)) {
            this.state = BEFORE_ATTRIBUTE_NAME_STATE;
            return;
          }
          if (cp === $.SOLIDUS) {
            this.state = SELF_CLOSING_START_TAG_STATE;
            return;
          }
          if (cp === $.GREATER_THAN_SIGN) {
            this._emitCurrentToken();
            this.state = DATA_STATE;
            return;
          }
        }
        this._emitChar("<");
        this._emitChar("/");
        this._emitSeveralCodePoints(this.tempBuff);
        this._reconsumeInState(SCRIPT_DATA_ESCAPED_STATE);
      }
    };
    _[SCRIPT_DATA_DOUBLE_ESCAPE_START_STATE] = function scriptDataDoubleEscapeStartState(cp) {
      if (isWhitespace(cp) || cp === $.SOLIDUS || cp === $.GREATER_THAN_SIGN) {
        this.state = this.isTempBufferEqualToScriptString() ? SCRIPT_DATA_DOUBLE_ESCAPED_STATE : SCRIPT_DATA_ESCAPED_STATE;
        this._emitCodePoint(cp);
      } else if (isAsciiUpper(cp)) {
        this.tempBuff.push(toAsciiLowerCodePoint(cp));
        this._emitCodePoint(cp);
      } else if (isAsciiLower(cp)) {
        this.tempBuff.push(cp);
        this._emitCodePoint(cp);
      } else
        this._reconsumeInState(SCRIPT_DATA_ESCAPED_STATE);
    };
    _[SCRIPT_DATA_DOUBLE_ESCAPED_STATE] = function scriptDataDoubleEscapedState(cp) {
      if (cp === $.HYPHEN_MINUS) {
        this.state = SCRIPT_DATA_DOUBLE_ESCAPED_DASH_STATE;
        this._emitChar("-");
      } else if (cp === $.LESS_THAN_SIGN) {
        this.state = SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE;
        this._emitChar("<");
      } else if (cp === $.NULL)
        this._emitChar(UNICODE.REPLACEMENT_CHARACTER);
      else if (cp === $.EOF)
        this._reconsumeInState(DATA_STATE);
      else
        this._emitCodePoint(cp);
    };
    _[SCRIPT_DATA_DOUBLE_ESCAPED_DASH_STATE] = function scriptDataDoubleEscapedDashState(cp) {
      if (cp === $.HYPHEN_MINUS) {
        this.state = SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH_STATE;
        this._emitChar("-");
      } else if (cp === $.LESS_THAN_SIGN) {
        this.state = SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE;
        this._emitChar("<");
      } else if (cp === $.NULL) {
        this.state = SCRIPT_DATA_DOUBLE_ESCAPED_STATE;
        this._emitChar(UNICODE.REPLACEMENT_CHARACTER);
      } else if (cp === $.EOF)
        this._reconsumeInState(DATA_STATE);
      else {
        this.state = SCRIPT_DATA_DOUBLE_ESCAPED_STATE;
        this._emitCodePoint(cp);
      }
    };
    _[SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH_STATE] = function scriptDataDoubleEscapedDashDashState(cp) {
      if (cp === $.HYPHEN_MINUS)
        this._emitChar("-");
      else if (cp === $.LESS_THAN_SIGN) {
        this.state = SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE;
        this._emitChar("<");
      } else if (cp === $.GREATER_THAN_SIGN) {
        this.state = SCRIPT_DATA_STATE;
        this._emitChar(">");
      } else if (cp === $.NULL) {
        this.state = SCRIPT_DATA_DOUBLE_ESCAPED_STATE;
        this._emitChar(UNICODE.REPLACEMENT_CHARACTER);
      } else if (cp === $.EOF)
        this._reconsumeInState(DATA_STATE);
      else {
        this.state = SCRIPT_DATA_DOUBLE_ESCAPED_STATE;
        this._emitCodePoint(cp);
      }
    };
    _[SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN_STATE] = function scriptDataDoubleEscapedLessThanSignState(cp) {
      if (cp === $.SOLIDUS) {
        this.tempBuff = [];
        this.state = SCRIPT_DATA_DOUBLE_ESCAPE_END_STATE;
        this._emitChar("/");
      } else
        this._reconsumeInState(SCRIPT_DATA_DOUBLE_ESCAPED_STATE);
    };
    _[SCRIPT_DATA_DOUBLE_ESCAPE_END_STATE] = function scriptDataDoubleEscapeEndState(cp) {
      if (isWhitespace(cp) || cp === $.SOLIDUS || cp === $.GREATER_THAN_SIGN) {
        this.state = this.isTempBufferEqualToScriptString() ? SCRIPT_DATA_ESCAPED_STATE : SCRIPT_DATA_DOUBLE_ESCAPED_STATE;
        this._emitCodePoint(cp);
      } else if (isAsciiUpper(cp)) {
        this.tempBuff.push(toAsciiLowerCodePoint(cp));
        this._emitCodePoint(cp);
      } else if (isAsciiLower(cp)) {
        this.tempBuff.push(cp);
        this._emitCodePoint(cp);
      } else
        this._reconsumeInState(SCRIPT_DATA_DOUBLE_ESCAPED_STATE);
    };
    _[BEFORE_ATTRIBUTE_NAME_STATE] = function beforeAttributeNameState(cp) {
      if (isWhitespace(cp))
        return;
      if (cp === $.SOLIDUS || cp === $.GREATER_THAN_SIGN || cp === $.EOF)
        this._reconsumeInState(AFTER_ATTRIBUTE_NAME_STATE);
      else if (cp === $.EQUALS_SIGN) {
        this._createAttr("=");
        this.state = ATTRIBUTE_NAME_STATE;
      } else {
        this._createAttr("");
        this._reconsumeInState(ATTRIBUTE_NAME_STATE);
      }
    };
    _[ATTRIBUTE_NAME_STATE] = function attributeNameState(cp) {
      if (isWhitespace(cp) || cp === $.SOLIDUS || cp === $.GREATER_THAN_SIGN || cp === $.EOF) {
        this._leaveAttrName(AFTER_ATTRIBUTE_NAME_STATE);
        this._unconsume();
      } else if (cp === $.EQUALS_SIGN)
        this._leaveAttrName(BEFORE_ATTRIBUTE_VALUE_STATE);
      else if (isAsciiUpper(cp))
        this.currentAttr.name += toAsciiLowerChar(cp);
      else if (cp === $.QUOTATION_MARK || cp === $.APOSTROPHE || cp === $.LESS_THAN_SIGN)
        this.currentAttr.name += toChar(cp);
      else if (cp === $.NULL)
        this.currentAttr.name += UNICODE.REPLACEMENT_CHARACTER;
      else
        this.currentAttr.name += toChar(cp);
    };
    _[AFTER_ATTRIBUTE_NAME_STATE] = function afterAttributeNameState(cp) {
      if (isWhitespace(cp))
        return;
      if (cp === $.SOLIDUS)
        this.state = SELF_CLOSING_START_TAG_STATE;
      else if (cp === $.EQUALS_SIGN)
        this.state = BEFORE_ATTRIBUTE_VALUE_STATE;
      else if (cp === $.GREATER_THAN_SIGN) {
        this.state = DATA_STATE;
        this._emitCurrentToken();
      } else if (cp === $.EOF)
        this._reconsumeInState(DATA_STATE);
      else {
        this._createAttr("");
        this._reconsumeInState(ATTRIBUTE_NAME_STATE);
      }
    };
    _[BEFORE_ATTRIBUTE_VALUE_STATE] = function beforeAttributeValueState(cp) {
      if (isWhitespace(cp))
        return;
      if (cp === $.QUOTATION_MARK)
        this.state = ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE;
      else if (cp === $.APOSTROPHE)
        this.state = ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE;
      else
        this._reconsumeInState(ATTRIBUTE_VALUE_UNQUOTED_STATE);
    };
    _[ATTRIBUTE_VALUE_DOUBLE_QUOTED_STATE] = function attributeValueDoubleQuotedState(cp) {
      if (cp === $.QUOTATION_MARK)
        this.state = AFTER_ATTRIBUTE_VALUE_QUOTED_STATE;
      else if (cp === $.AMPERSAND) {
        this.additionalAllowedCp = $.QUOTATION_MARK;
        this.returnState = this.state;
        this.state = CHARACTER_REFERENCE_IN_ATTRIBUTE_VALUE_STATE;
      } else if (cp === $.NULL)
        this.currentAttr.value += UNICODE.REPLACEMENT_CHARACTER;
      else if (cp === $.EOF)
        this._reconsumeInState(DATA_STATE);
      else
        this.currentAttr.value += toChar(cp);
    };
    _[ATTRIBUTE_VALUE_SINGLE_QUOTED_STATE] = function attributeValueSingleQuotedState(cp) {
      if (cp === $.APOSTROPHE)
        this.state = AFTER_ATTRIBUTE_VALUE_QUOTED_STATE;
      else if (cp === $.AMPERSAND) {
        this.additionalAllowedCp = $.APOSTROPHE;
        this.returnState = this.state;
        this.state = CHARACTER_REFERENCE_IN_ATTRIBUTE_VALUE_STATE;
      } else if (cp === $.NULL)
        this.currentAttr.value += UNICODE.REPLACEMENT_CHARACTER;
      else if (cp === $.EOF)
        this._reconsumeInState(DATA_STATE);
      else
        this.currentAttr.value += toChar(cp);
    };
    _[ATTRIBUTE_VALUE_UNQUOTED_STATE] = function attributeValueUnquotedState(cp) {
      if (isWhitespace(cp))
        this._leaveAttrValue(BEFORE_ATTRIBUTE_NAME_STATE);
      else if (cp === $.AMPERSAND) {
        this.additionalAllowedCp = $.GREATER_THAN_SIGN;
        this.returnState = this.state;
        this.state = CHARACTER_REFERENCE_IN_ATTRIBUTE_VALUE_STATE;
      } else if (cp === $.GREATER_THAN_SIGN) {
        this._leaveAttrValue(DATA_STATE);
        this._emitCurrentToken();
      } else if (cp === $.NULL)
        this.currentAttr.value += UNICODE.REPLACEMENT_CHARACTER;
      else if (cp === $.QUOTATION_MARK || cp === $.APOSTROPHE || cp === $.LESS_THAN_SIGN || cp === $.EQUALS_SIGN || cp === $.GRAVE_ACCENT)
        this.currentAttr.value += toChar(cp);
      else if (cp === $.EOF)
        this._reconsumeInState(DATA_STATE);
      else
        this.currentAttr.value += toChar(cp);
    };
    _[CHARACTER_REFERENCE_IN_ATTRIBUTE_VALUE_STATE] = function characterReferenceInAttributeValueState(cp) {
      var referencedCodePoints = this._consumeCharacterReference(cp, true);
      if (!this._ensureHibernation()) {
        if (referencedCodePoints) {
          for (var i = 0; i < referencedCodePoints.length; i++)
            this.currentAttr.value += toChar(referencedCodePoints[i]);
        } else
          this.currentAttr.value += "&";
        this.state = this.returnState;
      }
    };
    _[AFTER_ATTRIBUTE_VALUE_QUOTED_STATE] = function afterAttributeValueQuotedState(cp) {
      if (isWhitespace(cp))
        this._leaveAttrValue(BEFORE_ATTRIBUTE_NAME_STATE);
      else if (cp === $.SOLIDUS)
        this._leaveAttrValue(SELF_CLOSING_START_TAG_STATE);
      else if (cp === $.GREATER_THAN_SIGN) {
        this._leaveAttrValue(DATA_STATE);
        this._emitCurrentToken();
      } else if (cp === $.EOF)
        this._reconsumeInState(DATA_STATE);
      else
        this._reconsumeInState(BEFORE_ATTRIBUTE_NAME_STATE);
    };
    _[SELF_CLOSING_START_TAG_STATE] = function selfClosingStartTagState(cp) {
      if (cp === $.GREATER_THAN_SIGN) {
        this.currentToken.selfClosing = true;
        this.state = DATA_STATE;
        this._emitCurrentToken();
      } else if (cp === $.EOF)
        this._reconsumeInState(DATA_STATE);
      else
        this._reconsumeInState(BEFORE_ATTRIBUTE_NAME_STATE);
    };
    _[BOGUS_COMMENT_STATE] = function bogusCommentState() {
      this._createCommentToken();
      this._reconsumeInState(BOGUS_COMMENT_STATE_CONTINUATION);
    };
    _[BOGUS_COMMENT_STATE_CONTINUATION] = function bogusCommentStateContinuation(cp) {
      while (true) {
        if (cp === $.GREATER_THAN_SIGN) {
          this.state = DATA_STATE;
          break;
        } else if (cp === $.EOF) {
          this._reconsumeInState(DATA_STATE);
          break;
        } else {
          this.currentToken.data += cp === $.NULL ? UNICODE.REPLACEMENT_CHARACTER : toChar(cp);
          this._hibernationSnapshot();
          cp = this._consume();
          if (this._ensureHibernation())
            return;
        }
      }
      this._emitCurrentToken();
    };
    _[MARKUP_DECLARATION_OPEN_STATE] = function markupDeclarationOpenState(cp) {
      var dashDashMatch = this._consumeSubsequentIfMatch($$.DASH_DASH_STRING, cp, true), doctypeMatch = !dashDashMatch && this._consumeSubsequentIfMatch($$.DOCTYPE_STRING, cp, false), cdataMatch = !dashDashMatch && !doctypeMatch && this.allowCDATA && this._consumeSubsequentIfMatch($$.CDATA_START_STRING, cp, true);
      if (!this._ensureHibernation()) {
        if (dashDashMatch) {
          this._createCommentToken();
          this.state = COMMENT_START_STATE;
        } else if (doctypeMatch)
          this.state = DOCTYPE_STATE;
        else if (cdataMatch)
          this.state = CDATA_SECTION_STATE;
        else
          this._reconsumeInState(BOGUS_COMMENT_STATE);
      }
    };
    _[COMMENT_START_STATE] = function commentStartState(cp) {
      if (cp === $.HYPHEN_MINUS)
        this.state = COMMENT_START_DASH_STATE;
      else if (cp === $.NULL) {
        this.currentToken.data += UNICODE.REPLACEMENT_CHARACTER;
        this.state = COMMENT_STATE;
      } else if (cp === $.GREATER_THAN_SIGN) {
        this.state = DATA_STATE;
        this._emitCurrentToken();
      } else if (cp === $.EOF) {
        this._emitCurrentToken();
        this._reconsumeInState(DATA_STATE);
      } else {
        this.currentToken.data += toChar(cp);
        this.state = COMMENT_STATE;
      }
    };
    _[COMMENT_START_DASH_STATE] = function commentStartDashState(cp) {
      if (cp === $.HYPHEN_MINUS)
        this.state = COMMENT_END_STATE;
      else if (cp === $.NULL) {
        this.currentToken.data += "-";
        this.currentToken.data += UNICODE.REPLACEMENT_CHARACTER;
        this.state = COMMENT_STATE;
      } else if (cp === $.GREATER_THAN_SIGN) {
        this.state = DATA_STATE;
        this._emitCurrentToken();
      } else if (cp === $.EOF) {
        this._emitCurrentToken();
        this._reconsumeInState(DATA_STATE);
      } else {
        this.currentToken.data += "-";
        this.currentToken.data += toChar(cp);
        this.state = COMMENT_STATE;
      }
    };
    _[COMMENT_STATE] = function commentState(cp) {
      if (cp === $.HYPHEN_MINUS)
        this.state = COMMENT_END_DASH_STATE;
      else if (cp === $.NULL)
        this.currentToken.data += UNICODE.REPLACEMENT_CHARACTER;
      else if (cp === $.EOF) {
        this._emitCurrentToken();
        this._reconsumeInState(DATA_STATE);
      } else
        this.currentToken.data += toChar(cp);
    };
    _[COMMENT_END_DASH_STATE] = function commentEndDashState(cp) {
      if (cp === $.HYPHEN_MINUS)
        this.state = COMMENT_END_STATE;
      else if (cp === $.NULL) {
        this.currentToken.data += "-";
        this.currentToken.data += UNICODE.REPLACEMENT_CHARACTER;
        this.state = COMMENT_STATE;
      } else if (cp === $.EOF) {
        this._emitCurrentToken();
        this._reconsumeInState(DATA_STATE);
      } else {
        this.currentToken.data += "-";
        this.currentToken.data += toChar(cp);
        this.state = COMMENT_STATE;
      }
    };
    _[COMMENT_END_STATE] = function commentEndState(cp) {
      if (cp === $.GREATER_THAN_SIGN) {
        this.state = DATA_STATE;
        this._emitCurrentToken();
      } else if (cp === $.EXCLAMATION_MARK)
        this.state = COMMENT_END_BANG_STATE;
      else if (cp === $.HYPHEN_MINUS)
        this.currentToken.data += "-";
      else if (cp === $.NULL) {
        this.currentToken.data += "--";
        this.currentToken.data += UNICODE.REPLACEMENT_CHARACTER;
        this.state = COMMENT_STATE;
      } else if (cp === $.EOF) {
        this._reconsumeInState(DATA_STATE);
        this._emitCurrentToken();
      } else {
        this.currentToken.data += "--";
        this.currentToken.data += toChar(cp);
        this.state = COMMENT_STATE;
      }
    };
    _[COMMENT_END_BANG_STATE] = function commentEndBangState(cp) {
      if (cp === $.HYPHEN_MINUS) {
        this.currentToken.data += "--!";
        this.state = COMMENT_END_DASH_STATE;
      } else if (cp === $.GREATER_THAN_SIGN) {
        this.state = DATA_STATE;
        this._emitCurrentToken();
      } else if (cp === $.NULL) {
        this.currentToken.data += "--!";
        this.currentToken.data += UNICODE.REPLACEMENT_CHARACTER;
        this.state = COMMENT_STATE;
      } else if (cp === $.EOF) {
        this._emitCurrentToken();
        this._reconsumeInState(DATA_STATE);
      } else {
        this.currentToken.data += "--!";
        this.currentToken.data += toChar(cp);
        this.state = COMMENT_STATE;
      }
    };
    _[DOCTYPE_STATE] = function doctypeState(cp) {
      if (isWhitespace(cp))
        return;
      else if (cp === $.GREATER_THAN_SIGN) {
        this._createDoctypeToken(null);
        this.currentToken.forceQuirks = true;
        this._emitCurrentToken();
        this.state = DATA_STATE;
      } else if (cp === $.EOF) {
        this._createDoctypeToken(null);
        this.currentToken.forceQuirks = true;
        this._emitCurrentToken();
        this._reconsumeInState(DATA_STATE);
      } else {
        this._createDoctypeToken("");
        this._reconsumeInState(DOCTYPE_NAME_STATE);
      }
    };
    _[DOCTYPE_NAME_STATE] = function doctypeNameState(cp) {
      if (isWhitespace(cp) || cp === $.GREATER_THAN_SIGN || cp === $.EOF)
        this._reconsumeInState(AFTER_DOCTYPE_NAME_STATE);
      else if (isAsciiUpper(cp))
        this.currentToken.name += toAsciiLowerChar(cp);
      else if (cp === $.NULL)
        this.currentToken.name += UNICODE.REPLACEMENT_CHARACTER;
      else
        this.currentToken.name += toChar(cp);
    };
    _[AFTER_DOCTYPE_NAME_STATE] = function afterDoctypeNameState(cp) {
      if (isWhitespace(cp))
        return;
      if (cp === $.GREATER_THAN_SIGN) {
        this.state = DATA_STATE;
        this._emitCurrentToken();
      } else {
        var publicMatch = this._consumeSubsequentIfMatch($$.PUBLIC_STRING, cp, false), systemMatch = !publicMatch && this._consumeSubsequentIfMatch($$.SYSTEM_STRING, cp, false);
        if (!this._ensureHibernation()) {
          if (publicMatch)
            this.state = BEFORE_DOCTYPE_PUBLIC_IDENTIFIER_STATE;
          else if (systemMatch)
            this.state = BEFORE_DOCTYPE_SYSTEM_IDENTIFIER_STATE;
          else {
            this.currentToken.forceQuirks = true;
            this.state = BOGUS_DOCTYPE_STATE;
          }
        }
      }
    };
    _[BEFORE_DOCTYPE_PUBLIC_IDENTIFIER_STATE] = function beforeDoctypePublicIdentifierState(cp) {
      if (isWhitespace(cp))
        return;
      if (cp === $.QUOTATION_MARK) {
        this.currentToken.publicId = "";
        this.state = DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED_STATE;
      } else if (cp === $.APOSTROPHE) {
        this.currentToken.publicId = "";
        this.state = DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED_STATE;
      } else {
        this.currentToken.forceQuirks = true;
        this._reconsumeInState(BOGUS_DOCTYPE_STATE);
      }
    };
    _[DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED_STATE] = function doctypePublicIdentifierDoubleQuotedState(cp) {
      if (cp === $.QUOTATION_MARK)
        this.state = BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS_STATE;
      else if (cp === $.NULL)
        this.currentToken.publicId += UNICODE.REPLACEMENT_CHARACTER;
      else if (cp === $.GREATER_THAN_SIGN) {
        this.currentToken.forceQuirks = true;
        this._emitCurrentToken();
        this.state = DATA_STATE;
      } else if (cp === $.EOF) {
        this.currentToken.forceQuirks = true;
        this._emitCurrentToken();
        this._reconsumeInState(DATA_STATE);
      } else
        this.currentToken.publicId += toChar(cp);
    };
    _[DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED_STATE] = function doctypePublicIdentifierSingleQuotedState(cp) {
      if (cp === $.APOSTROPHE)
        this.state = BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS_STATE;
      else if (cp === $.NULL)
        this.currentToken.publicId += UNICODE.REPLACEMENT_CHARACTER;
      else if (cp === $.GREATER_THAN_SIGN) {
        this.currentToken.forceQuirks = true;
        this._emitCurrentToken();
        this.state = DATA_STATE;
      } else if (cp === $.EOF) {
        this.currentToken.forceQuirks = true;
        this._emitCurrentToken();
        this._reconsumeInState(DATA_STATE);
      } else
        this.currentToken.publicId += toChar(cp);
    };
    _[BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS_STATE] = function betweenDoctypePublicAndSystemIdentifiersState(cp) {
      if (isWhitespace(cp))
        return;
      if (cp === $.GREATER_THAN_SIGN) {
        this._emitCurrentToken();
        this.state = DATA_STATE;
      } else if (cp === $.QUOTATION_MARK) {
        this.currentToken.systemId = "";
        this.state = DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE;
      } else if (cp === $.APOSTROPHE) {
        this.currentToken.systemId = "";
        this.state = DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE;
      } else {
        this.currentToken.forceQuirks = true;
        this._reconsumeInState(BOGUS_DOCTYPE_STATE);
      }
    };
    _[BEFORE_DOCTYPE_SYSTEM_IDENTIFIER_STATE] = function beforeDoctypeSystemIdentifierState(cp) {
      if (isWhitespace(cp))
        return;
      if (cp === $.QUOTATION_MARK) {
        this.currentToken.systemId = "";
        this.state = DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE;
      } else if (cp === $.APOSTROPHE) {
        this.currentToken.systemId = "";
        this.state = DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE;
      } else {
        this.currentToken.forceQuirks = true;
        this._reconsumeInState(BOGUS_DOCTYPE_STATE);
      }
    };
    _[DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED_STATE] = function doctypeSystemIdentifierDoubleQuotedState(cp) {
      if (cp === $.QUOTATION_MARK)
        this.state = AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE;
      else if (cp === $.GREATER_THAN_SIGN) {
        this.currentToken.forceQuirks = true;
        this._emitCurrentToken();
        this.state = DATA_STATE;
      } else if (cp === $.NULL)
        this.currentToken.systemId += UNICODE.REPLACEMENT_CHARACTER;
      else if (cp === $.EOF) {
        this.currentToken.forceQuirks = true;
        this._emitCurrentToken();
        this._reconsumeInState(DATA_STATE);
      } else
        this.currentToken.systemId += toChar(cp);
    };
    _[DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED_STATE] = function doctypeSystemIdentifierSingleQuotedState(cp) {
      if (cp === $.APOSTROPHE)
        this.state = AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE;
      else if (cp === $.GREATER_THAN_SIGN) {
        this.currentToken.forceQuirks = true;
        this._emitCurrentToken();
        this.state = DATA_STATE;
      } else if (cp === $.NULL)
        this.currentToken.systemId += UNICODE.REPLACEMENT_CHARACTER;
      else if (cp === $.EOF) {
        this.currentToken.forceQuirks = true;
        this._emitCurrentToken();
        this._reconsumeInState(DATA_STATE);
      } else
        this.currentToken.systemId += toChar(cp);
    };
    _[AFTER_DOCTYPE_SYSTEM_IDENTIFIER_STATE] = function afterDoctypeSystemIdentifierState(cp) {
      if (isWhitespace(cp))
        return;
      if (cp === $.GREATER_THAN_SIGN) {
        this._emitCurrentToken();
        this.state = DATA_STATE;
      } else if (cp === $.EOF) {
        this.currentToken.forceQuirks = true;
        this._emitCurrentToken();
        this._reconsumeInState(DATA_STATE);
      } else
        this.state = BOGUS_DOCTYPE_STATE;
    };
    _[BOGUS_DOCTYPE_STATE] = function bogusDoctypeState(cp) {
      if (cp === $.GREATER_THAN_SIGN) {
        this._emitCurrentToken();
        this.state = DATA_STATE;
      } else if (cp === $.EOF) {
        this._emitCurrentToken();
        this._reconsumeInState(DATA_STATE);
      }
    };
    _[CDATA_SECTION_STATE] = function cdataSectionState(cp) {
      while (true) {
        if (cp === $.EOF) {
          this._reconsumeInState(DATA_STATE);
          break;
        } else {
          var cdataEndMatch = this._consumeSubsequentIfMatch($$.CDATA_END_STRING, cp, true);
          if (this._ensureHibernation())
            break;
          if (cdataEndMatch) {
            this.state = DATA_STATE;
            break;
          }
          this._emitCodePoint(cp);
          this._hibernationSnapshot();
          cp = this._consume();
          if (this._ensureHibernation())
            break;
        }
      }
    };
  });

  // node_modules/parse5/lib/common/html.js
  var require_html = __commonJS((exports2) => {
    "use strict";
    var NS = exports2.NAMESPACES = {
      HTML: "http://www.w3.org/1999/xhtml",
      MATHML: "http://www.w3.org/1998/Math/MathML",
      SVG: "http://www.w3.org/2000/svg",
      XLINK: "http://www.w3.org/1999/xlink",
      XML: "http://www.w3.org/XML/1998/namespace",
      XMLNS: "http://www.w3.org/2000/xmlns/"
    };
    exports2.ATTRS = {
      TYPE: "type",
      ACTION: "action",
      ENCODING: "encoding",
      PROMPT: "prompt",
      NAME: "name",
      COLOR: "color",
      FACE: "face",
      SIZE: "size"
    };
    exports2.DOCUMENT_MODE = {
      NO_QUIRKS: "no-quirks",
      QUIRKS: "quirks",
      LIMITED_QUIRKS: "limited-quirks"
    };
    var $ = exports2.TAG_NAMES = {
      A: "a",
      ADDRESS: "address",
      ANNOTATION_XML: "annotation-xml",
      APPLET: "applet",
      AREA: "area",
      ARTICLE: "article",
      ASIDE: "aside",
      B: "b",
      BASE: "base",
      BASEFONT: "basefont",
      BGSOUND: "bgsound",
      BIG: "big",
      BLOCKQUOTE: "blockquote",
      BODY: "body",
      BR: "br",
      BUTTON: "button",
      CAPTION: "caption",
      CENTER: "center",
      CODE: "code",
      COL: "col",
      COLGROUP: "colgroup",
      DD: "dd",
      DESC: "desc",
      DETAILS: "details",
      DIALOG: "dialog",
      DIR: "dir",
      DIV: "div",
      DL: "dl",
      DT: "dt",
      EM: "em",
      EMBED: "embed",
      FIELDSET: "fieldset",
      FIGCAPTION: "figcaption",
      FIGURE: "figure",
      FONT: "font",
      FOOTER: "footer",
      FOREIGN_OBJECT: "foreignObject",
      FORM: "form",
      FRAME: "frame",
      FRAMESET: "frameset",
      H1: "h1",
      H2: "h2",
      H3: "h3",
      H4: "h4",
      H5: "h5",
      H6: "h6",
      HEAD: "head",
      HEADER: "header",
      HGROUP: "hgroup",
      HR: "hr",
      HTML: "html",
      I: "i",
      IMG: "img",
      IMAGE: "image",
      INPUT: "input",
      IFRAME: "iframe",
      KEYGEN: "keygen",
      LABEL: "label",
      LI: "li",
      LINK: "link",
      LISTING: "listing",
      MAIN: "main",
      MALIGNMARK: "malignmark",
      MARQUEE: "marquee",
      MATH: "math",
      MENU: "menu",
      MENUITEM: "menuitem",
      META: "meta",
      MGLYPH: "mglyph",
      MI: "mi",
      MO: "mo",
      MN: "mn",
      MS: "ms",
      MTEXT: "mtext",
      NAV: "nav",
      NOBR: "nobr",
      NOFRAMES: "noframes",
      NOEMBED: "noembed",
      NOSCRIPT: "noscript",
      OBJECT: "object",
      OL: "ol",
      OPTGROUP: "optgroup",
      OPTION: "option",
      P: "p",
      PARAM: "param",
      PLAINTEXT: "plaintext",
      PRE: "pre",
      RB: "rb",
      RP: "rp",
      RT: "rt",
      RTC: "rtc",
      RUBY: "ruby",
      S: "s",
      SCRIPT: "script",
      SECTION: "section",
      SELECT: "select",
      SOURCE: "source",
      SMALL: "small",
      SPAN: "span",
      STRIKE: "strike",
      STRONG: "strong",
      STYLE: "style",
      SUB: "sub",
      SUMMARY: "summary",
      SUP: "sup",
      TABLE: "table",
      TBODY: "tbody",
      TEMPLATE: "template",
      TEXTAREA: "textarea",
      TFOOT: "tfoot",
      TD: "td",
      TH: "th",
      THEAD: "thead",
      TITLE: "title",
      TR: "tr",
      TRACK: "track",
      TT: "tt",
      U: "u",
      UL: "ul",
      SVG: "svg",
      VAR: "var",
      WBR: "wbr",
      XMP: "xmp"
    };
    var SPECIAL_ELEMENTS = exports2.SPECIAL_ELEMENTS = Object.create(null);
    SPECIAL_ELEMENTS[NS.HTML] = Object.create(null);
    SPECIAL_ELEMENTS[NS.HTML][$.ADDRESS] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.APPLET] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.AREA] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.ARTICLE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.ASIDE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.BASE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.BASEFONT] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.BGSOUND] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.BLOCKQUOTE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.BODY] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.BR] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.BUTTON] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.CAPTION] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.CENTER] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.COL] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.COLGROUP] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.DD] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.DETAILS] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.DIR] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.DIV] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.DL] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.DT] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.EMBED] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.FIELDSET] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.FIGCAPTION] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.FIGURE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.FOOTER] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.FORM] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.FRAME] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.FRAMESET] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.H1] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.H2] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.H3] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.H4] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.H5] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.H6] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.HEAD] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.HEADER] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.HGROUP] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.HR] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.HTML] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.IFRAME] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.IMG] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.INPUT] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.LI] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.LINK] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.LISTING] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.MAIN] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.MARQUEE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.MENU] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.META] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.NAV] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.NOEMBED] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.NOFRAMES] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.NOSCRIPT] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.OBJECT] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.OL] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.P] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.PARAM] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.PLAINTEXT] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.PRE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.SCRIPT] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.SECTION] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.SELECT] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.SOURCE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.STYLE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.SUMMARY] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.TABLE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.TBODY] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.TD] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.TEMPLATE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.TEXTAREA] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.TFOOT] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.TH] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.THEAD] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.TITLE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.TR] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.TRACK] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.UL] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.WBR] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.XMP] = true;
    SPECIAL_ELEMENTS[NS.MATHML] = Object.create(null);
    SPECIAL_ELEMENTS[NS.MATHML][$.MI] = true;
    SPECIAL_ELEMENTS[NS.MATHML][$.MO] = true;
    SPECIAL_ELEMENTS[NS.MATHML][$.MN] = true;
    SPECIAL_ELEMENTS[NS.MATHML][$.MS] = true;
    SPECIAL_ELEMENTS[NS.MATHML][$.MTEXT] = true;
    SPECIAL_ELEMENTS[NS.MATHML][$.ANNOTATION_XML] = true;
    SPECIAL_ELEMENTS[NS.SVG] = Object.create(null);
    SPECIAL_ELEMENTS[NS.SVG][$.TITLE] = true;
    SPECIAL_ELEMENTS[NS.SVG][$.FOREIGN_OBJECT] = true;
    SPECIAL_ELEMENTS[NS.SVG][$.DESC] = true;
  });

  // node_modules/parse5/lib/parser/open_element_stack.js
  var require_open_element_stack = __commonJS((exports2, module2) => {
    "use strict";
    var HTML = require_html();
    var $ = HTML.TAG_NAMES;
    var NS = HTML.NAMESPACES;
    function isImpliedEndTagRequired(tn) {
      switch (tn.length) {
        case 1:
          return tn === $.P;
        case 2:
          return tn === $.RB || tn === $.RP || tn === $.RT || tn === $.DD || tn === $.DT || tn === $.LI;
        case 3:
          return tn === $.RTC;
        case 6:
          return tn === $.OPTION;
        case 8:
          return tn === $.OPTGROUP || tn === $.MENUITEM;
      }
      return false;
    }
    function isScopingElement(tn, ns) {
      switch (tn.length) {
        case 2:
          if (tn === $.TD || tn === $.TH)
            return ns === NS.HTML;
          else if (tn === $.MI || tn === $.MO || tn === $.MN || tn === $.MS)
            return ns === NS.MATHML;
          break;
        case 4:
          if (tn === $.HTML)
            return ns === NS.HTML;
          else if (tn === $.DESC)
            return ns === NS.SVG;
          break;
        case 5:
          if (tn === $.TABLE)
            return ns === NS.HTML;
          else if (tn === $.MTEXT)
            return ns === NS.MATHML;
          else if (tn === $.TITLE)
            return ns === NS.SVG;
          break;
        case 6:
          return (tn === $.APPLET || tn === $.OBJECT) && ns === NS.HTML;
        case 7:
          return (tn === $.CAPTION || tn === $.MARQUEE) && ns === NS.HTML;
        case 8:
          return tn === $.TEMPLATE && ns === NS.HTML;
        case 13:
          return tn === $.FOREIGN_OBJECT && ns === NS.SVG;
        case 14:
          return tn === $.ANNOTATION_XML && ns === NS.MATHML;
      }
      return false;
    }
    var OpenElementStack = module2.exports = function(document2, treeAdapter) {
      this.stackTop = -1;
      this.items = [];
      this.current = document2;
      this.currentTagName = null;
      this.currentTmplContent = null;
      this.tmplCount = 0;
      this.treeAdapter = treeAdapter;
    };
    OpenElementStack.prototype._indexOf = function(element) {
      var idx = -1;
      for (var i = this.stackTop; i >= 0; i--) {
        if (this.items[i] === element) {
          idx = i;
          break;
        }
      }
      return idx;
    };
    OpenElementStack.prototype._isInTemplate = function() {
      return this.currentTagName === $.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === NS.HTML;
    };
    OpenElementStack.prototype._updateCurrentElement = function() {
      this.current = this.items[this.stackTop];
      this.currentTagName = this.current && this.treeAdapter.getTagName(this.current);
      this.currentTmplContent = this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : null;
    };
    OpenElementStack.prototype.push = function(element) {
      this.items[++this.stackTop] = element;
      this._updateCurrentElement();
      if (this._isInTemplate())
        this.tmplCount++;
    };
    OpenElementStack.prototype.pop = function() {
      this.stackTop--;
      if (this.tmplCount > 0 && this._isInTemplate())
        this.tmplCount--;
      this._updateCurrentElement();
    };
    OpenElementStack.prototype.replace = function(oldElement, newElement) {
      var idx = this._indexOf(oldElement);
      this.items[idx] = newElement;
      if (idx === this.stackTop)
        this._updateCurrentElement();
    };
    OpenElementStack.prototype.insertAfter = function(referenceElement, newElement) {
      var insertionIdx = this._indexOf(referenceElement) + 1;
      this.items.splice(insertionIdx, 0, newElement);
      if (insertionIdx === ++this.stackTop)
        this._updateCurrentElement();
    };
    OpenElementStack.prototype.popUntilTagNamePopped = function(tagName) {
      while (this.stackTop > -1) {
        var tn = this.currentTagName, ns = this.treeAdapter.getNamespaceURI(this.current);
        this.pop();
        if (tn === tagName && ns === NS.HTML)
          break;
      }
    };
    OpenElementStack.prototype.popUntilElementPopped = function(element) {
      while (this.stackTop > -1) {
        var poppedElement = this.current;
        this.pop();
        if (poppedElement === element)
          break;
      }
    };
    OpenElementStack.prototype.popUntilNumberedHeaderPopped = function() {
      while (this.stackTop > -1) {
        var tn = this.currentTagName, ns = this.treeAdapter.getNamespaceURI(this.current);
        this.pop();
        if (tn === $.H1 || tn === $.H2 || tn === $.H3 || tn === $.H4 || tn === $.H5 || tn === $.H6 && ns === NS.HTML)
          break;
      }
    };
    OpenElementStack.prototype.popUntilTableCellPopped = function() {
      while (this.stackTop > -1) {
        var tn = this.currentTagName, ns = this.treeAdapter.getNamespaceURI(this.current);
        this.pop();
        if (tn === $.TD || tn === $.TH && ns === NS.HTML)
          break;
      }
    };
    OpenElementStack.prototype.popAllUpToHtmlElement = function() {
      this.stackTop = 0;
      this._updateCurrentElement();
    };
    OpenElementStack.prototype.clearBackToTableContext = function() {
      while (this.currentTagName !== $.TABLE && this.currentTagName !== $.TEMPLATE && this.currentTagName !== $.HTML || this.treeAdapter.getNamespaceURI(this.current) !== NS.HTML)
        this.pop();
    };
    OpenElementStack.prototype.clearBackToTableBodyContext = function() {
      while (this.currentTagName !== $.TBODY && this.currentTagName !== $.TFOOT && this.currentTagName !== $.THEAD && this.currentTagName !== $.TEMPLATE && this.currentTagName !== $.HTML || this.treeAdapter.getNamespaceURI(this.current) !== NS.HTML)
        this.pop();
    };
    OpenElementStack.prototype.clearBackToTableRowContext = function() {
      while (this.currentTagName !== $.TR && this.currentTagName !== $.TEMPLATE && this.currentTagName !== $.HTML || this.treeAdapter.getNamespaceURI(this.current) !== NS.HTML)
        this.pop();
    };
    OpenElementStack.prototype.remove = function(element) {
      for (var i = this.stackTop; i >= 0; i--) {
        if (this.items[i] === element) {
          this.items.splice(i, 1);
          this.stackTop--;
          this._updateCurrentElement();
          break;
        }
      }
    };
    OpenElementStack.prototype.tryPeekProperlyNestedBodyElement = function() {
      var element = this.items[1];
      return element && this.treeAdapter.getTagName(element) === $.BODY ? element : null;
    };
    OpenElementStack.prototype.contains = function(element) {
      return this._indexOf(element) > -1;
    };
    OpenElementStack.prototype.getCommonAncestor = function(element) {
      var elementIdx = this._indexOf(element);
      return --elementIdx >= 0 ? this.items[elementIdx] : null;
    };
    OpenElementStack.prototype.isRootHtmlElementCurrent = function() {
      return this.stackTop === 0 && this.currentTagName === $.HTML;
    };
    OpenElementStack.prototype.hasInScope = function(tagName) {
      for (var i = this.stackTop; i >= 0; i--) {
        var tn = this.treeAdapter.getTagName(this.items[i]), ns = this.treeAdapter.getNamespaceURI(this.items[i]);
        if (tn === tagName && ns === NS.HTML)
          return true;
        if (isScopingElement(tn, ns))
          return false;
      }
      return true;
    };
    OpenElementStack.prototype.hasNumberedHeaderInScope = function() {
      for (var i = this.stackTop; i >= 0; i--) {
        var tn = this.treeAdapter.getTagName(this.items[i]), ns = this.treeAdapter.getNamespaceURI(this.items[i]);
        if ((tn === $.H1 || tn === $.H2 || tn === $.H3 || tn === $.H4 || tn === $.H5 || tn === $.H6) && ns === NS.HTML)
          return true;
        if (isScopingElement(tn, ns))
          return false;
      }
      return true;
    };
    OpenElementStack.prototype.hasInListItemScope = function(tagName) {
      for (var i = this.stackTop; i >= 0; i--) {
        var tn = this.treeAdapter.getTagName(this.items[i]), ns = this.treeAdapter.getNamespaceURI(this.items[i]);
        if (tn === tagName && ns === NS.HTML)
          return true;
        if ((tn === $.UL || tn === $.OL) && ns === NS.HTML || isScopingElement(tn, ns))
          return false;
      }
      return true;
    };
    OpenElementStack.prototype.hasInButtonScope = function(tagName) {
      for (var i = this.stackTop; i >= 0; i--) {
        var tn = this.treeAdapter.getTagName(this.items[i]), ns = this.treeAdapter.getNamespaceURI(this.items[i]);
        if (tn === tagName && ns === NS.HTML)
          return true;
        if (tn === $.BUTTON && ns === NS.HTML || isScopingElement(tn, ns))
          return false;
      }
      return true;
    };
    OpenElementStack.prototype.hasInTableScope = function(tagName) {
      for (var i = this.stackTop; i >= 0; i--) {
        var tn = this.treeAdapter.getTagName(this.items[i]), ns = this.treeAdapter.getNamespaceURI(this.items[i]);
        if (ns !== NS.HTML)
          continue;
        if (tn === tagName)
          return true;
        if (tn === $.TABLE || tn === $.TEMPLATE || tn === $.HTML)
          return false;
      }
      return true;
    };
    OpenElementStack.prototype.hasTableBodyContextInTableScope = function() {
      for (var i = this.stackTop; i >= 0; i--) {
        var tn = this.treeAdapter.getTagName(this.items[i]), ns = this.treeAdapter.getNamespaceURI(this.items[i]);
        if (ns !== NS.HTML)
          continue;
        if (tn === $.TBODY || tn === $.THEAD || tn === $.TFOOT)
          return true;
        if (tn === $.TABLE || tn === $.HTML)
          return false;
      }
      return true;
    };
    OpenElementStack.prototype.hasInSelectScope = function(tagName) {
      for (var i = this.stackTop; i >= 0; i--) {
        var tn = this.treeAdapter.getTagName(this.items[i]), ns = this.treeAdapter.getNamespaceURI(this.items[i]);
        if (ns !== NS.HTML)
          continue;
        if (tn === tagName)
          return true;
        if (tn !== $.OPTION && tn !== $.OPTGROUP)
          return false;
      }
      return true;
    };
    OpenElementStack.prototype.generateImpliedEndTags = function() {
      while (isImpliedEndTagRequired(this.currentTagName))
        this.pop();
    };
    OpenElementStack.prototype.generateImpliedEndTagsWithExclusion = function(exclusionTagName) {
      while (isImpliedEndTagRequired(this.currentTagName) && this.currentTagName !== exclusionTagName)
        this.pop();
    };
  });

  // node_modules/parse5/lib/parser/formatting_element_list.js
  var require_formatting_element_list = __commonJS((exports2, module2) => {
    "use strict";
    var NOAH_ARK_CAPACITY = 3;
    var FormattingElementList = module2.exports = function(treeAdapter) {
      this.length = 0;
      this.entries = [];
      this.treeAdapter = treeAdapter;
      this.bookmark = null;
    };
    FormattingElementList.MARKER_ENTRY = "MARKER_ENTRY";
    FormattingElementList.ELEMENT_ENTRY = "ELEMENT_ENTRY";
    FormattingElementList.prototype._getNoahArkConditionCandidates = function(newElement) {
      var candidates = [];
      if (this.length >= NOAH_ARK_CAPACITY) {
        var neAttrsLength = this.treeAdapter.getAttrList(newElement).length, neTagName = this.treeAdapter.getTagName(newElement), neNamespaceURI = this.treeAdapter.getNamespaceURI(newElement);
        for (var i = this.length - 1; i >= 0; i--) {
          var entry = this.entries[i];
          if (entry.type === FormattingElementList.MARKER_ENTRY)
            break;
          var element = entry.element, elementAttrs = this.treeAdapter.getAttrList(element), isCandidate = this.treeAdapter.getTagName(element) === neTagName && this.treeAdapter.getNamespaceURI(element) === neNamespaceURI && elementAttrs.length === neAttrsLength;
          if (isCandidate)
            candidates.push({idx: i, attrs: elementAttrs});
        }
      }
      return candidates.length < NOAH_ARK_CAPACITY ? [] : candidates;
    };
    FormattingElementList.prototype._ensureNoahArkCondition = function(newElement) {
      var candidates = this._getNoahArkConditionCandidates(newElement), cLength = candidates.length;
      if (cLength) {
        var neAttrs = this.treeAdapter.getAttrList(newElement), neAttrsLength = neAttrs.length, neAttrsMap = Object.create(null);
        for (var i = 0; i < neAttrsLength; i++) {
          var neAttr = neAttrs[i];
          neAttrsMap[neAttr.name] = neAttr.value;
        }
        for (i = 0; i < neAttrsLength; i++) {
          for (var j = 0; j < cLength; j++) {
            var cAttr = candidates[j].attrs[i];
            if (neAttrsMap[cAttr.name] !== cAttr.value) {
              candidates.splice(j, 1);
              cLength--;
            }
            if (candidates.length < NOAH_ARK_CAPACITY)
              return;
          }
        }
        for (i = cLength - 1; i >= NOAH_ARK_CAPACITY - 1; i--) {
          this.entries.splice(candidates[i].idx, 1);
          this.length--;
        }
      }
    };
    FormattingElementList.prototype.insertMarker = function() {
      this.entries.push({type: FormattingElementList.MARKER_ENTRY});
      this.length++;
    };
    FormattingElementList.prototype.pushElement = function(element, token) {
      this._ensureNoahArkCondition(element);
      this.entries.push({
        type: FormattingElementList.ELEMENT_ENTRY,
        element,
        token
      });
      this.length++;
    };
    FormattingElementList.prototype.insertElementAfterBookmark = function(element, token) {
      var bookmarkIdx = this.length - 1;
      for (; bookmarkIdx >= 0; bookmarkIdx--) {
        if (this.entries[bookmarkIdx] === this.bookmark)
          break;
      }
      this.entries.splice(bookmarkIdx + 1, 0, {
        type: FormattingElementList.ELEMENT_ENTRY,
        element,
        token
      });
      this.length++;
    };
    FormattingElementList.prototype.removeEntry = function(entry) {
      for (var i = this.length - 1; i >= 0; i--) {
        if (this.entries[i] === entry) {
          this.entries.splice(i, 1);
          this.length--;
          break;
        }
      }
    };
    FormattingElementList.prototype.clearToLastMarker = function() {
      while (this.length) {
        var entry = this.entries.pop();
        this.length--;
        if (entry.type === FormattingElementList.MARKER_ENTRY)
          break;
      }
    };
    FormattingElementList.prototype.getElementEntryInScopeWithTagName = function(tagName) {
      for (var i = this.length - 1; i >= 0; i--) {
        var entry = this.entries[i];
        if (entry.type === FormattingElementList.MARKER_ENTRY)
          return null;
        if (this.treeAdapter.getTagName(entry.element) === tagName)
          return entry;
      }
      return null;
    };
    FormattingElementList.prototype.getElementEntry = function(element) {
      for (var i = this.length - 1; i >= 0; i--) {
        var entry = this.entries[i];
        if (entry.type === FormattingElementList.ELEMENT_ENTRY && entry.element === element)
          return entry;
      }
      return null;
    };
  });

  // node_modules/parse5/lib/utils/mixin.js
  var require_mixin = __commonJS((exports2, module2) => {
    "use strict";
    var Mixin = module2.exports = function(host) {
      var originalMethods = {}, overriddenMethods = this._getOverriddenMethods(this, originalMethods);
      Object.keys(overriddenMethods).forEach(function(key) {
        if (typeof overriddenMethods[key] === "function") {
          originalMethods[key] = host[key];
          host[key] = overriddenMethods[key];
        }
      });
    };
    Mixin.prototype._getOverriddenMethods = function() {
      throw new Error("Not implemented");
    };
  });

  // node_modules/is-arguments/index.js
  var require_is_arguments = __commonJS((exports2, module2) => {
    "use strict";
    var hasToStringTag = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
    var toStr = Object.prototype.toString;
    var isStandardArguments = function isArguments(value) {
      if (hasToStringTag && value && typeof value === "object" && Symbol.toStringTag in value) {
        return false;
      }
      return toStr.call(value) === "[object Arguments]";
    };
    var isLegacyArguments = function isArguments(value) {
      if (isStandardArguments(value)) {
        return true;
      }
      return value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr.call(value) !== "[object Array]" && toStr.call(value.callee) === "[object Function]";
    };
    var supportsStandardArguments = function() {
      return isStandardArguments(arguments);
    }();
    isStandardArguments.isLegacyArguments = isLegacyArguments;
    module2.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
  });

  // node_modules/is-generator-function/index.js
  var require_is_generator_function = __commonJS((exports2, module2) => {
    "use strict";
    var toStr = Object.prototype.toString;
    var fnToStr = Function.prototype.toString;
    var isFnRegex = /^\s*(?:function)?\*/;
    var hasToStringTag = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
    var getProto = Object.getPrototypeOf;
    var getGeneratorFunc = function() {
      if (!hasToStringTag) {
        return false;
      }
      try {
        return Function("return function*() {}")();
      } catch (e) {
      }
    };
    var generatorFunc = getGeneratorFunc();
    var GeneratorFunction = generatorFunc ? getProto(generatorFunc) : {};
    module2.exports = function isGeneratorFunction(fn) {
      if (typeof fn !== "function") {
        return false;
      }
      if (isFnRegex.test(fnToStr.call(fn))) {
        return true;
      }
      if (!hasToStringTag) {
        var str = toStr.call(fn);
        return str === "[object GeneratorFunction]";
      }
      return getProto(fn) === GeneratorFunction;
    };
  });

  // node_modules/foreach/index.js
  var require_foreach = __commonJS((exports2, module2) => {
    var hasOwn = Object.prototype.hasOwnProperty;
    var toString = Object.prototype.toString;
    module2.exports = function forEach(obj, fn, ctx) {
      if (toString.call(fn) !== "[object Function]") {
        throw new TypeError("iterator must be a function");
      }
      var l = obj.length;
      if (l === +l) {
        for (var i = 0; i < l; i++) {
          fn.call(ctx, obj[i], i, obj);
        }
      } else {
        for (var k in obj) {
          if (hasOwn.call(obj, k)) {
            fn.call(ctx, obj[k], k, obj);
          }
        }
      }
    };
  });

  // node_modules/array-filter/index.js
  var require_array_filter = __commonJS((exports2, module2) => {
    module2.exports = function(arr, fn, self) {
      if (arr.filter)
        return arr.filter(fn, self);
      if (arr === void 0 || arr === null)
        throw new TypeError();
      if (typeof fn != "function")
        throw new TypeError();
      var ret = [];
      for (var i = 0; i < arr.length; i++) {
        if (!hasOwn.call(arr, i))
          continue;
        var val = arr[i];
        if (fn.call(self, val, i, arr))
          ret.push(val);
      }
      return ret;
    };
    var hasOwn = Object.prototype.hasOwnProperty;
  });

  // node_modules/available-typed-arrays/index.js
  var require_available_typed_arrays = __commonJS((exports2, module2) => {
    "use strict";
    var filter = require_array_filter();
    module2.exports = function availableTypedArrays() {
      return filter([
        "BigInt64Array",
        "BigUint64Array",
        "Float32Array",
        "Float64Array",
        "Int16Array",
        "Int32Array",
        "Int8Array",
        "Uint16Array",
        "Uint32Array",
        "Uint8Array",
        "Uint8ClampedArray"
      ], function(typedArray) {
        return typeof "global"[typedArray] === "function";
      });
    };
  });

  // node_modules/has-symbols/shams.js
  var require_shams = __commonJS((exports2, module2) => {
    "use strict";
    module2.exports = function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (sym in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    };
  });

  // node_modules/has-symbols/index.js
  var require_has_symbols = __commonJS((exports2, module2) => {
    "use strict";
    var origSymbol = "global".Symbol;
    var hasSymbolSham = require_shams();
    module2.exports = function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    };
  });

  // node_modules/function-bind/implementation.js
  var require_implementation = __commonJS((exports2, module2) => {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var slice = Array.prototype.slice;
    var toStr = Object.prototype.toString;
    var funcType = "[object Function]";
    module2.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slice.call(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(this, args.concat(slice.call(arguments)));
          if (Object(result) === result) {
            return result;
          }
          return this;
        } else {
          return target.apply(that, args.concat(slice.call(arguments)));
        }
      };
      var boundLength = Math.max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs.push("$" + i);
      }
      bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  });

  // node_modules/function-bind/index.js
  var require_function_bind = __commonJS((exports2, module2) => {
    "use strict";
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  });

  // node_modules/es-abstract/GetIntrinsic.js
  var require_GetIntrinsic = __commonJS((exports2, module2) => {
    "use strict";
    var undefined2;
    var $TypeError = TypeError;
    var $gOPD = Object.getOwnPropertyDescriptor;
    if ($gOPD) {
      try {
        $gOPD({}, "");
      } catch (e) {
        $gOPD = null;
      }
    }
    var throwTypeError = function() {
      throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var getProto = Object.getPrototypeOf || function(x) {
      return x.__proto__;
    };
    var generator;
    var generatorFunction = generator ? getProto(generator) : undefined2;
    var asyncFn;
    var asyncFunction = asyncFn ? asyncFn.constructor : undefined2;
    var asyncGen;
    var asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined2;
    var asyncGenIterator = asyncGen ? asyncGen() : undefined2;
    var TypedArray = typeof Uint8Array === "undefined" ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayBufferPrototype%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer.prototype,
      "%ArrayIteratorPrototype%": hasSymbols ? getProto([][Symbol.iterator]()) : undefined2,
      "%ArrayPrototype%": Array.prototype,
      "%ArrayProto_entries%": Array.prototype.entries,
      "%ArrayProto_forEach%": Array.prototype.forEach,
      "%ArrayProto_keys%": Array.prototype.keys,
      "%ArrayProto_values%": Array.prototype.values,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": asyncFunction,
      "%AsyncFunctionPrototype%": asyncFunction ? asyncFunction.prototype : undefined2,
      "%AsyncGenerator%": asyncGen ? getProto(asyncGenIterator) : undefined2,
      "%AsyncGeneratorFunction%": asyncGenFunction,
      "%AsyncGeneratorPrototype%": asyncGenFunction ? asyncGenFunction.prototype : undefined2,
      "%AsyncIteratorPrototype%": asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined2,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%Boolean%": Boolean,
      "%BooleanPrototype%": Boolean.prototype,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%DataViewPrototype%": typeof DataView === "undefined" ? undefined2 : DataView.prototype,
      "%Date%": Date,
      "%DatePrototype%": Date.prototype,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": Error,
      "%ErrorPrototype%": Error.prototype,
      "%eval%": eval,
      "%EvalError%": EvalError,
      "%EvalErrorPrototype%": EvalError.prototype,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float32ArrayPrototype%": typeof Float32Array === "undefined" ? undefined2 : Float32Array.prototype,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%Float64ArrayPrototype%": typeof Float64Array === "undefined" ? undefined2 : Float64Array.prototype,
      "%Function%": Function,
      "%FunctionPrototype%": Function.prototype,
      "%Generator%": generator ? getProto(generator()) : undefined2,
      "%GeneratorFunction%": generatorFunction,
      "%GeneratorPrototype%": generatorFunction ? generatorFunction.prototype : undefined2,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int8ArrayPrototype%": typeof Int8Array === "undefined" ? undefined2 : Int8Array.prototype,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int16ArrayPrototype%": typeof Int16Array === "undefined" ? undefined2 : Int8Array.prototype,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%Int32ArrayPrototype%": typeof Int32Array === "undefined" ? undefined2 : Int32Array.prototype,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%JSONParse%": typeof JSON === "object" ? JSON.parse : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols ? undefined2 : getProto(new Map()[Symbol.iterator]()),
      "%MapPrototype%": typeof Map === "undefined" ? undefined2 : Map.prototype,
      "%Math%": Math,
      "%Number%": Number,
      "%NumberPrototype%": Number.prototype,
      "%Object%": Object,
      "%ObjectPrototype%": Object.prototype,
      "%ObjProto_toString%": Object.prototype.toString,
      "%ObjProto_valueOf%": Object.prototype.valueOf,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%PromisePrototype%": typeof Promise === "undefined" ? undefined2 : Promise.prototype,
      "%PromiseProto_then%": typeof Promise === "undefined" ? undefined2 : Promise.prototype.then,
      "%Promise_all%": typeof Promise === "undefined" ? undefined2 : Promise.all,
      "%Promise_reject%": typeof Promise === "undefined" ? undefined2 : Promise.reject,
      "%Promise_resolve%": typeof Promise === "undefined" ? undefined2 : Promise.resolve,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": RangeError,
      "%RangeErrorPrototype%": RangeError.prototype,
      "%ReferenceError%": ReferenceError,
      "%ReferenceErrorPrototype%": ReferenceError.prototype,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%RegExpPrototype%": RegExp.prototype,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols ? undefined2 : getProto(new Set()[Symbol.iterator]()),
      "%SetPrototype%": typeof Set === "undefined" ? undefined2 : Set.prototype,
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%SharedArrayBufferPrototype%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer.prototype,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols ? getProto(""[Symbol.iterator]()) : undefined2,
      "%StringPrototype%": String.prototype,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SymbolPrototype%": hasSymbols ? Symbol.prototype : undefined2,
      "%SyntaxError%": SyntaxError,
      "%SyntaxErrorPrototype%": SyntaxError.prototype,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypedArrayPrototype%": TypedArray ? TypedArray.prototype : undefined2,
      "%TypeError%": $TypeError,
      "%TypeErrorPrototype%": $TypeError.prototype,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ArrayPrototype%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array.prototype,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint8ClampedArrayPrototype%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray.prototype,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint16ArrayPrototype%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array.prototype,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%Uint32ArrayPrototype%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array.prototype,
      "%URIError%": URIError,
      "%URIErrorPrototype%": URIError.prototype,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakMapPrototype%": typeof WeakMap === "undefined" ? undefined2 : WeakMap.prototype,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
      "%WeakSetPrototype%": typeof WeakSet === "undefined" ? undefined2 : WeakSet.prototype
    };
    var bind = require_function_bind();
    var $replace = bind.call(Function.call, String.prototype.replace);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = function stringToPath2(string) {
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    };
    var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
      if (!(name in INTRINSICS)) {
        throw new SyntaxError("intrinsic " + name + " does not exist!");
      }
      if (typeof INTRINSICS[name] === "undefined" && !allowMissing) {
        throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
      }
      return INTRINSICS[name];
    };
    module2.exports = function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new TypeError('"allowMissing" argument must be a boolean');
      }
      var parts = stringToPath(name);
      var value = getBaseIntrinsic("%" + (parts.length > 0 ? parts[0] : "") + "%", allowMissing);
      for (var i = 1; i < parts.length; i += 1) {
        if (value != null) {
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, parts[i]);
            if (!allowMissing && !(parts[i] in value)) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            value = desc && "get" in desc && !("originalValue" in desc.get) ? desc.get : value[parts[i]];
          } else {
            value = value[parts[i]];
          }
        }
      }
      return value;
    };
  });

  // node_modules/es-abstract/helpers/callBind.js
  var require_callBind = __commonJS((exports2, module2) => {
    "use strict";
    var bind = require_function_bind();
    var GetIntrinsic = require_GetIntrinsic();
    var $apply = GetIntrinsic("%Function.prototype.apply%");
    var $call = GetIntrinsic("%Function.prototype.call%");
    var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true);
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", {value: 1});
      } catch (e) {
        $defineProperty = null;
      }
    }
    module2.exports = function callBind() {
      return $reflectApply(bind, $call, arguments);
    };
    var applyBind = function applyBind2() {
      return $reflectApply(bind, $apply, arguments);
    };
    if ($defineProperty) {
      $defineProperty(module2.exports, "apply", {value: applyBind});
    } else {
      module2.exports.apply = applyBind;
    }
  });

  // node_modules/es-abstract/helpers/callBound.js
  var require_callBound = __commonJS((exports2, module2) => {
    "use strict";
    var GetIntrinsic = require_GetIntrinsic();
    var callBind = require_callBind();
    var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
    module2.exports = function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = GetIntrinsic(name, !!allowMissing);
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.")) {
        return callBind(intrinsic);
      }
      return intrinsic;
    };
  });

  // node_modules/es-abstract/helpers/getOwnPropertyDescriptor.js
  var require_getOwnPropertyDescriptor = __commonJS((exports2, module2) => {
    "use strict";
    var GetIntrinsic = require_GetIntrinsic();
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%");
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module2.exports = $gOPD;
  });

  // node_modules/is-typed-array/index.js
  var require_is_typed_array = __commonJS((exports2, module2) => {
    "use strict";
    var forEach = require_foreach();
    var availableTypedArrays = require_available_typed_arrays();
    var callBound = require_callBound();
    var $toString = callBound("Object.prototype.toString");
    var hasSymbols = require_has_symbols()();
    var hasToStringTag = hasSymbols && typeof Symbol.toStringTag === "symbol";
    var typedArrays = availableTypedArrays();
    var $indexOf = callBound("Array.prototype.indexOf", true) || function indexOf(array, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i] === value) {
          return i;
        }
      }
      return -1;
    };
    var $slice = callBound("String.prototype.slice");
    var toStrTags = {};
    var gOPD = require_getOwnPropertyDescriptor();
    var getPrototypeOf = Object.getPrototypeOf;
    if (hasToStringTag && gOPD && getPrototypeOf) {
      forEach(typedArrays, function(typedArray) {
        var arr = new "global"[typedArray]();
        if (!(Symbol.toStringTag in arr)) {
          throw new EvalError("this engine has support for Symbol.toStringTag, but " + typedArray + " does not have the property! Please report this.");
        }
        var proto = getPrototypeOf(arr);
        var descriptor = gOPD(proto, Symbol.toStringTag);
        if (!descriptor) {
          var superProto = getPrototypeOf(proto);
          descriptor = gOPD(superProto, Symbol.toStringTag);
        }
        toStrTags[typedArray] = descriptor.get;
      });
    }
    var tryTypedArrays = function tryAllTypedArrays(value) {
      var anyTrue = false;
      forEach(toStrTags, function(getter, typedArray) {
        if (!anyTrue) {
          try {
            anyTrue = getter.call(value) === typedArray;
          } catch (e) {
          }
        }
      });
      return anyTrue;
    };
    module2.exports = function isTypedArray(value) {
      if (!value || typeof value !== "object") {
        return false;
      }
      if (!hasToStringTag) {
        var tag = $slice($toString(value), 8, -1);
        return $indexOf(typedArrays, tag) > -1;
      }
      if (!gOPD) {
        return false;
      }
      return tryTypedArrays(value);
    };
  });

  // node_modules/which-typed-array/index.js
  var require_which_typed_array = __commonJS((exports2, module2) => {
    "use strict";
    var forEach = require_foreach();
    var availableTypedArrays = require_available_typed_arrays();
    var callBound = require_callBound();
    var $toString = callBound("Object.prototype.toString");
    var hasSymbols = require_has_symbols()();
    var hasToStringTag = hasSymbols && typeof Symbol.toStringTag === "symbol";
    var typedArrays = availableTypedArrays();
    var $slice = callBound("String.prototype.slice");
    var toStrTags = {};
    var gOPD = require_getOwnPropertyDescriptor();
    var getPrototypeOf = Object.getPrototypeOf;
    if (hasToStringTag && gOPD && getPrototypeOf) {
      forEach(typedArrays, function(typedArray) {
        if (typeof "global"[typedArray] === "function") {
          var arr = new "global"[typedArray]();
          if (!(Symbol.toStringTag in arr)) {
            throw new EvalError("this engine has support for Symbol.toStringTag, but " + typedArray + " does not have the property! Please report this.");
          }
          var proto = getPrototypeOf(arr);
          var descriptor = gOPD(proto, Symbol.toStringTag);
          if (!descriptor) {
            var superProto = getPrototypeOf(proto);
            descriptor = gOPD(superProto, Symbol.toStringTag);
          }
          toStrTags[typedArray] = descriptor.get;
        }
      });
    }
    var tryTypedArrays = function tryAllTypedArrays(value) {
      var foundName = false;
      forEach(toStrTags, function(getter, typedArray) {
        if (!foundName) {
          try {
            var name = getter.call(value);
            if (name === typedArray) {
              foundName = name;
            }
          } catch (e) {
          }
        }
      });
      return foundName;
    };
    var isTypedArray = require_is_typed_array();
    module2.exports = function whichTypedArray(value) {
      if (!isTypedArray(value)) {
        return false;
      }
      if (!hasToStringTag) {
        return $slice($toString(value), 8, -1);
      }
      return tryTypedArrays(value);
    };
  });

  // node_modules/util/support/types.js
  var require_types = __commonJS((exports2) => {
    "use strict";
    var isArgumentsObject = require_is_arguments();
    var isGeneratorFunction = require_is_generator_function();
    var whichTypedArray = require_which_typed_array();
    var isTypedArray = require_is_typed_array();
    function uncurryThis(f) {
      return f.call.bind(f);
    }
    var BigIntSupported = typeof BigInt !== "undefined";
    var SymbolSupported = typeof Symbol !== "undefined";
    var ObjectToString = uncurryThis(Object.prototype.toString);
    var numberValue = uncurryThis(Number.prototype.valueOf);
    var stringValue = uncurryThis(String.prototype.valueOf);
    var booleanValue = uncurryThis(Boolean.prototype.valueOf);
    if (BigIntSupported) {
      var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
    }
    if (SymbolSupported) {
      var symbolValue = uncurryThis(Symbol.prototype.valueOf);
    }
    function checkBoxedPrimitive(value, prototypeValueOf) {
      if (typeof value !== "object") {
        return false;
      }
      try {
        prototypeValueOf(value);
        return true;
      } catch (e) {
        return false;
      }
    }
    exports2.isArgumentsObject = isArgumentsObject;
    exports2.isGeneratorFunction = isGeneratorFunction;
    exports2.isTypedArray = isTypedArray;
    function isPromise(input) {
      return typeof Promise !== "undefined" && input instanceof Promise || input !== null && typeof input === "object" && typeof input.then === "function" && typeof input.catch === "function";
    }
    exports2.isPromise = isPromise;
    function isArrayBufferView(value) {
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        return ArrayBuffer.isView(value);
      }
      return isTypedArray(value) || isDataView(value);
    }
    exports2.isArrayBufferView = isArrayBufferView;
    function isUint8Array(value) {
      return whichTypedArray(value) === "Uint8Array";
    }
    exports2.isUint8Array = isUint8Array;
    function isUint8ClampedArray(value) {
      return whichTypedArray(value) === "Uint8ClampedArray";
    }
    exports2.isUint8ClampedArray = isUint8ClampedArray;
    function isUint16Array(value) {
      return whichTypedArray(value) === "Uint16Array";
    }
    exports2.isUint16Array = isUint16Array;
    function isUint32Array(value) {
      return whichTypedArray(value) === "Uint32Array";
    }
    exports2.isUint32Array = isUint32Array;
    function isInt8Array(value) {
      return whichTypedArray(value) === "Int8Array";
    }
    exports2.isInt8Array = isInt8Array;
    function isInt16Array(value) {
      return whichTypedArray(value) === "Int16Array";
    }
    exports2.isInt16Array = isInt16Array;
    function isInt32Array(value) {
      return whichTypedArray(value) === "Int32Array";
    }
    exports2.isInt32Array = isInt32Array;
    function isFloat32Array(value) {
      return whichTypedArray(value) === "Float32Array";
    }
    exports2.isFloat32Array = isFloat32Array;
    function isFloat64Array(value) {
      return whichTypedArray(value) === "Float64Array";
    }
    exports2.isFloat64Array = isFloat64Array;
    function isBigInt64Array(value) {
      return whichTypedArray(value) === "BigInt64Array";
    }
    exports2.isBigInt64Array = isBigInt64Array;
    function isBigUint64Array(value) {
      return whichTypedArray(value) === "BigUint64Array";
    }
    exports2.isBigUint64Array = isBigUint64Array;
    function isMapToString(value) {
      return ObjectToString(value) === "[object Map]";
    }
    isMapToString.working = typeof Map !== "undefined" && isMapToString(new Map());
    function isMap(value) {
      if (typeof Map === "undefined") {
        return false;
      }
      return isMapToString.working ? isMapToString(value) : value instanceof Map;
    }
    exports2.isMap = isMap;
    function isSetToString(value) {
      return ObjectToString(value) === "[object Set]";
    }
    isSetToString.working = typeof Set !== "undefined" && isSetToString(new Set());
    function isSet(value) {
      if (typeof Set === "undefined") {
        return false;
      }
      return isSetToString.working ? isSetToString(value) : value instanceof Set;
    }
    exports2.isSet = isSet;
    function isWeakMapToString(value) {
      return ObjectToString(value) === "[object WeakMap]";
    }
    isWeakMapToString.working = typeof WeakMap !== "undefined" && isWeakMapToString(new WeakMap());
    function isWeakMap(value) {
      if (typeof WeakMap === "undefined") {
        return false;
      }
      return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
    }
    exports2.isWeakMap = isWeakMap;
    function isWeakSetToString(value) {
      return ObjectToString(value) === "[object WeakSet]";
    }
    isWeakSetToString.working = typeof WeakSet !== "undefined" && isWeakSetToString(new WeakSet());
    function isWeakSet(value) {
      return isWeakSetToString(value);
    }
    exports2.isWeakSet = isWeakSet;
    function isArrayBufferToString(value) {
      return ObjectToString(value) === "[object ArrayBuffer]";
    }
    isArrayBufferToString.working = typeof ArrayBuffer !== "undefined" && isArrayBufferToString(new ArrayBuffer());
    function isArrayBuffer(value) {
      if (typeof ArrayBuffer === "undefined") {
        return false;
      }
      return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
    }
    exports2.isArrayBuffer = isArrayBuffer;
    function isDataViewToString(value) {
      return ObjectToString(value) === "[object DataView]";
    }
    isDataViewToString.working = typeof ArrayBuffer !== "undefined" && typeof DataView !== "undefined" && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
    function isDataView(value) {
      if (typeof DataView === "undefined") {
        return false;
      }
      return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
    }
    exports2.isDataView = isDataView;
    function isSharedArrayBufferToString(value) {
      return ObjectToString(value) === "[object SharedArrayBuffer]";
    }
    isSharedArrayBufferToString.working = typeof SharedArrayBuffer !== "undefined" && isSharedArrayBufferToString(new SharedArrayBuffer());
    function isSharedArrayBuffer(value) {
      if (typeof SharedArrayBuffer === "undefined") {
        return false;
      }
      return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBuffer;
    }
    exports2.isSharedArrayBuffer = isSharedArrayBuffer;
    function isAsyncFunction(value) {
      return ObjectToString(value) === "[object AsyncFunction]";
    }
    exports2.isAsyncFunction = isAsyncFunction;
    function isMapIterator(value) {
      return ObjectToString(value) === "[object Map Iterator]";
    }
    exports2.isMapIterator = isMapIterator;
    function isSetIterator(value) {
      return ObjectToString(value) === "[object Set Iterator]";
    }
    exports2.isSetIterator = isSetIterator;
    function isGeneratorObject(value) {
      return ObjectToString(value) === "[object Generator]";
    }
    exports2.isGeneratorObject = isGeneratorObject;
    function isWebAssemblyCompiledModule(value) {
      return ObjectToString(value) === "[object WebAssembly.Module]";
    }
    exports2.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
    function isNumberObject(value) {
      return checkBoxedPrimitive(value, numberValue);
    }
    exports2.isNumberObject = isNumberObject;
    function isStringObject(value) {
      return checkBoxedPrimitive(value, stringValue);
    }
    exports2.isStringObject = isStringObject;
    function isBooleanObject(value) {
      return checkBoxedPrimitive(value, booleanValue);
    }
    exports2.isBooleanObject = isBooleanObject;
    function isBigIntObject(value) {
      return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
    }
    exports2.isBigIntObject = isBigIntObject;
    function isSymbolObject(value) {
      return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
    }
    exports2.isSymbolObject = isSymbolObject;
    function isBoxedPrimitive(value) {
      return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
    }
    exports2.isBoxedPrimitive = isBoxedPrimitive;
    function isAnyArrayBuffer(value) {
      return typeof Uint8Array !== "undefined" && (isArrayBuffer(value) || isSharedArrayBuffer(value));
    }
    exports2.isAnyArrayBuffer = isAnyArrayBuffer;
    ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(method) {
      Object.defineProperty(exports2, method, {
        enumerable: false,
        value: function() {
          throw new Error(method + " is not supported in userland");
        }
      });
    });
  });

  // node_modules/util/support/isBufferBrowser.js
  var require_isBufferBrowser = __commonJS((exports2, module2) => {
    module2.exports = function isBuffer(arg) {
      return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
    };
  });

  // node_modules/inherits/inherits_browser.js
  var require_inherits_browser = __commonJS((exports2, module2) => {
    if (typeof Object.create === "function") {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  });

  // node_modules/util/util.js
  var require_util = __commonJS((exports2) => {
    var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors2(obj) {
      var keys = Object.keys(obj);
      var descriptors = {};
      for (var i = 0; i < keys.length; i++) {
        descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
      }
      return descriptors;
    };
    var formatRegExp = /%[sdj%]/g;
    exports2.format = function(f) {
      if (!isString(f)) {
        var objects = [];
        for (var i = 0; i < arguments.length; i++) {
          objects.push(inspect(arguments[i]));
        }
        return objects.join(" ");
      }
      var i = 1;
      var args = arguments;
      var len = args.length;
      var str = String(f).replace(formatRegExp, function(x2) {
        if (x2 === "%%")
          return "%";
        if (i >= len)
          return x2;
        switch (x2) {
          case "%s":
            return String(args[i++]);
          case "%d":
            return Number(args[i++]);
          case "%j":
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return "[Circular]";
            }
          default:
            return x2;
        }
      });
      for (var x = args[i]; i < len; x = args[++i]) {
        if (isNull(x) || !isObject(x)) {
          str += " " + x;
        } else {
          str += " " + inspect(x);
        }
      }
      return str;
    };
    exports2.deprecate = function(fn, msg) {
      if ("process".noDeprecation === true) {
        return fn;
      }
      if (false) {
        return function() {
          return exports2.deprecate(fn, msg).apply(this, arguments);
        };
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          if ("process".throwDeprecation) {
            throw new Error(msg);
          } else if ("process".traceDeprecation) {
            console.trace(msg);
          } else {
            console.error(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      return deprecated;
    };
    var debugs = {};
    var debugEnvRegex = /^$/;
    if ("process.env.NODE_DEBUG") {
      var debugEnv = "process.env.NODE_DEBUG";
      debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase();
      debugEnvRegex = new RegExp("^" + debugEnv + "$", "i");
    }
    exports2.debuglog = function(set) {
      set = set.toUpperCase();
      if (!debugs[set]) {
        if (debugEnvRegex.test(set)) {
          var pid = "process".pid;
          debugs[set] = function() {
            var msg = exports2.format.apply(exports2, arguments);
            console.error("%s %d: %s", set, pid, msg);
          };
        } else {
          debugs[set] = function() {
          };
        }
      }
      return debugs[set];
    };
    function inspect(obj, opts) {
      var ctx = {
        seen: [],
        stylize: stylizeNoColor
      };
      if (arguments.length >= 3)
        ctx.depth = arguments[2];
      if (arguments.length >= 4)
        ctx.colors = arguments[3];
      if (isBoolean(opts)) {
        ctx.showHidden = opts;
      } else if (opts) {
        exports2._extend(ctx, opts);
      }
      if (isUndefined(ctx.showHidden))
        ctx.showHidden = false;
      if (isUndefined(ctx.depth))
        ctx.depth = 2;
      if (isUndefined(ctx.colors))
        ctx.colors = false;
      if (isUndefined(ctx.customInspect))
        ctx.customInspect = true;
      if (ctx.colors)
        ctx.stylize = stylizeWithColor;
      return formatValue(ctx, obj, ctx.depth);
    }
    exports2.inspect = inspect;
    inspect.colors = {
      bold: [1, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      white: [37, 39],
      grey: [90, 39],
      black: [30, 39],
      blue: [34, 39],
      cyan: [36, 39],
      green: [32, 39],
      magenta: [35, 39],
      red: [31, 39],
      yellow: [33, 39]
    };
    inspect.styles = {
      special: "cyan",
      number: "yellow",
      boolean: "yellow",
      undefined: "grey",
      null: "bold",
      string: "green",
      date: "magenta",
      regexp: "red"
    };
    function stylizeWithColor(str, styleType) {
      var style = inspect.styles[styleType];
      if (style) {
        return "[" + inspect.colors[style][0] + "m" + str + "[" + inspect.colors[style][1] + "m";
      } else {
        return str;
      }
    }
    function stylizeNoColor(str, styleType) {
      return str;
    }
    function arrayToHash(array) {
      var hash = {};
      array.forEach(function(val, idx) {
        hash[val] = true;
      });
      return hash;
    }
    function formatValue(ctx, value, recurseTimes) {
      if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports2.inspect && !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);
        if (!isString(ret)) {
          ret = formatValue(ctx, ret, recurseTimes);
        }
        return ret;
      }
      var primitive = formatPrimitive(ctx, value);
      if (primitive) {
        return primitive;
      }
      var keys = Object.keys(value);
      var visibleKeys = arrayToHash(keys);
      if (ctx.showHidden) {
        keys = Object.getOwnPropertyNames(value);
      }
      if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
        return formatError(value);
      }
      if (keys.length === 0) {
        if (isFunction(value)) {
          var name = value.name ? ": " + value.name : "";
          return ctx.stylize("[Function" + name + "]", "special");
        }
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        }
        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), "date");
        }
        if (isError(value)) {
          return formatError(value);
        }
      }
      var base = "", array = false, braces = ["{", "}"];
      if (isArray(value)) {
        array = true;
        braces = ["[", "]"];
      }
      if (isFunction(value)) {
        var n = value.name ? ": " + value.name : "";
        base = " [Function" + n + "]";
      }
      if (isRegExp(value)) {
        base = " " + RegExp.prototype.toString.call(value);
      }
      if (isDate(value)) {
        base = " " + Date.prototype.toUTCString.call(value);
      }
      if (isError(value)) {
        base = " " + formatError(value);
      }
      if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
      }
      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        } else {
          return ctx.stylize("[Object]", "special");
        }
      }
      ctx.seen.push(value);
      var output;
      if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
      } else {
        output = keys.map(function(key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }
      ctx.seen.pop();
      return reduceToSingleString(output, base, braces);
    }
    function formatPrimitive(ctx, value) {
      if (isUndefined(value))
        return ctx.stylize("undefined", "undefined");
      if (isString(value)) {
        var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return ctx.stylize(simple, "string");
      }
      if (isNumber(value))
        return ctx.stylize("" + value, "number");
      if (isBoolean(value))
        return ctx.stylize("" + value, "boolean");
      if (isNull(value))
        return ctx.stylize("null", "null");
    }
    function formatError(value) {
      return "[" + Error.prototype.toString.call(value) + "]";
    }
    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
      var output = [];
      for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty(value, String(i))) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
        } else {
          output.push("");
        }
      }
      keys.forEach(function(key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
        }
      });
      return output;
    }
    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name, str, desc;
      desc = Object.getOwnPropertyDescriptor(value, key) || {value: value[key]};
      if (desc.get) {
        if (desc.set) {
          str = ctx.stylize("[Getter/Setter]", "special");
        } else {
          str = ctx.stylize("[Getter]", "special");
        }
      } else {
        if (desc.set) {
          str = ctx.stylize("[Setter]", "special");
        }
      }
      if (!hasOwnProperty(visibleKeys, key)) {
        name = "[" + key + "]";
      }
      if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
          if (isNull(recurseTimes)) {
            str = formatValue(ctx, desc.value, null);
          } else {
            str = formatValue(ctx, desc.value, recurseTimes - 1);
          }
          if (str.indexOf("\n") > -1) {
            if (array) {
              str = str.split("\n").map(function(line) {
                return "  " + line;
              }).join("\n").substr(2);
            } else {
              str = "\n" + str.split("\n").map(function(line) {
                return "   " + line;
              }).join("\n");
            }
          }
        } else {
          str = ctx.stylize("[Circular]", "special");
        }
      }
      if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify("" + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.substr(1, name.length - 2);
          name = ctx.stylize(name, "name");
        } else {
          name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, "string");
        }
      }
      return name + ": " + str;
    }
    function reduceToSingleString(output, base, braces) {
      var numLinesEst = 0;
      var length = output.reduce(function(prev, cur) {
        numLinesEst++;
        if (cur.indexOf("\n") >= 0)
          numLinesEst++;
        return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      if (length > 60) {
        return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
      }
      return braces[0] + base + " " + output.join(", ") + " " + braces[1];
    }
    exports2.types = require_types();
    function isArray(ar) {
      return Array.isArray(ar);
    }
    exports2.isArray = isArray;
    function isBoolean(arg) {
      return typeof arg === "boolean";
    }
    exports2.isBoolean = isBoolean;
    function isNull(arg) {
      return arg === null;
    }
    exports2.isNull = isNull;
    function isNullOrUndefined(arg) {
      return arg == null;
    }
    exports2.isNullOrUndefined = isNullOrUndefined;
    function isNumber(arg) {
      return typeof arg === "number";
    }
    exports2.isNumber = isNumber;
    function isString(arg) {
      return typeof arg === "string";
    }
    exports2.isString = isString;
    function isSymbol(arg) {
      return typeof arg === "symbol";
    }
    exports2.isSymbol = isSymbol;
    function isUndefined(arg) {
      return arg === void 0;
    }
    exports2.isUndefined = isUndefined;
    function isRegExp(re) {
      return isObject(re) && objectToString(re) === "[object RegExp]";
    }
    exports2.isRegExp = isRegExp;
    exports2.types.isRegExp = isRegExp;
    function isObject(arg) {
      return typeof arg === "object" && arg !== null;
    }
    exports2.isObject = isObject;
    function isDate(d) {
      return isObject(d) && objectToString(d) === "[object Date]";
    }
    exports2.isDate = isDate;
    exports2.types.isDate = isDate;
    function isError(e) {
      return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
    }
    exports2.isError = isError;
    exports2.types.isNativeError = isError;
    function isFunction(arg) {
      return typeof arg === "function";
    }
    exports2.isFunction = isFunction;
    function isPrimitive(arg) {
      return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";
    }
    exports2.isPrimitive = isPrimitive;
    exports2.isBuffer = require_isBufferBrowser();
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
    function pad(n) {
      return n < 10 ? "0" + n.toString(10) : n.toString(10);
    }
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    function timestamp() {
      var d = new Date();
      var time = [
        pad(d.getHours()),
        pad(d.getMinutes()),
        pad(d.getSeconds())
      ].join(":");
      return [d.getDate(), months[d.getMonth()], time].join(" ");
    }
    exports2.log = function() {
      console.log("%s - %s", timestamp(), exports2.format.apply(exports2, arguments));
    };
    exports2.inherits = require_inherits_browser();
    exports2._extend = function(origin, add) {
      if (!add || !isObject(add))
        return origin;
      var keys = Object.keys(add);
      var i = keys.length;
      while (i--) {
        origin[keys[i]] = add[keys[i]];
      }
      return origin;
    };
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    var kCustomPromisifiedSymbol = typeof Symbol !== "undefined" ? Symbol("util.promisify.custom") : void 0;
    exports2.promisify = function promisify(original) {
      if (typeof original !== "function")
        throw new TypeError('The "original" argument must be of type Function');
      if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
        var fn = original[kCustomPromisifiedSymbol];
        if (typeof fn !== "function") {
          throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        }
        Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true
        });
        return fn;
      }
      function fn() {
        var promiseResolve, promiseReject;
        var promise = new Promise(function(resolve, reject) {
          promiseResolve = resolve;
          promiseReject = reject;
        });
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        args.push(function(err, value) {
          if (err) {
            promiseReject(err);
          } else {
            promiseResolve(value);
          }
        });
        try {
          original.apply(this, args);
        } catch (err) {
          promiseReject(err);
        }
        return promise;
      }
      Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
      if (kCustomPromisifiedSymbol)
        Object.defineProperty(fn, kCustomPromisifiedSymbol, {
          value: fn,
          enumerable: false,
          writable: false,
          configurable: true
        });
      return Object.defineProperties(fn, getOwnPropertyDescriptors(original));
    };
    exports2.promisify.custom = kCustomPromisifiedSymbol;
    function callbackifyOnRejected(reason, cb) {
      if (!reason) {
        var newReason = new Error("Promise was rejected with a falsy value");
        newReason.reason = reason;
        reason = newReason;
      }
      return cb(reason);
    }
    function callbackify(original) {
      if (typeof original !== "function") {
        throw new TypeError('The "original" argument must be of type Function');
      }
      function callbackified() {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
          args.push(arguments[i]);
        }
        var maybeCb = args.pop();
        if (typeof maybeCb !== "function") {
          throw new TypeError("The last argument must be of type Function");
        }
        var self = this;
        var cb = function() {
          return maybeCb.apply(self, arguments);
        };
        original.apply(this, args).then(function(ret) {
          "process".nextTick(cb.bind(null, null, ret));
        }, function(rej) {
          "process".nextTick(callbackifyOnRejected.bind(null, rej, cb));
        });
      }
      Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
      Object.defineProperties(callbackified, getOwnPropertyDescriptors(original));
      return callbackified;
    }
    exports2.callbackify = callbackify;
  });

  // node_modules/parse5/lib/extensions/position_tracking/preprocessor_mixin.js
  var require_preprocessor_mixin = __commonJS((exports2, module2) => {
    "use strict";
    var Mixin = require_mixin();
    var inherits = require_util().inherits;
    var UNICODE = require_unicode();
    var $ = UNICODE.CODE_POINTS;
    var PositionTrackingPreprocessorMixin = module2.exports = function(preprocessor) {
      if (!preprocessor.__locTracker) {
        preprocessor.__locTracker = this;
        Mixin.call(this, preprocessor);
        this.preprocessor = preprocessor;
        this.isEol = false;
        this.lineStartPos = 0;
        this.droppedBufferSize = 0;
        this.col = -1;
        this.line = 1;
      }
      return preprocessor.__locTracker;
    };
    inherits(PositionTrackingPreprocessorMixin, Mixin);
    Object.defineProperty(PositionTrackingPreprocessorMixin.prototype, "offset", {
      get: function() {
        return this.droppedBufferSize + this.preprocessor.pos;
      }
    });
    PositionTrackingPreprocessorMixin.prototype._getOverriddenMethods = function(mxn, orig) {
      return {
        advance: function() {
          var cp = orig.advance.call(this);
          if (mxn.isEol) {
            mxn.isEol = false;
            mxn.line++;
            mxn.lineStartPos = mxn.offset;
          }
          if (cp === $.LINE_FEED)
            mxn.isEol = true;
          mxn.col = mxn.offset - mxn.lineStartPos + 1;
          return cp;
        },
        retreat: function() {
          orig.retreat.call(this);
          mxn.isEol = false;
          mxn.col = mxn.offset - mxn.lineStartPos + 1;
        },
        dropParsedChunk: function() {
          var prevPos = this.pos;
          orig.dropParsedChunk.call(this);
          mxn.droppedBufferSize += prevPos - this.pos;
        }
      };
    };
  });

  // node_modules/parse5/lib/extensions/location_info/tokenizer_mixin.js
  var require_tokenizer_mixin = __commonJS((exports2, module2) => {
    "use strict";
    var Mixin = require_mixin();
    var Tokenizer = require_tokenizer();
    var PositionTrackingPreprocessorMixin = require_preprocessor_mixin();
    var inherits = require_util().inherits;
    var LocationInfoTokenizerMixin = module2.exports = function(tokenizer) {
      Mixin.call(this, tokenizer);
      this.tokenizer = tokenizer;
      this.posTracker = new PositionTrackingPreprocessorMixin(tokenizer.preprocessor);
      this.currentAttrLocation = null;
      this.currentTokenLocation = null;
    };
    inherits(LocationInfoTokenizerMixin, Mixin);
    LocationInfoTokenizerMixin.prototype._getCurrentLocation = function() {
      return {
        line: this.posTracker.line,
        col: this.posTracker.col,
        startOffset: this.posTracker.offset,
        endOffset: -1
      };
    };
    LocationInfoTokenizerMixin.prototype._attachCurrentAttrLocationInfo = function() {
      this.currentAttrLocation.endOffset = this.posTracker.offset;
      var currentToken = this.tokenizer.currentToken, currentAttr = this.tokenizer.currentAttr;
      if (!currentToken.location.attrs)
        currentToken.location.attrs = Object.create(null);
      currentToken.location.attrs[currentAttr.name] = this.currentAttrLocation;
    };
    LocationInfoTokenizerMixin.prototype._getOverriddenMethods = function(mxn, orig) {
      var methods = {
        _createStartTagToken: function() {
          orig._createStartTagToken.call(this);
          this.currentToken.location = mxn.currentTokenLocation;
        },
        _createEndTagToken: function() {
          orig._createEndTagToken.call(this);
          this.currentToken.location = mxn.currentTokenLocation;
        },
        _createCommentToken: function() {
          orig._createCommentToken.call(this);
          this.currentToken.location = mxn.currentTokenLocation;
        },
        _createDoctypeToken: function(initialName) {
          orig._createDoctypeToken.call(this, initialName);
          this.currentToken.location = mxn.currentTokenLocation;
        },
        _createCharacterToken: function(type, ch) {
          orig._createCharacterToken.call(this, type, ch);
          this.currentCharacterToken.location = mxn.currentTokenLocation;
        },
        _createAttr: function(attrNameFirstCh) {
          orig._createAttr.call(this, attrNameFirstCh);
          mxn.currentAttrLocation = mxn._getCurrentLocation();
        },
        _leaveAttrName: function(toState) {
          orig._leaveAttrName.call(this, toState);
          mxn._attachCurrentAttrLocationInfo();
        },
        _leaveAttrValue: function(toState) {
          orig._leaveAttrValue.call(this, toState);
          mxn._attachCurrentAttrLocationInfo();
        },
        _emitCurrentToken: function() {
          if (this.currentCharacterToken)
            this.currentCharacterToken.location.endOffset = this.currentToken.location.startOffset;
          this.currentToken.location.endOffset = mxn.posTracker.offset + 1;
          orig._emitCurrentToken.call(this);
        },
        _emitCurrentCharacterToken: function() {
          if (this.currentCharacterToken && this.currentCharacterToken.location.endOffset === -1)
            this.currentCharacterToken.location.endOffset = mxn.posTracker.offset;
          orig._emitCurrentCharacterToken.call(this);
        }
      };
      Object.keys(Tokenizer.MODE).forEach(function(modeName) {
        var state = Tokenizer.MODE[modeName];
        methods[state] = function(cp) {
          mxn.currentTokenLocation = mxn._getCurrentLocation();
          orig[state].call(this, cp);
        };
      });
      return methods;
    };
  });

  // node_modules/parse5/lib/extensions/location_info/open_element_stack_mixin.js
  var require_open_element_stack_mixin = __commonJS((exports2, module2) => {
    "use strict";
    var Mixin = require_mixin();
    var inherits = require_util().inherits;
    var LocationInfoOpenElementStackMixin = module2.exports = function(stack, options) {
      Mixin.call(this, stack);
      this.onItemPop = options.onItemPop;
    };
    inherits(LocationInfoOpenElementStackMixin, Mixin);
    LocationInfoOpenElementStackMixin.prototype._getOverriddenMethods = function(mxn, orig) {
      return {
        pop: function() {
          mxn.onItemPop(this.current);
          orig.pop.call(this);
        },
        popAllUpToHtmlElement: function() {
          for (var i = this.stackTop; i > 0; i--)
            mxn.onItemPop(this.items[i]);
          orig.popAllUpToHtmlElement.call(this);
        },
        remove: function(element) {
          mxn.onItemPop(this.current);
          orig.remove.call(this, element);
        }
      };
    };
  });

  // node_modules/parse5/lib/extensions/location_info/parser_mixin.js
  var require_parser_mixin = __commonJS((exports2, module2) => {
    "use strict";
    var Mixin = require_mixin();
    var Tokenizer = require_tokenizer();
    var LocationInfoTokenizerMixin = require_tokenizer_mixin();
    var PositionTrackingPreprocessorMixin = require_preprocessor_mixin();
    var LocationInfoOpenElementStackMixin = require_open_element_stack_mixin();
    var HTML = require_html();
    var inherits = require_util().inherits;
    var $ = HTML.TAG_NAMES;
    var LocationInfoParserMixin = module2.exports = function(parser) {
      Mixin.call(this, parser);
      this.parser = parser;
      this.posTracker = null;
      this.lastStartTagToken = null;
      this.lastFosterParentingLocation = null;
      this.currentToken = null;
    };
    inherits(LocationInfoParserMixin, Mixin);
    LocationInfoParserMixin.prototype._setStartLocation = function(element) {
      if (this.lastStartTagToken) {
        element.__location = Object.create(this.lastStartTagToken.location);
        element.__location.startTag = this.lastStartTagToken.location;
      } else
        element.__location = null;
    };
    LocationInfoParserMixin.prototype._setEndLocation = function(element, closingToken) {
      var loc = element.__location;
      if (loc) {
        if (closingToken.location) {
          var ctLoc = closingToken.location, tn = this.parser.treeAdapter.getTagName(element);
          var isClosingEndTag = closingToken.type === Tokenizer.END_TAG_TOKEN && tn === closingToken.tagName;
          if (isClosingEndTag) {
            loc.endTag = Object.create(ctLoc);
            loc.endOffset = ctLoc.endOffset;
          } else
            loc.endOffset = ctLoc.startOffset;
        } else if (closingToken.type === Tokenizer.EOF_TOKEN)
          loc.endOffset = this.posTracker.offset;
      }
    };
    LocationInfoParserMixin.prototype._getOverriddenMethods = function(mxn, orig) {
      return {
        _bootstrap: function(document2, fragmentContext) {
          orig._bootstrap.call(this, document2, fragmentContext);
          mxn.lastStartTagToken = null;
          mxn.lastFosterParentingLocation = null;
          mxn.currentToken = null;
          mxn.posTracker = new PositionTrackingPreprocessorMixin(this.tokenizer.preprocessor);
          new LocationInfoTokenizerMixin(this.tokenizer);
          new LocationInfoOpenElementStackMixin(this.openElements, {
            onItemPop: function(element) {
              mxn._setEndLocation(element, mxn.currentToken);
            }
          });
        },
        _runParsingLoop: function(scriptHandler) {
          orig._runParsingLoop.call(this, scriptHandler);
          for (var i = this.openElements.stackTop; i >= 0; i--)
            mxn._setEndLocation(this.openElements.items[i], mxn.currentToken);
        },
        _processTokenInForeignContent: function(token) {
          mxn.currentToken = token;
          orig._processTokenInForeignContent.call(this, token);
        },
        _processToken: function(token) {
          mxn.currentToken = token;
          orig._processToken.call(this, token);
          var requireExplicitUpdate = token.type === Tokenizer.END_TAG_TOKEN && (token.tagName === $.HTML || token.tagName === $.BODY && this.openElements.hasInScope($.BODY));
          if (requireExplicitUpdate) {
            for (var i = this.openElements.stackTop; i >= 0; i--) {
              var element = this.openElements.items[i];
              if (this.treeAdapter.getTagName(element) === token.tagName) {
                mxn._setEndLocation(element, token);
                break;
              }
            }
          }
        },
        _setDocumentType: function(token) {
          orig._setDocumentType.call(this, token);
          var documentChildren = this.treeAdapter.getChildNodes(this.document), cnLength = documentChildren.length;
          for (var i = 0; i < cnLength; i++) {
            var node2 = documentChildren[i];
            if (this.treeAdapter.isDocumentTypeNode(node2)) {
              node2.__location = token.location;
              break;
            }
          }
        },
        _attachElementToTree: function(element) {
          mxn._setStartLocation(element);
          mxn.lastStartTagToken = null;
          orig._attachElementToTree.call(this, element);
        },
        _appendElement: function(token, namespaceURI) {
          mxn.lastStartTagToken = token;
          orig._appendElement.call(this, token, namespaceURI);
        },
        _insertElement: function(token, namespaceURI) {
          mxn.lastStartTagToken = token;
          orig._insertElement.call(this, token, namespaceURI);
        },
        _insertTemplate: function(token) {
          mxn.lastStartTagToken = token;
          orig._insertTemplate.call(this, token);
          var tmplContent = this.treeAdapter.getTemplateContent(this.openElements.current);
          tmplContent.__location = null;
        },
        _insertFakeRootElement: function() {
          orig._insertFakeRootElement.call(this);
          this.openElements.current.__location = null;
        },
        _appendCommentNode: function(token, parent) {
          orig._appendCommentNode.call(this, token, parent);
          var children = this.treeAdapter.getChildNodes(parent), commentNode = children[children.length - 1];
          commentNode.__location = token.location;
        },
        _findFosterParentingLocation: function() {
          mxn.lastFosterParentingLocation = orig._findFosterParentingLocation.call(this);
          return mxn.lastFosterParentingLocation;
        },
        _insertCharacters: function(token) {
          orig._insertCharacters.call(this, token);
          var hasFosterParent = this._shouldFosterParentOnInsertion(), parent = hasFosterParent && mxn.lastFosterParentingLocation.parent || this.openElements.currentTmplContent || this.openElements.current, siblings = this.treeAdapter.getChildNodes(parent), textNodeIdx = hasFosterParent && mxn.lastFosterParentingLocation.beforeElement ? siblings.indexOf(mxn.lastFosterParentingLocation.beforeElement) - 1 : siblings.length - 1, textNode = siblings[textNodeIdx];
          if (textNode.__location)
            textNode.__location.endOffset = token.location.endOffset;
          else
            textNode.__location = token.location;
        }
      };
    };
  });

  // node_modules/parse5/lib/tree_adapters/default.js
  var require_default = __commonJS((exports2) => {
    "use strict";
    var DOCUMENT_MODE = require_html().DOCUMENT_MODE;
    exports2.createDocument = function() {
      return {
        nodeName: "#document",
        mode: DOCUMENT_MODE.NO_QUIRKS,
        childNodes: []
      };
    };
    exports2.createDocumentFragment = function() {
      return {
        nodeName: "#document-fragment",
        childNodes: []
      };
    };
    exports2.createElement = function(tagName, namespaceURI, attrs) {
      return {
        nodeName: tagName,
        tagName,
        attrs,
        namespaceURI,
        childNodes: [],
        parentNode: null
      };
    };
    exports2.createCommentNode = function(data) {
      return {
        nodeName: "#comment",
        data,
        parentNode: null
      };
    };
    var createTextNode = function(value) {
      return {
        nodeName: "#text",
        value,
        parentNode: null
      };
    };
    var appendChild = exports2.appendChild = function(parentNode, newNode) {
      parentNode.childNodes.push(newNode);
      newNode.parentNode = parentNode;
    };
    var insertBefore = exports2.insertBefore = function(parentNode, newNode, referenceNode) {
      var insertionIdx = parentNode.childNodes.indexOf(referenceNode);
      parentNode.childNodes.splice(insertionIdx, 0, newNode);
      newNode.parentNode = parentNode;
    };
    exports2.setTemplateContent = function(templateElement, contentElement) {
      templateElement.content = contentElement;
    };
    exports2.getTemplateContent = function(templateElement) {
      return templateElement.content;
    };
    exports2.setDocumentType = function(document2, name, publicId, systemId) {
      var doctypeNode = null;
      for (var i = 0; i < document2.childNodes.length; i++) {
        if (document2.childNodes[i].nodeName === "#documentType") {
          doctypeNode = document2.childNodes[i];
          break;
        }
      }
      if (doctypeNode) {
        doctypeNode.name = name;
        doctypeNode.publicId = publicId;
        doctypeNode.systemId = systemId;
      } else {
        appendChild(document2, {
          nodeName: "#documentType",
          name,
          publicId,
          systemId
        });
      }
    };
    exports2.setDocumentMode = function(document2, mode) {
      document2.mode = mode;
    };
    exports2.getDocumentMode = function(document2) {
      return document2.mode;
    };
    exports2.detachNode = function(node2) {
      if (node2.parentNode) {
        var idx = node2.parentNode.childNodes.indexOf(node2);
        node2.parentNode.childNodes.splice(idx, 1);
        node2.parentNode = null;
      }
    };
    exports2.insertText = function(parentNode, text) {
      if (parentNode.childNodes.length) {
        var prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];
        if (prevNode.nodeName === "#text") {
          prevNode.value += text;
          return;
        }
      }
      appendChild(parentNode, createTextNode(text));
    };
    exports2.insertTextBefore = function(parentNode, text, referenceNode) {
      var prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
      if (prevNode && prevNode.nodeName === "#text")
        prevNode.value += text;
      else
        insertBefore(parentNode, createTextNode(text), referenceNode);
    };
    exports2.adoptAttributes = function(recipient, attrs) {
      var recipientAttrsMap = [];
      for (var i = 0; i < recipient.attrs.length; i++)
        recipientAttrsMap.push(recipient.attrs[i].name);
      for (var j = 0; j < attrs.length; j++) {
        if (recipientAttrsMap.indexOf(attrs[j].name) === -1)
          recipient.attrs.push(attrs[j]);
      }
    };
    exports2.getFirstChild = function(node2) {
      return node2.childNodes[0];
    };
    exports2.getChildNodes = function(node2) {
      return node2.childNodes;
    };
    exports2.getParentNode = function(node2) {
      return node2.parentNode;
    };
    exports2.getAttrList = function(element) {
      return element.attrs;
    };
    exports2.getTagName = function(element) {
      return element.tagName;
    };
    exports2.getNamespaceURI = function(element) {
      return element.namespaceURI;
    };
    exports2.getTextNodeContent = function(textNode) {
      return textNode.value;
    };
    exports2.getCommentNodeContent = function(commentNode) {
      return commentNode.data;
    };
    exports2.getDocumentTypeNodeName = function(doctypeNode) {
      return doctypeNode.name;
    };
    exports2.getDocumentTypeNodePublicId = function(doctypeNode) {
      return doctypeNode.publicId;
    };
    exports2.getDocumentTypeNodeSystemId = function(doctypeNode) {
      return doctypeNode.systemId;
    };
    exports2.isTextNode = function(node2) {
      return node2.nodeName === "#text";
    };
    exports2.isCommentNode = function(node2) {
      return node2.nodeName === "#comment";
    };
    exports2.isDocumentTypeNode = function(node2) {
      return node2.nodeName === "#documentType";
    };
    exports2.isElementNode = function(node2) {
      return !!node2.tagName;
    };
  });

  // node_modules/parse5/lib/utils/merge_options.js
  var require_merge_options = __commonJS((exports2, module2) => {
    "use strict";
    module2.exports = function mergeOptions(defaults, options) {
      options = options || Object.create(null);
      return [defaults, options].reduce(function(merged, optObj) {
        Object.keys(optObj).forEach(function(key) {
          merged[key] = optObj[key];
        });
        return merged;
      }, Object.create(null));
    };
  });

  // node_modules/parse5/lib/common/doctype.js
  var require_doctype = __commonJS((exports2) => {
    "use strict";
    var DOCUMENT_MODE = require_html().DOCUMENT_MODE;
    var VALID_DOCTYPE_NAME = "html";
    var QUIRKS_MODE_SYSTEM_ID = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd";
    var QUIRKS_MODE_PUBLIC_ID_PREFIXES = [
      "+//silmaril//dtd html pro v0r11 19970101//en",
      "-//advasoft ltd//dtd html 3.0 aswedit + extensions//en",
      "-//as//dtd html 3.0 aswedit + extensions//en",
      "-//ietf//dtd html 2.0 level 1//en",
      "-//ietf//dtd html 2.0 level 2//en",
      "-//ietf//dtd html 2.0 strict level 1//en",
      "-//ietf//dtd html 2.0 strict level 2//en",
      "-//ietf//dtd html 2.0 strict//en",
      "-//ietf//dtd html 2.0//en",
      "-//ietf//dtd html 2.1e//en",
      "-//ietf//dtd html 3.0//en",
      "-//ietf//dtd html 3.0//en//",
      "-//ietf//dtd html 3.2 final//en",
      "-//ietf//dtd html 3.2//en",
      "-//ietf//dtd html 3//en",
      "-//ietf//dtd html level 0//en",
      "-//ietf//dtd html level 0//en//2.0",
      "-//ietf//dtd html level 1//en",
      "-//ietf//dtd html level 1//en//2.0",
      "-//ietf//dtd html level 2//en",
      "-//ietf//dtd html level 2//en//2.0",
      "-//ietf//dtd html level 3//en",
      "-//ietf//dtd html level 3//en//3.0",
      "-//ietf//dtd html strict level 0//en",
      "-//ietf//dtd html strict level 0//en//2.0",
      "-//ietf//dtd html strict level 1//en",
      "-//ietf//dtd html strict level 1//en//2.0",
      "-//ietf//dtd html strict level 2//en",
      "-//ietf//dtd html strict level 2//en//2.0",
      "-//ietf//dtd html strict level 3//en",
      "-//ietf//dtd html strict level 3//en//3.0",
      "-//ietf//dtd html strict//en",
      "-//ietf//dtd html strict//en//2.0",
      "-//ietf//dtd html strict//en//3.0",
      "-//ietf//dtd html//en",
      "-//ietf//dtd html//en//2.0",
      "-//ietf//dtd html//en//3.0",
      "-//metrius//dtd metrius presentational//en",
      "-//microsoft//dtd internet explorer 2.0 html strict//en",
      "-//microsoft//dtd internet explorer 2.0 html//en",
      "-//microsoft//dtd internet explorer 2.0 tables//en",
      "-//microsoft//dtd internet explorer 3.0 html strict//en",
      "-//microsoft//dtd internet explorer 3.0 html//en",
      "-//microsoft//dtd internet explorer 3.0 tables//en",
      "-//netscape comm. corp.//dtd html//en",
      "-//netscape comm. corp.//dtd strict html//en",
      "-//o'reilly and associates//dtd html 2.0//en",
      "-//o'reilly and associates//dtd html extended 1.0//en",
      "-//spyglass//dtd html 2.0 extended//en",
      "-//sq//dtd html 2.0 hotmetal + extensions//en",
      "-//sun microsystems corp.//dtd hotjava html//en",
      "-//sun microsystems corp.//dtd hotjava strict html//en",
      "-//w3c//dtd html 3 1995-03-24//en",
      "-//w3c//dtd html 3.2 draft//en",
      "-//w3c//dtd html 3.2 final//en",
      "-//w3c//dtd html 3.2//en",
      "-//w3c//dtd html 3.2s draft//en",
      "-//w3c//dtd html 4.0 frameset//en",
      "-//w3c//dtd html 4.0 transitional//en",
      "-//w3c//dtd html experimental 19960712//en",
      "-//w3c//dtd html experimental 970421//en",
      "-//w3c//dtd w3 html//en",
      "-//w3o//dtd w3 html 3.0//en",
      "-//w3o//dtd w3 html 3.0//en//",
      "-//webtechs//dtd mozilla html 2.0//en",
      "-//webtechs//dtd mozilla html//en"
    ];
    var QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES = QUIRKS_MODE_PUBLIC_ID_PREFIXES.concat([
      "-//w3c//dtd html 4.01 frameset//",
      "-//w3c//dtd html 4.01 transitional//"
    ]);
    var QUIRKS_MODE_PUBLIC_IDS = [
      "-//w3o//dtd w3 html strict 3.0//en//",
      "-/w3c/dtd html 4.0 transitional/en",
      "html"
    ];
    var LIMITED_QUIRKS_PUBLIC_ID_PREFIXES = [
      "-//W3C//DTD XHTML 1.0 Frameset//",
      "-//W3C//DTD XHTML 1.0 Transitional//"
    ];
    var LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES = LIMITED_QUIRKS_PUBLIC_ID_PREFIXES.concat([
      "-//W3C//DTD HTML 4.01 Frameset//",
      "-//W3C//DTD HTML 4.01 Transitional//"
    ]);
    function enquoteDoctypeId(id) {
      var quote = id.indexOf('"') !== -1 ? "'" : '"';
      return quote + id + quote;
    }
    function hasPrefix(publicId, prefixes) {
      for (var i = 0; i < prefixes.length; i++) {
        if (publicId.indexOf(prefixes[i]) === 0)
          return true;
      }
      return false;
    }
    exports2.getDocumentMode = function(name, publicId, systemId) {
      if (name !== VALID_DOCTYPE_NAME)
        return DOCUMENT_MODE.QUIRKS;
      if (systemId && systemId.toLowerCase() === QUIRKS_MODE_SYSTEM_ID)
        return DOCUMENT_MODE.QUIRKS;
      if (publicId !== null) {
        publicId = publicId.toLowerCase();
        if (QUIRKS_MODE_PUBLIC_IDS.indexOf(publicId) > -1)
          return DOCUMENT_MODE.QUIRKS;
        var prefixes = systemId === null ? QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES : QUIRKS_MODE_PUBLIC_ID_PREFIXES;
        if (hasPrefix(publicId, prefixes))
          return DOCUMENT_MODE.QUIRKS;
        prefixes = systemId === null ? LIMITED_QUIRKS_PUBLIC_ID_PREFIXES : LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES;
        if (hasPrefix(publicId, prefixes))
          return DOCUMENT_MODE.LIMITED_QUIRKS;
      }
      return DOCUMENT_MODE.NO_QUIRKS;
    };
    exports2.serializeContent = function(name, publicId, systemId) {
      var str = "!DOCTYPE ";
      if (name)
        str += name;
      if (publicId !== null)
        str += " PUBLIC " + enquoteDoctypeId(publicId);
      else if (systemId !== null)
        str += " SYSTEM";
      if (systemId !== null)
        str += " " + enquoteDoctypeId(systemId);
      return str;
    };
  });

  // node_modules/parse5/lib/common/foreign_content.js
  var require_foreign_content = __commonJS((exports2) => {
    "use strict";
    var Tokenizer = require_tokenizer();
    var HTML = require_html();
    var $ = HTML.TAG_NAMES;
    var NS = HTML.NAMESPACES;
    var ATTRS = HTML.ATTRS;
    var MIME_TYPES = {
      TEXT_HTML: "text/html",
      APPLICATION_XML: "application/xhtml+xml"
    };
    var DEFINITION_URL_ATTR = "definitionurl";
    var ADJUSTED_DEFINITION_URL_ATTR = "definitionURL";
    var SVG_ATTRS_ADJUSTMENT_MAP = {
      attributename: "attributeName",
      attributetype: "attributeType",
      basefrequency: "baseFrequency",
      baseprofile: "baseProfile",
      calcmode: "calcMode",
      clippathunits: "clipPathUnits",
      diffuseconstant: "diffuseConstant",
      edgemode: "edgeMode",
      filterunits: "filterUnits",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      limitingconeangle: "limitingConeAngle",
      markerheight: "markerHeight",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      numoctaves: "numOctaves",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      refx: "refX",
      refy: "refY",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stitchtiles: "stitchTiles",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textlength: "textLength",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      xchannelselector: "xChannelSelector",
      ychannelselector: "yChannelSelector",
      zoomandpan: "zoomAndPan"
    };
    var XML_ATTRS_ADJUSTMENT_MAP = {
      "xlink:actuate": {prefix: "xlink", name: "actuate", namespace: NS.XLINK},
      "xlink:arcrole": {prefix: "xlink", name: "arcrole", namespace: NS.XLINK},
      "xlink:href": {prefix: "xlink", name: "href", namespace: NS.XLINK},
      "xlink:role": {prefix: "xlink", name: "role", namespace: NS.XLINK},
      "xlink:show": {prefix: "xlink", name: "show", namespace: NS.XLINK},
      "xlink:title": {prefix: "xlink", name: "title", namespace: NS.XLINK},
      "xlink:type": {prefix: "xlink", name: "type", namespace: NS.XLINK},
      "xml:base": {prefix: "xml", name: "base", namespace: NS.XML},
      "xml:lang": {prefix: "xml", name: "lang", namespace: NS.XML},
      "xml:space": {prefix: "xml", name: "space", namespace: NS.XML},
      xmlns: {prefix: "", name: "xmlns", namespace: NS.XMLNS},
      "xmlns:xlink": {prefix: "xmlns", name: "xlink", namespace: NS.XMLNS}
    };
    var SVG_TAG_NAMES_ADJUSTMENT_MAP = exports2.SVG_TAG_NAMES_ADJUSTMENT_MAP = {
      altglyph: "altGlyph",
      altglyphdef: "altGlyphDef",
      altglyphitem: "altGlyphItem",
      animatecolor: "animateColor",
      animatemotion: "animateMotion",
      animatetransform: "animateTransform",
      clippath: "clipPath",
      feblend: "feBlend",
      fecolormatrix: "feColorMatrix",
      fecomponenttransfer: "feComponentTransfer",
      fecomposite: "feComposite",
      feconvolvematrix: "feConvolveMatrix",
      fediffuselighting: "feDiffuseLighting",
      fedisplacementmap: "feDisplacementMap",
      fedistantlight: "feDistantLight",
      feflood: "feFlood",
      fefunca: "feFuncA",
      fefuncb: "feFuncB",
      fefuncg: "feFuncG",
      fefuncr: "feFuncR",
      fegaussianblur: "feGaussianBlur",
      feimage: "feImage",
      femerge: "feMerge",
      femergenode: "feMergeNode",
      femorphology: "feMorphology",
      feoffset: "feOffset",
      fepointlight: "fePointLight",
      fespecularlighting: "feSpecularLighting",
      fespotlight: "feSpotLight",
      fetile: "feTile",
      feturbulence: "feTurbulence",
      foreignobject: "foreignObject",
      glyphref: "glyphRef",
      lineargradient: "linearGradient",
      radialgradient: "radialGradient",
      textpath: "textPath"
    };
    var EXITS_FOREIGN_CONTENT = Object.create(null);
    EXITS_FOREIGN_CONTENT[$.B] = true;
    EXITS_FOREIGN_CONTENT[$.BIG] = true;
    EXITS_FOREIGN_CONTENT[$.BLOCKQUOTE] = true;
    EXITS_FOREIGN_CONTENT[$.BODY] = true;
    EXITS_FOREIGN_CONTENT[$.BR] = true;
    EXITS_FOREIGN_CONTENT[$.CENTER] = true;
    EXITS_FOREIGN_CONTENT[$.CODE] = true;
    EXITS_FOREIGN_CONTENT[$.DD] = true;
    EXITS_FOREIGN_CONTENT[$.DIV] = true;
    EXITS_FOREIGN_CONTENT[$.DL] = true;
    EXITS_FOREIGN_CONTENT[$.DT] = true;
    EXITS_FOREIGN_CONTENT[$.EM] = true;
    EXITS_FOREIGN_CONTENT[$.EMBED] = true;
    EXITS_FOREIGN_CONTENT[$.H1] = true;
    EXITS_FOREIGN_CONTENT[$.H2] = true;
    EXITS_FOREIGN_CONTENT[$.H3] = true;
    EXITS_FOREIGN_CONTENT[$.H4] = true;
    EXITS_FOREIGN_CONTENT[$.H5] = true;
    EXITS_FOREIGN_CONTENT[$.H6] = true;
    EXITS_FOREIGN_CONTENT[$.HEAD] = true;
    EXITS_FOREIGN_CONTENT[$.HR] = true;
    EXITS_FOREIGN_CONTENT[$.I] = true;
    EXITS_FOREIGN_CONTENT[$.IMG] = true;
    EXITS_FOREIGN_CONTENT[$.LI] = true;
    EXITS_FOREIGN_CONTENT[$.LISTING] = true;
    EXITS_FOREIGN_CONTENT[$.MENU] = true;
    EXITS_FOREIGN_CONTENT[$.META] = true;
    EXITS_FOREIGN_CONTENT[$.NOBR] = true;
    EXITS_FOREIGN_CONTENT[$.OL] = true;
    EXITS_FOREIGN_CONTENT[$.P] = true;
    EXITS_FOREIGN_CONTENT[$.PRE] = true;
    EXITS_FOREIGN_CONTENT[$.RUBY] = true;
    EXITS_FOREIGN_CONTENT[$.S] = true;
    EXITS_FOREIGN_CONTENT[$.SMALL] = true;
    EXITS_FOREIGN_CONTENT[$.SPAN] = true;
    EXITS_FOREIGN_CONTENT[$.STRONG] = true;
    EXITS_FOREIGN_CONTENT[$.STRIKE] = true;
    EXITS_FOREIGN_CONTENT[$.SUB] = true;
    EXITS_FOREIGN_CONTENT[$.SUP] = true;
    EXITS_FOREIGN_CONTENT[$.TABLE] = true;
    EXITS_FOREIGN_CONTENT[$.TT] = true;
    EXITS_FOREIGN_CONTENT[$.U] = true;
    EXITS_FOREIGN_CONTENT[$.UL] = true;
    EXITS_FOREIGN_CONTENT[$.VAR] = true;
    exports2.causesExit = function(startTagToken) {
      var tn = startTagToken.tagName;
      var isFontWithAttrs = tn === $.FONT && (Tokenizer.getTokenAttr(startTagToken, ATTRS.COLOR) !== null || Tokenizer.getTokenAttr(startTagToken, ATTRS.SIZE) !== null || Tokenizer.getTokenAttr(startTagToken, ATTRS.FACE) !== null);
      return isFontWithAttrs ? true : EXITS_FOREIGN_CONTENT[tn];
    };
    exports2.adjustTokenMathMLAttrs = function(token) {
      for (var i = 0; i < token.attrs.length; i++) {
        if (token.attrs[i].name === DEFINITION_URL_ATTR) {
          token.attrs[i].name = ADJUSTED_DEFINITION_URL_ATTR;
          break;
        }
      }
    };
    exports2.adjustTokenSVGAttrs = function(token) {
      for (var i = 0; i < token.attrs.length; i++) {
        var adjustedAttrName = SVG_ATTRS_ADJUSTMENT_MAP[token.attrs[i].name];
        if (adjustedAttrName)
          token.attrs[i].name = adjustedAttrName;
      }
    };
    exports2.adjustTokenXMLAttrs = function(token) {
      for (var i = 0; i < token.attrs.length; i++) {
        var adjustedAttrEntry = XML_ATTRS_ADJUSTMENT_MAP[token.attrs[i].name];
        if (adjustedAttrEntry) {
          token.attrs[i].prefix = adjustedAttrEntry.prefix;
          token.attrs[i].name = adjustedAttrEntry.name;
          token.attrs[i].namespace = adjustedAttrEntry.namespace;
        }
      }
    };
    exports2.adjustTokenSVGTagName = function(token) {
      var adjustedTagName = SVG_TAG_NAMES_ADJUSTMENT_MAP[token.tagName];
      if (adjustedTagName)
        token.tagName = adjustedTagName;
    };
    function isMathMLTextIntegrationPoint(tn, ns) {
      return ns === NS.MATHML && (tn === $.MI || tn === $.MO || tn === $.MN || tn === $.MS || tn === $.MTEXT);
    }
    function isHtmlIntegrationPoint(tn, ns, attrs) {
      if (ns === NS.MATHML && tn === $.ANNOTATION_XML) {
        for (var i = 0; i < attrs.length; i++) {
          if (attrs[i].name === ATTRS.ENCODING) {
            var value = attrs[i].value.toLowerCase();
            return value === MIME_TYPES.TEXT_HTML || value === MIME_TYPES.APPLICATION_XML;
          }
        }
      }
      return ns === NS.SVG && (tn === $.FOREIGN_OBJECT || tn === $.DESC || tn === $.TITLE);
    }
    exports2.isIntegrationPoint = function(tn, ns, attrs, foreignNS) {
      if ((!foreignNS || foreignNS === NS.HTML) && isHtmlIntegrationPoint(tn, ns, attrs))
        return true;
      if ((!foreignNS || foreignNS === NS.MATHML) && isMathMLTextIntegrationPoint(tn, ns))
        return true;
      return false;
    };
  });

  // node_modules/parse5/lib/parser/index.js
  var require_parser = __commonJS((exports2, module2) => {
    "use strict";
    var Tokenizer = require_tokenizer();
    var OpenElementStack = require_open_element_stack();
    var FormattingElementList = require_formatting_element_list();
    var LocationInfoParserMixin = require_parser_mixin();
    var defaultTreeAdapter = require_default();
    var mergeOptions = require_merge_options();
    var doctype = require_doctype();
    var foreignContent = require_foreign_content();
    var UNICODE = require_unicode();
    var HTML = require_html();
    var $ = HTML.TAG_NAMES;
    var NS = HTML.NAMESPACES;
    var ATTRS = HTML.ATTRS;
    var DEFAULT_OPTIONS = {
      locationInfo: false,
      treeAdapter: defaultTreeAdapter
    };
    var HIDDEN_INPUT_TYPE = "hidden";
    var AA_OUTER_LOOP_ITER = 8;
    var AA_INNER_LOOP_ITER = 3;
    var INITIAL_MODE = "INITIAL_MODE";
    var BEFORE_HTML_MODE = "BEFORE_HTML_MODE";
    var BEFORE_HEAD_MODE = "BEFORE_HEAD_MODE";
    var IN_HEAD_MODE = "IN_HEAD_MODE";
    var AFTER_HEAD_MODE = "AFTER_HEAD_MODE";
    var IN_BODY_MODE = "IN_BODY_MODE";
    var TEXT_MODE = "TEXT_MODE";
    var IN_TABLE_MODE = "IN_TABLE_MODE";
    var IN_TABLE_TEXT_MODE = "IN_TABLE_TEXT_MODE";
    var IN_CAPTION_MODE = "IN_CAPTION_MODE";
    var IN_COLUMN_GROUP_MODE = "IN_COLUMN_GROUP_MODE";
    var IN_TABLE_BODY_MODE = "IN_TABLE_BODY_MODE";
    var IN_ROW_MODE = "IN_ROW_MODE";
    var IN_CELL_MODE = "IN_CELL_MODE";
    var IN_SELECT_MODE = "IN_SELECT_MODE";
    var IN_SELECT_IN_TABLE_MODE = "IN_SELECT_IN_TABLE_MODE";
    var IN_TEMPLATE_MODE = "IN_TEMPLATE_MODE";
    var AFTER_BODY_MODE = "AFTER_BODY_MODE";
    var IN_FRAMESET_MODE = "IN_FRAMESET_MODE";
    var AFTER_FRAMESET_MODE = "AFTER_FRAMESET_MODE";
    var AFTER_AFTER_BODY_MODE = "AFTER_AFTER_BODY_MODE";
    var AFTER_AFTER_FRAMESET_MODE = "AFTER_AFTER_FRAMESET_MODE";
    var INSERTION_MODE_RESET_MAP = Object.create(null);
    INSERTION_MODE_RESET_MAP[$.TR] = IN_ROW_MODE;
    INSERTION_MODE_RESET_MAP[$.TBODY] = INSERTION_MODE_RESET_MAP[$.THEAD] = INSERTION_MODE_RESET_MAP[$.TFOOT] = IN_TABLE_BODY_MODE;
    INSERTION_MODE_RESET_MAP[$.CAPTION] = IN_CAPTION_MODE;
    INSERTION_MODE_RESET_MAP[$.COLGROUP] = IN_COLUMN_GROUP_MODE;
    INSERTION_MODE_RESET_MAP[$.TABLE] = IN_TABLE_MODE;
    INSERTION_MODE_RESET_MAP[$.BODY] = IN_BODY_MODE;
    INSERTION_MODE_RESET_MAP[$.FRAMESET] = IN_FRAMESET_MODE;
    var TEMPLATE_INSERTION_MODE_SWITCH_MAP = Object.create(null);
    TEMPLATE_INSERTION_MODE_SWITCH_MAP[$.CAPTION] = TEMPLATE_INSERTION_MODE_SWITCH_MAP[$.COLGROUP] = TEMPLATE_INSERTION_MODE_SWITCH_MAP[$.TBODY] = TEMPLATE_INSERTION_MODE_SWITCH_MAP[$.TFOOT] = TEMPLATE_INSERTION_MODE_SWITCH_MAP[$.THEAD] = IN_TABLE_MODE;
    TEMPLATE_INSERTION_MODE_SWITCH_MAP[$.COL] = IN_COLUMN_GROUP_MODE;
    TEMPLATE_INSERTION_MODE_SWITCH_MAP[$.TR] = IN_TABLE_BODY_MODE;
    TEMPLATE_INSERTION_MODE_SWITCH_MAP[$.TD] = TEMPLATE_INSERTION_MODE_SWITCH_MAP[$.TH] = IN_ROW_MODE;
    var _ = Object.create(null);
    _[INITIAL_MODE] = Object.create(null);
    _[INITIAL_MODE][Tokenizer.CHARACTER_TOKEN] = _[INITIAL_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = tokenInInitialMode;
    _[INITIAL_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = ignoreToken;
    _[INITIAL_MODE][Tokenizer.COMMENT_TOKEN] = appendComment;
    _[INITIAL_MODE][Tokenizer.DOCTYPE_TOKEN] = doctypeInInitialMode;
    _[INITIAL_MODE][Tokenizer.START_TAG_TOKEN] = _[INITIAL_MODE][Tokenizer.END_TAG_TOKEN] = _[INITIAL_MODE][Tokenizer.EOF_TOKEN] = tokenInInitialMode;
    _[BEFORE_HTML_MODE] = Object.create(null);
    _[BEFORE_HTML_MODE][Tokenizer.CHARACTER_TOKEN] = _[BEFORE_HTML_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = tokenBeforeHtml;
    _[BEFORE_HTML_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = ignoreToken;
    _[BEFORE_HTML_MODE][Tokenizer.COMMENT_TOKEN] = appendComment;
    _[BEFORE_HTML_MODE][Tokenizer.DOCTYPE_TOKEN] = ignoreToken;
    _[BEFORE_HTML_MODE][Tokenizer.START_TAG_TOKEN] = startTagBeforeHtml;
    _[BEFORE_HTML_MODE][Tokenizer.END_TAG_TOKEN] = endTagBeforeHtml;
    _[BEFORE_HTML_MODE][Tokenizer.EOF_TOKEN] = tokenBeforeHtml;
    _[BEFORE_HEAD_MODE] = Object.create(null);
    _[BEFORE_HEAD_MODE][Tokenizer.CHARACTER_TOKEN] = _[BEFORE_HEAD_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = tokenBeforeHead;
    _[BEFORE_HEAD_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = ignoreToken;
    _[BEFORE_HEAD_MODE][Tokenizer.COMMENT_TOKEN] = appendComment;
    _[BEFORE_HEAD_MODE][Tokenizer.DOCTYPE_TOKEN] = ignoreToken;
    _[BEFORE_HEAD_MODE][Tokenizer.START_TAG_TOKEN] = startTagBeforeHead;
    _[BEFORE_HEAD_MODE][Tokenizer.END_TAG_TOKEN] = endTagBeforeHead;
    _[BEFORE_HEAD_MODE][Tokenizer.EOF_TOKEN] = tokenBeforeHead;
    _[IN_HEAD_MODE] = Object.create(null);
    _[IN_HEAD_MODE][Tokenizer.CHARACTER_TOKEN] = _[IN_HEAD_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = tokenInHead;
    _[IN_HEAD_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = insertCharacters;
    _[IN_HEAD_MODE][Tokenizer.COMMENT_TOKEN] = appendComment;
    _[IN_HEAD_MODE][Tokenizer.DOCTYPE_TOKEN] = ignoreToken;
    _[IN_HEAD_MODE][Tokenizer.START_TAG_TOKEN] = startTagInHead;
    _[IN_HEAD_MODE][Tokenizer.END_TAG_TOKEN] = endTagInHead;
    _[IN_HEAD_MODE][Tokenizer.EOF_TOKEN] = tokenInHead;
    _[AFTER_HEAD_MODE] = Object.create(null);
    _[AFTER_HEAD_MODE][Tokenizer.CHARACTER_TOKEN] = _[AFTER_HEAD_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = tokenAfterHead;
    _[AFTER_HEAD_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = insertCharacters;
    _[AFTER_HEAD_MODE][Tokenizer.COMMENT_TOKEN] = appendComment;
    _[AFTER_HEAD_MODE][Tokenizer.DOCTYPE_TOKEN] = ignoreToken;
    _[AFTER_HEAD_MODE][Tokenizer.START_TAG_TOKEN] = startTagAfterHead;
    _[AFTER_HEAD_MODE][Tokenizer.END_TAG_TOKEN] = endTagAfterHead;
    _[AFTER_HEAD_MODE][Tokenizer.EOF_TOKEN] = tokenAfterHead;
    _[IN_BODY_MODE] = Object.create(null);
    _[IN_BODY_MODE][Tokenizer.CHARACTER_TOKEN] = characterInBody;
    _[IN_BODY_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = ignoreToken;
    _[IN_BODY_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = whitespaceCharacterInBody;
    _[IN_BODY_MODE][Tokenizer.COMMENT_TOKEN] = appendComment;
    _[IN_BODY_MODE][Tokenizer.DOCTYPE_TOKEN] = ignoreToken;
    _[IN_BODY_MODE][Tokenizer.START_TAG_TOKEN] = startTagInBody;
    _[IN_BODY_MODE][Tokenizer.END_TAG_TOKEN] = endTagInBody;
    _[IN_BODY_MODE][Tokenizer.EOF_TOKEN] = eofInBody;
    _[TEXT_MODE] = Object.create(null);
    _[TEXT_MODE][Tokenizer.CHARACTER_TOKEN] = _[TEXT_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = _[TEXT_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = insertCharacters;
    _[TEXT_MODE][Tokenizer.COMMENT_TOKEN] = _[TEXT_MODE][Tokenizer.DOCTYPE_TOKEN] = _[TEXT_MODE][Tokenizer.START_TAG_TOKEN] = ignoreToken;
    _[TEXT_MODE][Tokenizer.END_TAG_TOKEN] = endTagInText;
    _[TEXT_MODE][Tokenizer.EOF_TOKEN] = eofInText;
    _[IN_TABLE_MODE] = Object.create(null);
    _[IN_TABLE_MODE][Tokenizer.CHARACTER_TOKEN] = _[IN_TABLE_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = _[IN_TABLE_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = characterInTable;
    _[IN_TABLE_MODE][Tokenizer.COMMENT_TOKEN] = appendComment;
    _[IN_TABLE_MODE][Tokenizer.DOCTYPE_TOKEN] = ignoreToken;
    _[IN_TABLE_MODE][Tokenizer.START_TAG_TOKEN] = startTagInTable;
    _[IN_TABLE_MODE][Tokenizer.END_TAG_TOKEN] = endTagInTable;
    _[IN_TABLE_MODE][Tokenizer.EOF_TOKEN] = eofInBody;
    _[IN_TABLE_TEXT_MODE] = Object.create(null);
    _[IN_TABLE_TEXT_MODE][Tokenizer.CHARACTER_TOKEN] = characterInTableText;
    _[IN_TABLE_TEXT_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = ignoreToken;
    _[IN_TABLE_TEXT_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = whitespaceCharacterInTableText;
    _[IN_TABLE_TEXT_MODE][Tokenizer.COMMENT_TOKEN] = _[IN_TABLE_TEXT_MODE][Tokenizer.DOCTYPE_TOKEN] = _[IN_TABLE_TEXT_MODE][Tokenizer.START_TAG_TOKEN] = _[IN_TABLE_TEXT_MODE][Tokenizer.END_TAG_TOKEN] = _[IN_TABLE_TEXT_MODE][Tokenizer.EOF_TOKEN] = tokenInTableText;
    _[IN_CAPTION_MODE] = Object.create(null);
    _[IN_CAPTION_MODE][Tokenizer.CHARACTER_TOKEN] = characterInBody;
    _[IN_CAPTION_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = ignoreToken;
    _[IN_CAPTION_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = whitespaceCharacterInBody;
    _[IN_CAPTION_MODE][Tokenizer.COMMENT_TOKEN] = appendComment;
    _[IN_CAPTION_MODE][Tokenizer.DOCTYPE_TOKEN] = ignoreToken;
    _[IN_CAPTION_MODE][Tokenizer.START_TAG_TOKEN] = startTagInCaption;
    _[IN_CAPTION_MODE][Tokenizer.END_TAG_TOKEN] = endTagInCaption;
    _[IN_CAPTION_MODE][Tokenizer.EOF_TOKEN] = eofInBody;
    _[IN_COLUMN_GROUP_MODE] = Object.create(null);
    _[IN_COLUMN_GROUP_MODE][Tokenizer.CHARACTER_TOKEN] = _[IN_COLUMN_GROUP_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = tokenInColumnGroup;
    _[IN_COLUMN_GROUP_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = insertCharacters;
    _[IN_COLUMN_GROUP_MODE][Tokenizer.COMMENT_TOKEN] = appendComment;
    _[IN_COLUMN_GROUP_MODE][Tokenizer.DOCTYPE_TOKEN] = ignoreToken;
    _[IN_COLUMN_GROUP_MODE][Tokenizer.START_TAG_TOKEN] = startTagInColumnGroup;
    _[IN_COLUMN_GROUP_MODE][Tokenizer.END_TAG_TOKEN] = endTagInColumnGroup;
    _[IN_COLUMN_GROUP_MODE][Tokenizer.EOF_TOKEN] = eofInBody;
    _[IN_TABLE_BODY_MODE] = Object.create(null);
    _[IN_TABLE_BODY_MODE][Tokenizer.CHARACTER_TOKEN] = _[IN_TABLE_BODY_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = _[IN_TABLE_BODY_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = characterInTable;
    _[IN_TABLE_BODY_MODE][Tokenizer.COMMENT_TOKEN] = appendComment;
    _[IN_TABLE_BODY_MODE][Tokenizer.DOCTYPE_TOKEN] = ignoreToken;
    _[IN_TABLE_BODY_MODE][Tokenizer.START_TAG_TOKEN] = startTagInTableBody;
    _[IN_TABLE_BODY_MODE][Tokenizer.END_TAG_TOKEN] = endTagInTableBody;
    _[IN_TABLE_BODY_MODE][Tokenizer.EOF_TOKEN] = eofInBody;
    _[IN_ROW_MODE] = Object.create(null);
    _[IN_ROW_MODE][Tokenizer.CHARACTER_TOKEN] = _[IN_ROW_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = _[IN_ROW_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = characterInTable;
    _[IN_ROW_MODE][Tokenizer.COMMENT_TOKEN] = appendComment;
    _[IN_ROW_MODE][Tokenizer.DOCTYPE_TOKEN] = ignoreToken;
    _[IN_ROW_MODE][Tokenizer.START_TAG_TOKEN] = startTagInRow;
    _[IN_ROW_MODE][Tokenizer.END_TAG_TOKEN] = endTagInRow;
    _[IN_ROW_MODE][Tokenizer.EOF_TOKEN] = eofInBody;
    _[IN_CELL_MODE] = Object.create(null);
    _[IN_CELL_MODE][Tokenizer.CHARACTER_TOKEN] = characterInBody;
    _[IN_CELL_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = ignoreToken;
    _[IN_CELL_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = whitespaceCharacterInBody;
    _[IN_CELL_MODE][Tokenizer.COMMENT_TOKEN] = appendComment;
    _[IN_CELL_MODE][Tokenizer.DOCTYPE_TOKEN] = ignoreToken;
    _[IN_CELL_MODE][Tokenizer.START_TAG_TOKEN] = startTagInCell;
    _[IN_CELL_MODE][Tokenizer.END_TAG_TOKEN] = endTagInCell;
    _[IN_CELL_MODE][Tokenizer.EOF_TOKEN] = eofInBody;
    _[IN_SELECT_MODE] = Object.create(null);
    _[IN_SELECT_MODE][Tokenizer.CHARACTER_TOKEN] = insertCharacters;
    _[IN_SELECT_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = ignoreToken;
    _[IN_SELECT_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = insertCharacters;
    _[IN_SELECT_MODE][Tokenizer.COMMENT_TOKEN] = appendComment;
    _[IN_SELECT_MODE][Tokenizer.DOCTYPE_TOKEN] = ignoreToken;
    _[IN_SELECT_MODE][Tokenizer.START_TAG_TOKEN] = startTagInSelect;
    _[IN_SELECT_MODE][Tokenizer.END_TAG_TOKEN] = endTagInSelect;
    _[IN_SELECT_MODE][Tokenizer.EOF_TOKEN] = eofInBody;
    _[IN_SELECT_IN_TABLE_MODE] = Object.create(null);
    _[IN_SELECT_IN_TABLE_MODE][Tokenizer.CHARACTER_TOKEN] = insertCharacters;
    _[IN_SELECT_IN_TABLE_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = ignoreToken;
    _[IN_SELECT_IN_TABLE_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = insertCharacters;
    _[IN_SELECT_IN_TABLE_MODE][Tokenizer.COMMENT_TOKEN] = appendComment;
    _[IN_SELECT_IN_TABLE_MODE][Tokenizer.DOCTYPE_TOKEN] = ignoreToken;
    _[IN_SELECT_IN_TABLE_MODE][Tokenizer.START_TAG_TOKEN] = startTagInSelectInTable;
    _[IN_SELECT_IN_TABLE_MODE][Tokenizer.END_TAG_TOKEN] = endTagInSelectInTable;
    _[IN_SELECT_IN_TABLE_MODE][Tokenizer.EOF_TOKEN] = eofInBody;
    _[IN_TEMPLATE_MODE] = Object.create(null);
    _[IN_TEMPLATE_MODE][Tokenizer.CHARACTER_TOKEN] = characterInBody;
    _[IN_TEMPLATE_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = ignoreToken;
    _[IN_TEMPLATE_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = whitespaceCharacterInBody;
    _[IN_TEMPLATE_MODE][Tokenizer.COMMENT_TOKEN] = appendComment;
    _[IN_TEMPLATE_MODE][Tokenizer.DOCTYPE_TOKEN] = ignoreToken;
    _[IN_TEMPLATE_MODE][Tokenizer.START_TAG_TOKEN] = startTagInTemplate;
    _[IN_TEMPLATE_MODE][Tokenizer.END_TAG_TOKEN] = endTagInTemplate;
    _[IN_TEMPLATE_MODE][Tokenizer.EOF_TOKEN] = eofInTemplate;
    _[AFTER_BODY_MODE] = Object.create(null);
    _[AFTER_BODY_MODE][Tokenizer.CHARACTER_TOKEN] = _[AFTER_BODY_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = tokenAfterBody;
    _[AFTER_BODY_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = whitespaceCharacterInBody;
    _[AFTER_BODY_MODE][Tokenizer.COMMENT_TOKEN] = appendCommentToRootHtmlElement;
    _[AFTER_BODY_MODE][Tokenizer.DOCTYPE_TOKEN] = ignoreToken;
    _[AFTER_BODY_MODE][Tokenizer.START_TAG_TOKEN] = startTagAfterBody;
    _[AFTER_BODY_MODE][Tokenizer.END_TAG_TOKEN] = endTagAfterBody;
    _[AFTER_BODY_MODE][Tokenizer.EOF_TOKEN] = stopParsing;
    _[IN_FRAMESET_MODE] = Object.create(null);
    _[IN_FRAMESET_MODE][Tokenizer.CHARACTER_TOKEN] = _[IN_FRAMESET_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = ignoreToken;
    _[IN_FRAMESET_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = insertCharacters;
    _[IN_FRAMESET_MODE][Tokenizer.COMMENT_TOKEN] = appendComment;
    _[IN_FRAMESET_MODE][Tokenizer.DOCTYPE_TOKEN] = ignoreToken;
    _[IN_FRAMESET_MODE][Tokenizer.START_TAG_TOKEN] = startTagInFrameset;
    _[IN_FRAMESET_MODE][Tokenizer.END_TAG_TOKEN] = endTagInFrameset;
    _[IN_FRAMESET_MODE][Tokenizer.EOF_TOKEN] = stopParsing;
    _[AFTER_FRAMESET_MODE] = Object.create(null);
    _[AFTER_FRAMESET_MODE][Tokenizer.CHARACTER_TOKEN] = _[AFTER_FRAMESET_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = ignoreToken;
    _[AFTER_FRAMESET_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = insertCharacters;
    _[AFTER_FRAMESET_MODE][Tokenizer.COMMENT_TOKEN] = appendComment;
    _[AFTER_FRAMESET_MODE][Tokenizer.DOCTYPE_TOKEN] = ignoreToken;
    _[AFTER_FRAMESET_MODE][Tokenizer.START_TAG_TOKEN] = startTagAfterFrameset;
    _[AFTER_FRAMESET_MODE][Tokenizer.END_TAG_TOKEN] = endTagAfterFrameset;
    _[AFTER_FRAMESET_MODE][Tokenizer.EOF_TOKEN] = stopParsing;
    _[AFTER_AFTER_BODY_MODE] = Object.create(null);
    _[AFTER_AFTER_BODY_MODE][Tokenizer.CHARACTER_TOKEN] = tokenAfterAfterBody;
    _[AFTER_AFTER_BODY_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = tokenAfterAfterBody;
    _[AFTER_AFTER_BODY_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = whitespaceCharacterInBody;
    _[AFTER_AFTER_BODY_MODE][Tokenizer.COMMENT_TOKEN] = appendCommentToDocument;
    _[AFTER_AFTER_BODY_MODE][Tokenizer.DOCTYPE_TOKEN] = ignoreToken;
    _[AFTER_AFTER_BODY_MODE][Tokenizer.START_TAG_TOKEN] = startTagAfterAfterBody;
    _[AFTER_AFTER_BODY_MODE][Tokenizer.END_TAG_TOKEN] = tokenAfterAfterBody;
    _[AFTER_AFTER_BODY_MODE][Tokenizer.EOF_TOKEN] = stopParsing;
    _[AFTER_AFTER_FRAMESET_MODE] = Object.create(null);
    _[AFTER_AFTER_FRAMESET_MODE][Tokenizer.CHARACTER_TOKEN] = _[AFTER_AFTER_FRAMESET_MODE][Tokenizer.NULL_CHARACTER_TOKEN] = ignoreToken;
    _[AFTER_AFTER_FRAMESET_MODE][Tokenizer.WHITESPACE_CHARACTER_TOKEN] = whitespaceCharacterInBody;
    _[AFTER_AFTER_FRAMESET_MODE][Tokenizer.COMMENT_TOKEN] = appendCommentToDocument;
    _[AFTER_AFTER_FRAMESET_MODE][Tokenizer.DOCTYPE_TOKEN] = ignoreToken;
    _[AFTER_AFTER_FRAMESET_MODE][Tokenizer.START_TAG_TOKEN] = startTagAfterAfterFrameset;
    _[AFTER_AFTER_FRAMESET_MODE][Tokenizer.END_TAG_TOKEN] = ignoreToken;
    _[AFTER_AFTER_FRAMESET_MODE][Tokenizer.EOF_TOKEN] = stopParsing;
    var Parser = module2.exports = function(options) {
      this.options = mergeOptions(DEFAULT_OPTIONS, options);
      this.treeAdapter = this.options.treeAdapter;
      this.pendingScript = null;
      if (this.options.locationInfo)
        new LocationInfoParserMixin(this);
    };
    Parser.prototype.parse = function(html) {
      var document2 = this.treeAdapter.createDocument();
      this._bootstrap(document2, null);
      this.tokenizer.write(html, true);
      this._runParsingLoop(null);
      return document2;
    };
    Parser.prototype.parseFragment = function(html, fragmentContext) {
      if (!fragmentContext)
        fragmentContext = this.treeAdapter.createElement($.TEMPLATE, NS.HTML, []);
      var documentMock = this.treeAdapter.createElement("documentmock", NS.HTML, []);
      this._bootstrap(documentMock, fragmentContext);
      if (this.treeAdapter.getTagName(fragmentContext) === $.TEMPLATE)
        this._pushTmplInsertionMode(IN_TEMPLATE_MODE);
      this._initTokenizerForFragmentParsing();
      this._insertFakeRootElement();
      this._resetInsertionMode();
      this._findFormInFragmentContext();
      this.tokenizer.write(html, true);
      this._runParsingLoop(null);
      var rootElement = this.treeAdapter.getFirstChild(documentMock), fragment = this.treeAdapter.createDocumentFragment();
      this._adoptNodes(rootElement, fragment);
      return fragment;
    };
    Parser.prototype._bootstrap = function(document2, fragmentContext) {
      this.tokenizer = new Tokenizer(this.options);
      this.stopped = false;
      this.insertionMode = INITIAL_MODE;
      this.originalInsertionMode = "";
      this.document = document2;
      this.fragmentContext = fragmentContext;
      this.headElement = null;
      this.formElement = null;
      this.openElements = new OpenElementStack(this.document, this.treeAdapter);
      this.activeFormattingElements = new FormattingElementList(this.treeAdapter);
      this.tmplInsertionModeStack = [];
      this.tmplInsertionModeStackTop = -1;
      this.currentTmplInsertionMode = null;
      this.pendingCharacterTokens = [];
      this.hasNonWhitespacePendingCharacterToken = false;
      this.framesetOk = true;
      this.skipNextNewLine = false;
      this.fosterParentingEnabled = false;
    };
    Parser.prototype._runParsingLoop = function(scriptHandler) {
      while (!this.stopped) {
        this._setupTokenizerCDATAMode();
        var token = this.tokenizer.getNextToken();
        if (token.type === Tokenizer.HIBERNATION_TOKEN)
          break;
        if (this.skipNextNewLine) {
          this.skipNextNewLine = false;
          if (token.type === Tokenizer.WHITESPACE_CHARACTER_TOKEN && token.chars[0] === "\n") {
            if (token.chars.length === 1)
              continue;
            token.chars = token.chars.substr(1);
          }
        }
        this._processInputToken(token);
        if (scriptHandler && this.pendingScript)
          break;
      }
    };
    Parser.prototype.runParsingLoopForCurrentChunk = function(writeCallback, scriptHandler) {
      this._runParsingLoop(scriptHandler);
      if (scriptHandler && this.pendingScript) {
        var script = this.pendingScript;
        this.pendingScript = null;
        scriptHandler(script);
        return;
      }
      if (writeCallback)
        writeCallback();
    };
    Parser.prototype._setupTokenizerCDATAMode = function() {
      var current = this._getAdjustedCurrentElement();
      this.tokenizer.allowCDATA = current && current !== this.document && this.treeAdapter.getNamespaceURI(current) !== NS.HTML && !this._isIntegrationPoint(current);
    };
    Parser.prototype._switchToTextParsing = function(currentToken, nextTokenizerState) {
      this._insertElement(currentToken, NS.HTML);
      this.tokenizer.state = nextTokenizerState;
      this.originalInsertionMode = this.insertionMode;
      this.insertionMode = TEXT_MODE;
    };
    Parser.prototype.switchToPlaintextParsing = function() {
      this.insertionMode = TEXT_MODE;
      this.originalInsertionMode = IN_BODY_MODE;
      this.tokenizer.state = Tokenizer.MODE.PLAINTEXT;
    };
    Parser.prototype._getAdjustedCurrentElement = function() {
      return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
    };
    Parser.prototype._findFormInFragmentContext = function() {
      var node2 = this.fragmentContext;
      do {
        if (this.treeAdapter.getTagName(node2) === $.FORM) {
          this.formElement = node2;
          break;
        }
        node2 = this.treeAdapter.getParentNode(node2);
      } while (node2);
    };
    Parser.prototype._initTokenizerForFragmentParsing = function() {
      if (this.treeAdapter.getNamespaceURI(this.fragmentContext) === NS.HTML) {
        var tn = this.treeAdapter.getTagName(this.fragmentContext);
        if (tn === $.TITLE || tn === $.TEXTAREA)
          this.tokenizer.state = Tokenizer.MODE.RCDATA;
        else if (tn === $.STYLE || tn === $.XMP || tn === $.IFRAME || tn === $.NOEMBED || tn === $.NOFRAMES || tn === $.NOSCRIPT)
          this.tokenizer.state = Tokenizer.MODE.RAWTEXT;
        else if (tn === $.SCRIPT)
          this.tokenizer.state = Tokenizer.MODE.SCRIPT_DATA;
        else if (tn === $.PLAINTEXT)
          this.tokenizer.state = Tokenizer.MODE.PLAINTEXT;
      }
    };
    Parser.prototype._setDocumentType = function(token) {
      this.treeAdapter.setDocumentType(this.document, token.name, token.publicId, token.systemId);
    };
    Parser.prototype._attachElementToTree = function(element) {
      if (this._shouldFosterParentOnInsertion())
        this._fosterParentElement(element);
      else {
        var parent = this.openElements.currentTmplContent || this.openElements.current;
        this.treeAdapter.appendChild(parent, element);
      }
    };
    Parser.prototype._appendElement = function(token, namespaceURI) {
      var element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
      this._attachElementToTree(element);
    };
    Parser.prototype._insertElement = function(token, namespaceURI) {
      var element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
      this._attachElementToTree(element);
      this.openElements.push(element);
    };
    Parser.prototype._insertFakeElement = function(tagName) {
      var element = this.treeAdapter.createElement(tagName, NS.HTML, []);
      this._attachElementToTree(element);
      this.openElements.push(element);
    };
    Parser.prototype._insertTemplate = function(token) {
      var tmpl = this.treeAdapter.createElement(token.tagName, NS.HTML, token.attrs), content = this.treeAdapter.createDocumentFragment();
      this.treeAdapter.setTemplateContent(tmpl, content);
      this._attachElementToTree(tmpl);
      this.openElements.push(tmpl);
    };
    Parser.prototype._insertFakeRootElement = function() {
      var element = this.treeAdapter.createElement($.HTML, NS.HTML, []);
      this.treeAdapter.appendChild(this.openElements.current, element);
      this.openElements.push(element);
    };
    Parser.prototype._appendCommentNode = function(token, parent) {
      var commentNode = this.treeAdapter.createCommentNode(token.data);
      this.treeAdapter.appendChild(parent, commentNode);
    };
    Parser.prototype._insertCharacters = function(token) {
      if (this._shouldFosterParentOnInsertion())
        this._fosterParentText(token.chars);
      else {
        var parent = this.openElements.currentTmplContent || this.openElements.current;
        this.treeAdapter.insertText(parent, token.chars);
      }
    };
    Parser.prototype._adoptNodes = function(donor, recipient) {
      while (true) {
        var child = this.treeAdapter.getFirstChild(donor);
        if (!child)
          break;
        this.treeAdapter.detachNode(child);
        this.treeAdapter.appendChild(recipient, child);
      }
    };
    Parser.prototype._shouldProcessTokenInForeignContent = function(token) {
      var current = this._getAdjustedCurrentElement();
      if (!current || current === this.document)
        return false;
      var ns = this.treeAdapter.getNamespaceURI(current);
      if (ns === NS.HTML)
        return false;
      if (this.treeAdapter.getTagName(current) === $.ANNOTATION_XML && ns === NS.MATHML && token.type === Tokenizer.START_TAG_TOKEN && token.tagName === $.SVG)
        return false;
      var isCharacterToken = token.type === Tokenizer.CHARACTER_TOKEN || token.type === Tokenizer.NULL_CHARACTER_TOKEN || token.type === Tokenizer.WHITESPACE_CHARACTER_TOKEN, isMathMLTextStartTag = token.type === Tokenizer.START_TAG_TOKEN && token.tagName !== $.MGLYPH && token.tagName !== $.MALIGNMARK;
      if ((isMathMLTextStartTag || isCharacterToken) && this._isIntegrationPoint(current, NS.MATHML))
        return false;
      if ((token.type === Tokenizer.START_TAG_TOKEN || isCharacterToken) && this._isIntegrationPoint(current, NS.HTML))
        return false;
      return token.type !== Tokenizer.EOF_TOKEN;
    };
    Parser.prototype._processToken = function(token) {
      _[this.insertionMode][token.type](this, token);
    };
    Parser.prototype._processTokenInBodyMode = function(token) {
      _[IN_BODY_MODE][token.type](this, token);
    };
    Parser.prototype._processTokenInForeignContent = function(token) {
      if (token.type === Tokenizer.CHARACTER_TOKEN)
        characterInForeignContent(this, token);
      else if (token.type === Tokenizer.NULL_CHARACTER_TOKEN)
        nullCharacterInForeignContent(this, token);
      else if (token.type === Tokenizer.WHITESPACE_CHARACTER_TOKEN)
        insertCharacters(this, token);
      else if (token.type === Tokenizer.COMMENT_TOKEN)
        appendComment(this, token);
      else if (token.type === Tokenizer.START_TAG_TOKEN)
        startTagInForeignContent(this, token);
      else if (token.type === Tokenizer.END_TAG_TOKEN)
        endTagInForeignContent(this, token);
    };
    Parser.prototype._processInputToken = function(token) {
      if (this._shouldProcessTokenInForeignContent(token))
        this._processTokenInForeignContent(token);
      else
        this._processToken(token);
    };
    Parser.prototype._isIntegrationPoint = function(element, foreignNS) {
      var tn = this.treeAdapter.getTagName(element), ns = this.treeAdapter.getNamespaceURI(element), attrs = this.treeAdapter.getAttrList(element);
      return foreignContent.isIntegrationPoint(tn, ns, attrs, foreignNS);
    };
    Parser.prototype._reconstructActiveFormattingElements = function() {
      var listLength = this.activeFormattingElements.length;
      if (listLength) {
        var unopenIdx = listLength, entry = null;
        do {
          unopenIdx--;
          entry = this.activeFormattingElements.entries[unopenIdx];
          if (entry.type === FormattingElementList.MARKER_ENTRY || this.openElements.contains(entry.element)) {
            unopenIdx++;
            break;
          }
        } while (unopenIdx > 0);
        for (var i = unopenIdx; i < listLength; i++) {
          entry = this.activeFormattingElements.entries[i];
          this._insertElement(entry.token, this.treeAdapter.getNamespaceURI(entry.element));
          entry.element = this.openElements.current;
        }
      }
    };
    Parser.prototype._closeTableCell = function() {
      this.openElements.generateImpliedEndTags();
      this.openElements.popUntilTableCellPopped();
      this.activeFormattingElements.clearToLastMarker();
      this.insertionMode = IN_ROW_MODE;
    };
    Parser.prototype._closePElement = function() {
      this.openElements.generateImpliedEndTagsWithExclusion($.P);
      this.openElements.popUntilTagNamePopped($.P);
    };
    Parser.prototype._resetInsertionMode = function() {
      for (var i = this.openElements.stackTop, last = false; i >= 0; i--) {
        var element = this.openElements.items[i];
        if (i === 0) {
          last = true;
          if (this.fragmentContext)
            element = this.fragmentContext;
        }
        var tn = this.treeAdapter.getTagName(element), newInsertionMode = INSERTION_MODE_RESET_MAP[tn];
        if (newInsertionMode) {
          this.insertionMode = newInsertionMode;
          break;
        } else if (!last && (tn === $.TD || tn === $.TH)) {
          this.insertionMode = IN_CELL_MODE;
          break;
        } else if (!last && tn === $.HEAD) {
          this.insertionMode = IN_HEAD_MODE;
          break;
        } else if (tn === $.SELECT) {
          this._resetInsertionModeForSelect(i);
          break;
        } else if (tn === $.TEMPLATE) {
          this.insertionMode = this.currentTmplInsertionMode;
          break;
        } else if (tn === $.HTML) {
          this.insertionMode = this.headElement ? AFTER_HEAD_MODE : BEFORE_HEAD_MODE;
          break;
        } else if (last) {
          this.insertionMode = IN_BODY_MODE;
          break;
        }
      }
    };
    Parser.prototype._resetInsertionModeForSelect = function(selectIdx) {
      if (selectIdx > 0) {
        for (var i = selectIdx - 1; i > 0; i--) {
          var ancestor = this.openElements.items[i], tn = this.treeAdapter.getTagName(ancestor);
          if (tn === $.TEMPLATE)
            break;
          else if (tn === $.TABLE) {
            this.insertionMode = IN_SELECT_IN_TABLE_MODE;
            return;
          }
        }
      }
      this.insertionMode = IN_SELECT_MODE;
    };
    Parser.prototype._pushTmplInsertionMode = function(mode) {
      this.tmplInsertionModeStack.push(mode);
      this.tmplInsertionModeStackTop++;
      this.currentTmplInsertionMode = mode;
    };
    Parser.prototype._popTmplInsertionMode = function() {
      this.tmplInsertionModeStack.pop();
      this.tmplInsertionModeStackTop--;
      this.currentTmplInsertionMode = this.tmplInsertionModeStack[this.tmplInsertionModeStackTop];
    };
    Parser.prototype._isElementCausesFosterParenting = function(element) {
      var tn = this.treeAdapter.getTagName(element);
      return tn === $.TABLE || tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD || tn === $.TR;
    };
    Parser.prototype._shouldFosterParentOnInsertion = function() {
      return this.fosterParentingEnabled && this._isElementCausesFosterParenting(this.openElements.current);
    };
    Parser.prototype._findFosterParentingLocation = function() {
      var location = {
        parent: null,
        beforeElement: null
      };
      for (var i = this.openElements.stackTop; i >= 0; i--) {
        var openElement = this.openElements.items[i], tn = this.treeAdapter.getTagName(openElement), ns = this.treeAdapter.getNamespaceURI(openElement);
        if (tn === $.TEMPLATE && ns === NS.HTML) {
          location.parent = this.treeAdapter.getTemplateContent(openElement);
          break;
        } else if (tn === $.TABLE) {
          location.parent = this.treeAdapter.getParentNode(openElement);
          if (location.parent)
            location.beforeElement = openElement;
          else
            location.parent = this.openElements.items[i - 1];
          break;
        }
      }
      if (!location.parent)
        location.parent = this.openElements.items[0];
      return location;
    };
    Parser.prototype._fosterParentElement = function(element) {
      var location = this._findFosterParentingLocation();
      if (location.beforeElement)
        this.treeAdapter.insertBefore(location.parent, element, location.beforeElement);
      else
        this.treeAdapter.appendChild(location.parent, element);
    };
    Parser.prototype._fosterParentText = function(chars) {
      var location = this._findFosterParentingLocation();
      if (location.beforeElement)
        this.treeAdapter.insertTextBefore(location.parent, chars, location.beforeElement);
      else
        this.treeAdapter.insertText(location.parent, chars);
    };
    Parser.prototype._isSpecialElement = function(element) {
      var tn = this.treeAdapter.getTagName(element), ns = this.treeAdapter.getNamespaceURI(element);
      return HTML.SPECIAL_ELEMENTS[ns][tn];
    };
    function aaObtainFormattingElementEntry(p, token) {
      var formattingElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName(token.tagName);
      if (formattingElementEntry) {
        if (!p.openElements.contains(formattingElementEntry.element)) {
          p.activeFormattingElements.removeEntry(formattingElementEntry);
          formattingElementEntry = null;
        } else if (!p.openElements.hasInScope(token.tagName))
          formattingElementEntry = null;
      } else
        genericEndTagInBody(p, token);
      return formattingElementEntry;
    }
    function aaObtainFurthestBlock(p, formattingElementEntry) {
      var furthestBlock = null;
      for (var i = p.openElements.stackTop; i >= 0; i--) {
        var element = p.openElements.items[i];
        if (element === formattingElementEntry.element)
          break;
        if (p._isSpecialElement(element))
          furthestBlock = element;
      }
      if (!furthestBlock) {
        p.openElements.popUntilElementPopped(formattingElementEntry.element);
        p.activeFormattingElements.removeEntry(formattingElementEntry);
      }
      return furthestBlock;
    }
    function aaInnerLoop(p, furthestBlock, formattingElement) {
      var lastElement = furthestBlock, nextElement = p.openElements.getCommonAncestor(furthestBlock);
      for (var i = 0, element = nextElement; element !== formattingElement; i++, element = nextElement) {
        nextElement = p.openElements.getCommonAncestor(element);
        var elementEntry = p.activeFormattingElements.getElementEntry(element), counterOverflow = elementEntry && i >= AA_INNER_LOOP_ITER, shouldRemoveFromOpenElements = !elementEntry || counterOverflow;
        if (shouldRemoveFromOpenElements) {
          if (counterOverflow)
            p.activeFormattingElements.removeEntry(elementEntry);
          p.openElements.remove(element);
        } else {
          element = aaRecreateElementFromEntry(p, elementEntry);
          if (lastElement === furthestBlock)
            p.activeFormattingElements.bookmark = elementEntry;
          p.treeAdapter.detachNode(lastElement);
          p.treeAdapter.appendChild(element, lastElement);
          lastElement = element;
        }
      }
      return lastElement;
    }
    function aaRecreateElementFromEntry(p, elementEntry) {
      var ns = p.treeAdapter.getNamespaceURI(elementEntry.element), newElement = p.treeAdapter.createElement(elementEntry.token.tagName, ns, elementEntry.token.attrs);
      p.openElements.replace(elementEntry.element, newElement);
      elementEntry.element = newElement;
      return newElement;
    }
    function aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement) {
      if (p._isElementCausesFosterParenting(commonAncestor))
        p._fosterParentElement(lastElement);
      else {
        var tn = p.treeAdapter.getTagName(commonAncestor), ns = p.treeAdapter.getNamespaceURI(commonAncestor);
        if (tn === $.TEMPLATE && ns === NS.HTML)
          commonAncestor = p.treeAdapter.getTemplateContent(commonAncestor);
        p.treeAdapter.appendChild(commonAncestor, lastElement);
      }
    }
    function aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry) {
      var ns = p.treeAdapter.getNamespaceURI(formattingElementEntry.element), token = formattingElementEntry.token, newElement = p.treeAdapter.createElement(token.tagName, ns, token.attrs);
      p._adoptNodes(furthestBlock, newElement);
      p.treeAdapter.appendChild(furthestBlock, newElement);
      p.activeFormattingElements.insertElementAfterBookmark(newElement, formattingElementEntry.token);
      p.activeFormattingElements.removeEntry(formattingElementEntry);
      p.openElements.remove(formattingElementEntry.element);
      p.openElements.insertAfter(furthestBlock, newElement);
    }
    function callAdoptionAgency(p, token) {
      var formattingElementEntry;
      for (var i = 0; i < AA_OUTER_LOOP_ITER; i++) {
        formattingElementEntry = aaObtainFormattingElementEntry(p, token, formattingElementEntry);
        if (!formattingElementEntry)
          break;
        var furthestBlock = aaObtainFurthestBlock(p, formattingElementEntry);
        if (!furthestBlock)
          break;
        p.activeFormattingElements.bookmark = formattingElementEntry;
        var lastElement = aaInnerLoop(p, furthestBlock, formattingElementEntry.element), commonAncestor = p.openElements.getCommonAncestor(formattingElementEntry.element);
        p.treeAdapter.detachNode(lastElement);
        aaInsertLastNodeInCommonAncestor(p, commonAncestor, lastElement);
        aaReplaceFormattingElement(p, furthestBlock, formattingElementEntry);
      }
    }
    function ignoreToken() {
    }
    function appendComment(p, token) {
      p._appendCommentNode(token, p.openElements.currentTmplContent || p.openElements.current);
    }
    function appendCommentToRootHtmlElement(p, token) {
      p._appendCommentNode(token, p.openElements.items[0]);
    }
    function appendCommentToDocument(p, token) {
      p._appendCommentNode(token, p.document);
    }
    function insertCharacters(p, token) {
      p._insertCharacters(token);
    }
    function stopParsing(p) {
      p.stopped = true;
    }
    function doctypeInInitialMode(p, token) {
      p._setDocumentType(token);
      var mode = token.forceQuirks ? HTML.DOCUMENT_MODE.QUIRKS : doctype.getDocumentMode(token.name, token.publicId, token.systemId);
      p.treeAdapter.setDocumentMode(p.document, mode);
      p.insertionMode = BEFORE_HTML_MODE;
    }
    function tokenInInitialMode(p, token) {
      p.treeAdapter.setDocumentMode(p.document, HTML.DOCUMENT_MODE.QUIRKS);
      p.insertionMode = BEFORE_HTML_MODE;
      p._processToken(token);
    }
    function startTagBeforeHtml(p, token) {
      if (token.tagName === $.HTML) {
        p._insertElement(token, NS.HTML);
        p.insertionMode = BEFORE_HEAD_MODE;
      } else
        tokenBeforeHtml(p, token);
    }
    function endTagBeforeHtml(p, token) {
      var tn = token.tagName;
      if (tn === $.HTML || tn === $.HEAD || tn === $.BODY || tn === $.BR)
        tokenBeforeHtml(p, token);
    }
    function tokenBeforeHtml(p, token) {
      p._insertFakeRootElement();
      p.insertionMode = BEFORE_HEAD_MODE;
      p._processToken(token);
    }
    function startTagBeforeHead(p, token) {
      var tn = token.tagName;
      if (tn === $.HTML)
        startTagInBody(p, token);
      else if (tn === $.HEAD) {
        p._insertElement(token, NS.HTML);
        p.headElement = p.openElements.current;
        p.insertionMode = IN_HEAD_MODE;
      } else
        tokenBeforeHead(p, token);
    }
    function endTagBeforeHead(p, token) {
      var tn = token.tagName;
      if (tn === $.HEAD || tn === $.BODY || tn === $.HTML || tn === $.BR)
        tokenBeforeHead(p, token);
    }
    function tokenBeforeHead(p, token) {
      p._insertFakeElement($.HEAD);
      p.headElement = p.openElements.current;
      p.insertionMode = IN_HEAD_MODE;
      p._processToken(token);
    }
    function startTagInHead(p, token) {
      var tn = token.tagName;
      if (tn === $.HTML)
        startTagInBody(p, token);
      else if (tn === $.BASE || tn === $.BASEFONT || tn === $.BGSOUND || tn === $.LINK || tn === $.META)
        p._appendElement(token, NS.HTML);
      else if (tn === $.TITLE)
        p._switchToTextParsing(token, Tokenizer.MODE.RCDATA);
      else if (tn === $.NOSCRIPT || tn === $.NOFRAMES || tn === $.STYLE)
        p._switchToTextParsing(token, Tokenizer.MODE.RAWTEXT);
      else if (tn === $.SCRIPT)
        p._switchToTextParsing(token, Tokenizer.MODE.SCRIPT_DATA);
      else if (tn === $.TEMPLATE) {
        p._insertTemplate(token, NS.HTML);
        p.activeFormattingElements.insertMarker();
        p.framesetOk = false;
        p.insertionMode = IN_TEMPLATE_MODE;
        p._pushTmplInsertionMode(IN_TEMPLATE_MODE);
      } else if (tn !== $.HEAD)
        tokenInHead(p, token);
    }
    function endTagInHead(p, token) {
      var tn = token.tagName;
      if (tn === $.HEAD) {
        p.openElements.pop();
        p.insertionMode = AFTER_HEAD_MODE;
      } else if (tn === $.BODY || tn === $.BR || tn === $.HTML)
        tokenInHead(p, token);
      else if (tn === $.TEMPLATE && p.openElements.tmplCount > 0) {
        p.openElements.generateImpliedEndTags();
        p.openElements.popUntilTagNamePopped($.TEMPLATE);
        p.activeFormattingElements.clearToLastMarker();
        p._popTmplInsertionMode();
        p._resetInsertionMode();
      }
    }
    function tokenInHead(p, token) {
      p.openElements.pop();
      p.insertionMode = AFTER_HEAD_MODE;
      p._processToken(token);
    }
    function startTagAfterHead(p, token) {
      var tn = token.tagName;
      if (tn === $.HTML)
        startTagInBody(p, token);
      else if (tn === $.BODY) {
        p._insertElement(token, NS.HTML);
        p.framesetOk = false;
        p.insertionMode = IN_BODY_MODE;
      } else if (tn === $.FRAMESET) {
        p._insertElement(token, NS.HTML);
        p.insertionMode = IN_FRAMESET_MODE;
      } else if (tn === $.BASE || tn === $.BASEFONT || tn === $.BGSOUND || tn === $.LINK || tn === $.META || tn === $.NOFRAMES || tn === $.SCRIPT || tn === $.STYLE || tn === $.TEMPLATE || tn === $.TITLE) {
        p.openElements.push(p.headElement);
        startTagInHead(p, token);
        p.openElements.remove(p.headElement);
      } else if (tn !== $.HEAD)
        tokenAfterHead(p, token);
    }
    function endTagAfterHead(p, token) {
      var tn = token.tagName;
      if (tn === $.BODY || tn === $.HTML || tn === $.BR)
        tokenAfterHead(p, token);
      else if (tn === $.TEMPLATE)
        endTagInHead(p, token);
    }
    function tokenAfterHead(p, token) {
      p._insertFakeElement($.BODY);
      p.insertionMode = IN_BODY_MODE;
      p._processToken(token);
    }
    function whitespaceCharacterInBody(p, token) {
      p._reconstructActiveFormattingElements();
      p._insertCharacters(token);
    }
    function characterInBody(p, token) {
      p._reconstructActiveFormattingElements();
      p._insertCharacters(token);
      p.framesetOk = false;
    }
    function htmlStartTagInBody(p, token) {
      if (p.openElements.tmplCount === 0)
        p.treeAdapter.adoptAttributes(p.openElements.items[0], token.attrs);
    }
    function bodyStartTagInBody(p, token) {
      var bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
      if (bodyElement && p.openElements.tmplCount === 0) {
        p.framesetOk = false;
        p.treeAdapter.adoptAttributes(bodyElement, token.attrs);
      }
    }
    function framesetStartTagInBody(p, token) {
      var bodyElement = p.openElements.tryPeekProperlyNestedBodyElement();
      if (p.framesetOk && bodyElement) {
        p.treeAdapter.detachNode(bodyElement);
        p.openElements.popAllUpToHtmlElement();
        p._insertElement(token, NS.HTML);
        p.insertionMode = IN_FRAMESET_MODE;
      }
    }
    function addressStartTagInBody(p, token) {
      if (p.openElements.hasInButtonScope($.P))
        p._closePElement();
      p._insertElement(token, NS.HTML);
    }
    function numberedHeaderStartTagInBody(p, token) {
      if (p.openElements.hasInButtonScope($.P))
        p._closePElement();
      var tn = p.openElements.currentTagName;
      if (tn === $.H1 || tn === $.H2 || tn === $.H3 || tn === $.H4 || tn === $.H5 || tn === $.H6)
        p.openElements.pop();
      p._insertElement(token, NS.HTML);
    }
    function preStartTagInBody(p, token) {
      if (p.openElements.hasInButtonScope($.P))
        p._closePElement();
      p._insertElement(token, NS.HTML);
      p.skipNextNewLine = true;
      p.framesetOk = false;
    }
    function formStartTagInBody(p, token) {
      var inTemplate = p.openElements.tmplCount > 0;
      if (!p.formElement || inTemplate) {
        if (p.openElements.hasInButtonScope($.P))
          p._closePElement();
        p._insertElement(token, NS.HTML);
        if (!inTemplate)
          p.formElement = p.openElements.current;
      }
    }
    function listItemStartTagInBody(p, token) {
      p.framesetOk = false;
      var tn = token.tagName;
      for (var i = p.openElements.stackTop; i >= 0; i--) {
        var element = p.openElements.items[i], elementTn = p.treeAdapter.getTagName(element), closeTn = null;
        if (tn === $.LI && elementTn === $.LI)
          closeTn = $.LI;
        else if ((tn === $.DD || tn === $.DT) && (elementTn === $.DD || elementTn === $.DT))
          closeTn = elementTn;
        if (closeTn) {
          p.openElements.generateImpliedEndTagsWithExclusion(closeTn);
          p.openElements.popUntilTagNamePopped(closeTn);
          break;
        }
        if (elementTn !== $.ADDRESS && elementTn !== $.DIV && elementTn !== $.P && p._isSpecialElement(element))
          break;
      }
      if (p.openElements.hasInButtonScope($.P))
        p._closePElement();
      p._insertElement(token, NS.HTML);
    }
    function plaintextStartTagInBody(p, token) {
      if (p.openElements.hasInButtonScope($.P))
        p._closePElement();
      p._insertElement(token, NS.HTML);
      p.tokenizer.state = Tokenizer.MODE.PLAINTEXT;
    }
    function buttonStartTagInBody(p, token) {
      if (p.openElements.hasInScope($.BUTTON)) {
        p.openElements.generateImpliedEndTags();
        p.openElements.popUntilTagNamePopped($.BUTTON);
      }
      p._reconstructActiveFormattingElements();
      p._insertElement(token, NS.HTML);
      p.framesetOk = false;
    }
    function aStartTagInBody(p, token) {
      var activeElementEntry = p.activeFormattingElements.getElementEntryInScopeWithTagName($.A);
      if (activeElementEntry) {
        callAdoptionAgency(p, token);
        p.openElements.remove(activeElementEntry.element);
        p.activeFormattingElements.removeEntry(activeElementEntry);
      }
      p._reconstructActiveFormattingElements();
      p._insertElement(token, NS.HTML);
      p.activeFormattingElements.pushElement(p.openElements.current, token);
    }
    function bStartTagInBody(p, token) {
      p._reconstructActiveFormattingElements();
      p._insertElement(token, NS.HTML);
      p.activeFormattingElements.pushElement(p.openElements.current, token);
    }
    function nobrStartTagInBody(p, token) {
      p._reconstructActiveFormattingElements();
      if (p.openElements.hasInScope($.NOBR)) {
        callAdoptionAgency(p, token);
        p._reconstructActiveFormattingElements();
      }
      p._insertElement(token, NS.HTML);
      p.activeFormattingElements.pushElement(p.openElements.current, token);
    }
    function appletStartTagInBody(p, token) {
      p._reconstructActiveFormattingElements();
      p._insertElement(token, NS.HTML);
      p.activeFormattingElements.insertMarker();
      p.framesetOk = false;
    }
    function tableStartTagInBody(p, token) {
      if (p.treeAdapter.getDocumentMode(p.document) !== HTML.DOCUMENT_MODE.QUIRKS && p.openElements.hasInButtonScope($.P))
        p._closePElement();
      p._insertElement(token, NS.HTML);
      p.framesetOk = false;
      p.insertionMode = IN_TABLE_MODE;
    }
    function areaStartTagInBody(p, token) {
      p._reconstructActiveFormattingElements();
      p._appendElement(token, NS.HTML);
      p.framesetOk = false;
    }
    function inputStartTagInBody(p, token) {
      p._reconstructActiveFormattingElements();
      p._appendElement(token, NS.HTML);
      var inputType = Tokenizer.getTokenAttr(token, ATTRS.TYPE);
      if (!inputType || inputType.toLowerCase() !== HIDDEN_INPUT_TYPE)
        p.framesetOk = false;
    }
    function paramStartTagInBody(p, token) {
      p._appendElement(token, NS.HTML);
    }
    function hrStartTagInBody(p, token) {
      if (p.openElements.hasInButtonScope($.P))
        p._closePElement();
      if (p.openElements.currentTagName === $.MENUITEM)
        p.openElements.pop();
      p._appendElement(token, NS.HTML);
      p.framesetOk = false;
    }
    function imageStartTagInBody(p, token) {
      token.tagName = $.IMG;
      areaStartTagInBody(p, token);
    }
    function textareaStartTagInBody(p, token) {
      p._insertElement(token, NS.HTML);
      p.skipNextNewLine = true;
      p.tokenizer.state = Tokenizer.MODE.RCDATA;
      p.originalInsertionMode = p.insertionMode;
      p.framesetOk = false;
      p.insertionMode = TEXT_MODE;
    }
    function xmpStartTagInBody(p, token) {
      if (p.openElements.hasInButtonScope($.P))
        p._closePElement();
      p._reconstructActiveFormattingElements();
      p.framesetOk = false;
      p._switchToTextParsing(token, Tokenizer.MODE.RAWTEXT);
    }
    function iframeStartTagInBody(p, token) {
      p.framesetOk = false;
      p._switchToTextParsing(token, Tokenizer.MODE.RAWTEXT);
    }
    function noembedStartTagInBody(p, token) {
      p._switchToTextParsing(token, Tokenizer.MODE.RAWTEXT);
    }
    function selectStartTagInBody(p, token) {
      p._reconstructActiveFormattingElements();
      p._insertElement(token, NS.HTML);
      p.framesetOk = false;
      if (p.insertionMode === IN_TABLE_MODE || p.insertionMode === IN_CAPTION_MODE || p.insertionMode === IN_TABLE_BODY_MODE || p.insertionMode === IN_ROW_MODE || p.insertionMode === IN_CELL_MODE)
        p.insertionMode = IN_SELECT_IN_TABLE_MODE;
      else
        p.insertionMode = IN_SELECT_MODE;
    }
    function optgroupStartTagInBody(p, token) {
      if (p.openElements.currentTagName === $.OPTION)
        p.openElements.pop();
      p._reconstructActiveFormattingElements();
      p._insertElement(token, NS.HTML);
    }
    function rbStartTagInBody(p, token) {
      if (p.openElements.hasInScope($.RUBY))
        p.openElements.generateImpliedEndTags();
      p._insertElement(token, NS.HTML);
    }
    function rtStartTagInBody(p, token) {
      if (p.openElements.hasInScope($.RUBY))
        p.openElements.generateImpliedEndTagsWithExclusion($.RTC);
      p._insertElement(token, NS.HTML);
    }
    function menuitemStartTagInBody(p, token) {
      if (p.openElements.currentTagName === $.MENUITEM)
        p.openElements.pop();
      p._reconstructActiveFormattingElements();
      p._insertElement(token, NS.HTML);
    }
    function menuStartTagInBody(p, token) {
      if (p.openElements.hasInButtonScope($.P))
        p._closePElement();
      if (p.openElements.currentTagName === $.MENUITEM)
        p.openElements.pop();
      p._insertElement(token, NS.HTML);
    }
    function mathStartTagInBody(p, token) {
      p._reconstructActiveFormattingElements();
      foreignContent.adjustTokenMathMLAttrs(token);
      foreignContent.adjustTokenXMLAttrs(token);
      if (token.selfClosing)
        p._appendElement(token, NS.MATHML);
      else
        p._insertElement(token, NS.MATHML);
    }
    function svgStartTagInBody(p, token) {
      p._reconstructActiveFormattingElements();
      foreignContent.adjustTokenSVGAttrs(token);
      foreignContent.adjustTokenXMLAttrs(token);
      if (token.selfClosing)
        p._appendElement(token, NS.SVG);
      else
        p._insertElement(token, NS.SVG);
    }
    function genericStartTagInBody(p, token) {
      p._reconstructActiveFormattingElements();
      p._insertElement(token, NS.HTML);
    }
    function startTagInBody(p, token) {
      var tn = token.tagName;
      switch (tn.length) {
        case 1:
          if (tn === $.I || tn === $.S || tn === $.B || tn === $.U)
            bStartTagInBody(p, token);
          else if (tn === $.P)
            addressStartTagInBody(p, token);
          else if (tn === $.A)
            aStartTagInBody(p, token);
          else
            genericStartTagInBody(p, token);
          break;
        case 2:
          if (tn === $.DL || tn === $.OL || tn === $.UL)
            addressStartTagInBody(p, token);
          else if (tn === $.H1 || tn === $.H2 || tn === $.H3 || tn === $.H4 || tn === $.H5 || tn === $.H6)
            numberedHeaderStartTagInBody(p, token);
          else if (tn === $.LI || tn === $.DD || tn === $.DT)
            listItemStartTagInBody(p, token);
          else if (tn === $.EM || tn === $.TT)
            bStartTagInBody(p, token);
          else if (tn === $.BR)
            areaStartTagInBody(p, token);
          else if (tn === $.HR)
            hrStartTagInBody(p, token);
          else if (tn === $.RB)
            rbStartTagInBody(p, token);
          else if (tn === $.RT || tn === $.RP)
            rtStartTagInBody(p, token);
          else if (tn !== $.TH && tn !== $.TD && tn !== $.TR)
            genericStartTagInBody(p, token);
          break;
        case 3:
          if (tn === $.DIV || tn === $.DIR || tn === $.NAV)
            addressStartTagInBody(p, token);
          else if (tn === $.PRE)
            preStartTagInBody(p, token);
          else if (tn === $.BIG)
            bStartTagInBody(p, token);
          else if (tn === $.IMG || tn === $.WBR)
            areaStartTagInBody(p, token);
          else if (tn === $.XMP)
            xmpStartTagInBody(p, token);
          else if (tn === $.SVG)
            svgStartTagInBody(p, token);
          else if (tn === $.RTC)
            rbStartTagInBody(p, token);
          else if (tn !== $.COL)
            genericStartTagInBody(p, token);
          break;
        case 4:
          if (tn === $.HTML)
            htmlStartTagInBody(p, token);
          else if (tn === $.BASE || tn === $.LINK || tn === $.META)
            startTagInHead(p, token);
          else if (tn === $.BODY)
            bodyStartTagInBody(p, token);
          else if (tn === $.MAIN)
            addressStartTagInBody(p, token);
          else if (tn === $.FORM)
            formStartTagInBody(p, token);
          else if (tn === $.CODE || tn === $.FONT)
            bStartTagInBody(p, token);
          else if (tn === $.NOBR)
            nobrStartTagInBody(p, token);
          else if (tn === $.AREA)
            areaStartTagInBody(p, token);
          else if (tn === $.MATH)
            mathStartTagInBody(p, token);
          else if (tn === $.MENU)
            menuStartTagInBody(p, token);
          else if (tn !== $.HEAD)
            genericStartTagInBody(p, token);
          break;
        case 5:
          if (tn === $.STYLE || tn === $.TITLE)
            startTagInHead(p, token);
          else if (tn === $.ASIDE)
            addressStartTagInBody(p, token);
          else if (tn === $.SMALL)
            bStartTagInBody(p, token);
          else if (tn === $.TABLE)
            tableStartTagInBody(p, token);
          else if (tn === $.EMBED)
            areaStartTagInBody(p, token);
          else if (tn === $.INPUT)
            inputStartTagInBody(p, token);
          else if (tn === $.PARAM || tn === $.TRACK)
            paramStartTagInBody(p, token);
          else if (tn === $.IMAGE)
            imageStartTagInBody(p, token);
          else if (tn !== $.FRAME && tn !== $.TBODY && tn !== $.TFOOT && tn !== $.THEAD)
            genericStartTagInBody(p, token);
          break;
        case 6:
          if (tn === $.SCRIPT)
            startTagInHead(p, token);
          else if (tn === $.CENTER || tn === $.FIGURE || tn === $.FOOTER || tn === $.HEADER || tn === $.HGROUP)
            addressStartTagInBody(p, token);
          else if (tn === $.BUTTON)
            buttonStartTagInBody(p, token);
          else if (tn === $.STRIKE || tn === $.STRONG)
            bStartTagInBody(p, token);
          else if (tn === $.APPLET || tn === $.OBJECT)
            appletStartTagInBody(p, token);
          else if (tn === $.KEYGEN)
            areaStartTagInBody(p, token);
          else if (tn === $.SOURCE)
            paramStartTagInBody(p, token);
          else if (tn === $.IFRAME)
            iframeStartTagInBody(p, token);
          else if (tn === $.SELECT)
            selectStartTagInBody(p, token);
          else if (tn === $.OPTION)
            optgroupStartTagInBody(p, token);
          else
            genericStartTagInBody(p, token);
          break;
        case 7:
          if (tn === $.BGSOUND)
            startTagInHead(p, token);
          else if (tn === $.DETAILS || tn === $.ADDRESS || tn === $.ARTICLE || tn === $.SECTION || tn === $.SUMMARY)
            addressStartTagInBody(p, token);
          else if (tn === $.LISTING)
            preStartTagInBody(p, token);
          else if (tn === $.MARQUEE)
            appletStartTagInBody(p, token);
          else if (tn === $.NOEMBED)
            noembedStartTagInBody(p, token);
          else if (tn !== $.CAPTION)
            genericStartTagInBody(p, token);
          break;
        case 8:
          if (tn === $.BASEFONT)
            startTagInHead(p, token);
          else if (tn === $.MENUITEM)
            menuitemStartTagInBody(p, token);
          else if (tn === $.FRAMESET)
            framesetStartTagInBody(p, token);
          else if (tn === $.FIELDSET)
            addressStartTagInBody(p, token);
          else if (tn === $.TEXTAREA)
            textareaStartTagInBody(p, token);
          else if (tn === $.TEMPLATE)
            startTagInHead(p, token);
          else if (tn === $.NOSCRIPT)
            noembedStartTagInBody(p, token);
          else if (tn === $.OPTGROUP)
            optgroupStartTagInBody(p, token);
          else if (tn !== $.COLGROUP)
            genericStartTagInBody(p, token);
          break;
        case 9:
          if (tn === $.PLAINTEXT)
            plaintextStartTagInBody(p, token);
          else
            genericStartTagInBody(p, token);
          break;
        case 10:
          if (tn === $.BLOCKQUOTE || tn === $.FIGCAPTION)
            addressStartTagInBody(p, token);
          else
            genericStartTagInBody(p, token);
          break;
        default:
          genericStartTagInBody(p, token);
      }
    }
    function bodyEndTagInBody(p) {
      if (p.openElements.hasInScope($.BODY))
        p.insertionMode = AFTER_BODY_MODE;
    }
    function htmlEndTagInBody(p, token) {
      if (p.openElements.hasInScope($.BODY)) {
        p.insertionMode = AFTER_BODY_MODE;
        p._processToken(token);
      }
    }
    function addressEndTagInBody(p, token) {
      var tn = token.tagName;
      if (p.openElements.hasInScope(tn)) {
        p.openElements.generateImpliedEndTags();
        p.openElements.popUntilTagNamePopped(tn);
      }
    }
    function formEndTagInBody(p) {
      var inTemplate = p.openElements.tmplCount > 0, formElement = p.formElement;
      if (!inTemplate)
        p.formElement = null;
      if ((formElement || inTemplate) && p.openElements.hasInScope($.FORM)) {
        p.openElements.generateImpliedEndTags();
        if (inTemplate)
          p.openElements.popUntilTagNamePopped($.FORM);
        else
          p.openElements.remove(formElement);
      }
    }
    function pEndTagInBody(p) {
      if (!p.openElements.hasInButtonScope($.P))
        p._insertFakeElement($.P);
      p._closePElement();
    }
    function liEndTagInBody(p) {
      if (p.openElements.hasInListItemScope($.LI)) {
        p.openElements.generateImpliedEndTagsWithExclusion($.LI);
        p.openElements.popUntilTagNamePopped($.LI);
      }
    }
    function ddEndTagInBody(p, token) {
      var tn = token.tagName;
      if (p.openElements.hasInScope(tn)) {
        p.openElements.generateImpliedEndTagsWithExclusion(tn);
        p.openElements.popUntilTagNamePopped(tn);
      }
    }
    function numberedHeaderEndTagInBody(p) {
      if (p.openElements.hasNumberedHeaderInScope()) {
        p.openElements.generateImpliedEndTags();
        p.openElements.popUntilNumberedHeaderPopped();
      }
    }
    function appletEndTagInBody(p, token) {
      var tn = token.tagName;
      if (p.openElements.hasInScope(tn)) {
        p.openElements.generateImpliedEndTags();
        p.openElements.popUntilTagNamePopped(tn);
        p.activeFormattingElements.clearToLastMarker();
      }
    }
    function brEndTagInBody(p) {
      p._reconstructActiveFormattingElements();
      p._insertFakeElement($.BR);
      p.openElements.pop();
      p.framesetOk = false;
    }
    function genericEndTagInBody(p, token) {
      var tn = token.tagName;
      for (var i = p.openElements.stackTop; i > 0; i--) {
        var element = p.openElements.items[i];
        if (p.treeAdapter.getTagName(element) === tn) {
          p.openElements.generateImpliedEndTagsWithExclusion(tn);
          p.openElements.popUntilElementPopped(element);
          break;
        }
        if (p._isSpecialElement(element))
          break;
      }
    }
    function endTagInBody(p, token) {
      var tn = token.tagName;
      switch (tn.length) {
        case 1:
          if (tn === $.A || tn === $.B || tn === $.I || tn === $.S || tn === $.U)
            callAdoptionAgency(p, token);
          else if (tn === $.P)
            pEndTagInBody(p, token);
          else
            genericEndTagInBody(p, token);
          break;
        case 2:
          if (tn === $.DL || tn === $.UL || tn === $.OL)
            addressEndTagInBody(p, token);
          else if (tn === $.LI)
            liEndTagInBody(p, token);
          else if (tn === $.DD || tn === $.DT)
            ddEndTagInBody(p, token);
          else if (tn === $.H1 || tn === $.H2 || tn === $.H3 || tn === $.H4 || tn === $.H5 || tn === $.H6)
            numberedHeaderEndTagInBody(p, token);
          else if (tn === $.BR)
            brEndTagInBody(p, token);
          else if (tn === $.EM || tn === $.TT)
            callAdoptionAgency(p, token);
          else
            genericEndTagInBody(p, token);
          break;
        case 3:
          if (tn === $.BIG)
            callAdoptionAgency(p, token);
          else if (tn === $.DIR || tn === $.DIV || tn === $.NAV)
            addressEndTagInBody(p, token);
          else
            genericEndTagInBody(p, token);
          break;
        case 4:
          if (tn === $.BODY)
            bodyEndTagInBody(p, token);
          else if (tn === $.HTML)
            htmlEndTagInBody(p, token);
          else if (tn === $.FORM)
            formEndTagInBody(p, token);
          else if (tn === $.CODE || tn === $.FONT || tn === $.NOBR)
            callAdoptionAgency(p, token);
          else if (tn === $.MAIN || tn === $.MENU)
            addressEndTagInBody(p, token);
          else
            genericEndTagInBody(p, token);
          break;
        case 5:
          if (tn === $.ASIDE)
            addressEndTagInBody(p, token);
          else if (tn === $.SMALL)
            callAdoptionAgency(p, token);
          else
            genericEndTagInBody(p, token);
          break;
        case 6:
          if (tn === $.CENTER || tn === $.FIGURE || tn === $.FOOTER || tn === $.HEADER || tn === $.HGROUP)
            addressEndTagInBody(p, token);
          else if (tn === $.APPLET || tn === $.OBJECT)
            appletEndTagInBody(p, token);
          else if (tn === $.STRIKE || tn === $.STRONG)
            callAdoptionAgency(p, token);
          else
            genericEndTagInBody(p, token);
          break;
        case 7:
          if (tn === $.ADDRESS || tn === $.ARTICLE || tn === $.DETAILS || tn === $.SECTION || tn === $.SUMMARY)
            addressEndTagInBody(p, token);
          else if (tn === $.MARQUEE)
            appletEndTagInBody(p, token);
          else
            genericEndTagInBody(p, token);
          break;
        case 8:
          if (tn === $.FIELDSET)
            addressEndTagInBody(p, token);
          else if (tn === $.TEMPLATE)
            endTagInHead(p, token);
          else
            genericEndTagInBody(p, token);
          break;
        case 10:
          if (tn === $.BLOCKQUOTE || tn === $.FIGCAPTION)
            addressEndTagInBody(p, token);
          else
            genericEndTagInBody(p, token);
          break;
        default:
          genericEndTagInBody(p, token);
      }
    }
    function eofInBody(p, token) {
      if (p.tmplInsertionModeStackTop > -1)
        eofInTemplate(p, token);
      else
        p.stopped = true;
    }
    function endTagInText(p, token) {
      if (token.tagName === $.SCRIPT)
        p.pendingScript = p.openElements.current;
      p.openElements.pop();
      p.insertionMode = p.originalInsertionMode;
    }
    function eofInText(p, token) {
      p.openElements.pop();
      p.insertionMode = p.originalInsertionMode;
      p._processToken(token);
    }
    function characterInTable(p, token) {
      var curTn = p.openElements.currentTagName;
      if (curTn === $.TABLE || curTn === $.TBODY || curTn === $.TFOOT || curTn === $.THEAD || curTn === $.TR) {
        p.pendingCharacterTokens = [];
        p.hasNonWhitespacePendingCharacterToken = false;
        p.originalInsertionMode = p.insertionMode;
        p.insertionMode = IN_TABLE_TEXT_MODE;
        p._processToken(token);
      } else
        tokenInTable(p, token);
    }
    function captionStartTagInTable(p, token) {
      p.openElements.clearBackToTableContext();
      p.activeFormattingElements.insertMarker();
      p._insertElement(token, NS.HTML);
      p.insertionMode = IN_CAPTION_MODE;
    }
    function colgroupStartTagInTable(p, token) {
      p.openElements.clearBackToTableContext();
      p._insertElement(token, NS.HTML);
      p.insertionMode = IN_COLUMN_GROUP_MODE;
    }
    function colStartTagInTable(p, token) {
      p.openElements.clearBackToTableContext();
      p._insertFakeElement($.COLGROUP);
      p.insertionMode = IN_COLUMN_GROUP_MODE;
      p._processToken(token);
    }
    function tbodyStartTagInTable(p, token) {
      p.openElements.clearBackToTableContext();
      p._insertElement(token, NS.HTML);
      p.insertionMode = IN_TABLE_BODY_MODE;
    }
    function tdStartTagInTable(p, token) {
      p.openElements.clearBackToTableContext();
      p._insertFakeElement($.TBODY);
      p.insertionMode = IN_TABLE_BODY_MODE;
      p._processToken(token);
    }
    function tableStartTagInTable(p, token) {
      if (p.openElements.hasInTableScope($.TABLE)) {
        p.openElements.popUntilTagNamePopped($.TABLE);
        p._resetInsertionMode();
        p._processToken(token);
      }
    }
    function inputStartTagInTable(p, token) {
      var inputType = Tokenizer.getTokenAttr(token, ATTRS.TYPE);
      if (inputType && inputType.toLowerCase() === HIDDEN_INPUT_TYPE)
        p._appendElement(token, NS.HTML);
      else
        tokenInTable(p, token);
    }
    function formStartTagInTable(p, token) {
      if (!p.formElement && p.openElements.tmplCount === 0) {
        p._insertElement(token, NS.HTML);
        p.formElement = p.openElements.current;
        p.openElements.pop();
      }
    }
    function startTagInTable(p, token) {
      var tn = token.tagName;
      switch (tn.length) {
        case 2:
          if (tn === $.TD || tn === $.TH || tn === $.TR)
            tdStartTagInTable(p, token);
          else
            tokenInTable(p, token);
          break;
        case 3:
          if (tn === $.COL)
            colStartTagInTable(p, token);
          else
            tokenInTable(p, token);
          break;
        case 4:
          if (tn === $.FORM)
            formStartTagInTable(p, token);
          else
            tokenInTable(p, token);
          break;
        case 5:
          if (tn === $.TABLE)
            tableStartTagInTable(p, token);
          else if (tn === $.STYLE)
            startTagInHead(p, token);
          else if (tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD)
            tbodyStartTagInTable(p, token);
          else if (tn === $.INPUT)
            inputStartTagInTable(p, token);
          else
            tokenInTable(p, token);
          break;
        case 6:
          if (tn === $.SCRIPT)
            startTagInHead(p, token);
          else
            tokenInTable(p, token);
          break;
        case 7:
          if (tn === $.CAPTION)
            captionStartTagInTable(p, token);
          else
            tokenInTable(p, token);
          break;
        case 8:
          if (tn === $.COLGROUP)
            colgroupStartTagInTable(p, token);
          else if (tn === $.TEMPLATE)
            startTagInHead(p, token);
          else
            tokenInTable(p, token);
          break;
        default:
          tokenInTable(p, token);
      }
    }
    function endTagInTable(p, token) {
      var tn = token.tagName;
      if (tn === $.TABLE) {
        if (p.openElements.hasInTableScope($.TABLE)) {
          p.openElements.popUntilTagNamePopped($.TABLE);
          p._resetInsertionMode();
        }
      } else if (tn === $.TEMPLATE)
        endTagInHead(p, token);
      else if (tn !== $.BODY && tn !== $.CAPTION && tn !== $.COL && tn !== $.COLGROUP && tn !== $.HTML && tn !== $.TBODY && tn !== $.TD && tn !== $.TFOOT && tn !== $.TH && tn !== $.THEAD && tn !== $.TR)
        tokenInTable(p, token);
    }
    function tokenInTable(p, token) {
      var savedFosterParentingState = p.fosterParentingEnabled;
      p.fosterParentingEnabled = true;
      p._processTokenInBodyMode(token);
      p.fosterParentingEnabled = savedFosterParentingState;
    }
    function whitespaceCharacterInTableText(p, token) {
      p.pendingCharacterTokens.push(token);
    }
    function characterInTableText(p, token) {
      p.pendingCharacterTokens.push(token);
      p.hasNonWhitespacePendingCharacterToken = true;
    }
    function tokenInTableText(p, token) {
      var i = 0;
      if (p.hasNonWhitespacePendingCharacterToken) {
        for (; i < p.pendingCharacterTokens.length; i++)
          tokenInTable(p, p.pendingCharacterTokens[i]);
      } else {
        for (; i < p.pendingCharacterTokens.length; i++)
          p._insertCharacters(p.pendingCharacterTokens[i]);
      }
      p.insertionMode = p.originalInsertionMode;
      p._processToken(token);
    }
    function startTagInCaption(p, token) {
      var tn = token.tagName;
      if (tn === $.CAPTION || tn === $.COL || tn === $.COLGROUP || tn === $.TBODY || tn === $.TD || tn === $.TFOOT || tn === $.TH || tn === $.THEAD || tn === $.TR) {
        if (p.openElements.hasInTableScope($.CAPTION)) {
          p.openElements.generateImpliedEndTags();
          p.openElements.popUntilTagNamePopped($.CAPTION);
          p.activeFormattingElements.clearToLastMarker();
          p.insertionMode = IN_TABLE_MODE;
          p._processToken(token);
        }
      } else
        startTagInBody(p, token);
    }
    function endTagInCaption(p, token) {
      var tn = token.tagName;
      if (tn === $.CAPTION || tn === $.TABLE) {
        if (p.openElements.hasInTableScope($.CAPTION)) {
          p.openElements.generateImpliedEndTags();
          p.openElements.popUntilTagNamePopped($.CAPTION);
          p.activeFormattingElements.clearToLastMarker();
          p.insertionMode = IN_TABLE_MODE;
          if (tn === $.TABLE)
            p._processToken(token);
        }
      } else if (tn !== $.BODY && tn !== $.COL && tn !== $.COLGROUP && tn !== $.HTML && tn !== $.TBODY && tn !== $.TD && tn !== $.TFOOT && tn !== $.TH && tn !== $.THEAD && tn !== $.TR)
        endTagInBody(p, token);
    }
    function startTagInColumnGroup(p, token) {
      var tn = token.tagName;
      if (tn === $.HTML)
        startTagInBody(p, token);
      else if (tn === $.COL)
        p._appendElement(token, NS.HTML);
      else if (tn === $.TEMPLATE)
        startTagInHead(p, token);
      else
        tokenInColumnGroup(p, token);
    }
    function endTagInColumnGroup(p, token) {
      var tn = token.tagName;
      if (tn === $.COLGROUP) {
        if (p.openElements.currentTagName === $.COLGROUP) {
          p.openElements.pop();
          p.insertionMode = IN_TABLE_MODE;
        }
      } else if (tn === $.TEMPLATE)
        endTagInHead(p, token);
      else if (tn !== $.COL)
        tokenInColumnGroup(p, token);
    }
    function tokenInColumnGroup(p, token) {
      if (p.openElements.currentTagName === $.COLGROUP) {
        p.openElements.pop();
        p.insertionMode = IN_TABLE_MODE;
        p._processToken(token);
      }
    }
    function startTagInTableBody(p, token) {
      var tn = token.tagName;
      if (tn === $.TR) {
        p.openElements.clearBackToTableBodyContext();
        p._insertElement(token, NS.HTML);
        p.insertionMode = IN_ROW_MODE;
      } else if (tn === $.TH || tn === $.TD) {
        p.openElements.clearBackToTableBodyContext();
        p._insertFakeElement($.TR);
        p.insertionMode = IN_ROW_MODE;
        p._processToken(token);
      } else if (tn === $.CAPTION || tn === $.COL || tn === $.COLGROUP || tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD) {
        if (p.openElements.hasTableBodyContextInTableScope()) {
          p.openElements.clearBackToTableBodyContext();
          p.openElements.pop();
          p.insertionMode = IN_TABLE_MODE;
          p._processToken(token);
        }
      } else
        startTagInTable(p, token);
    }
    function endTagInTableBody(p, token) {
      var tn = token.tagName;
      if (tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD) {
        if (p.openElements.hasInTableScope(tn)) {
          p.openElements.clearBackToTableBodyContext();
          p.openElements.pop();
          p.insertionMode = IN_TABLE_MODE;
        }
      } else if (tn === $.TABLE) {
        if (p.openElements.hasTableBodyContextInTableScope()) {
          p.openElements.clearBackToTableBodyContext();
          p.openElements.pop();
          p.insertionMode = IN_TABLE_MODE;
          p._processToken(token);
        }
      } else if (tn !== $.BODY && tn !== $.CAPTION && tn !== $.COL && tn !== $.COLGROUP || tn !== $.HTML && tn !== $.TD && tn !== $.TH && tn !== $.TR)
        endTagInTable(p, token);
    }
    function startTagInRow(p, token) {
      var tn = token.tagName;
      if (tn === $.TH || tn === $.TD) {
        p.openElements.clearBackToTableRowContext();
        p._insertElement(token, NS.HTML);
        p.insertionMode = IN_CELL_MODE;
        p.activeFormattingElements.insertMarker();
      } else if (tn === $.CAPTION || tn === $.COL || tn === $.COLGROUP || tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD || tn === $.TR) {
        if (p.openElements.hasInTableScope($.TR)) {
          p.openElements.clearBackToTableRowContext();
          p.openElements.pop();
          p.insertionMode = IN_TABLE_BODY_MODE;
          p._processToken(token);
        }
      } else
        startTagInTable(p, token);
    }
    function endTagInRow(p, token) {
      var tn = token.tagName;
      if (tn === $.TR) {
        if (p.openElements.hasInTableScope($.TR)) {
          p.openElements.clearBackToTableRowContext();
          p.openElements.pop();
          p.insertionMode = IN_TABLE_BODY_MODE;
        }
      } else if (tn === $.TABLE) {
        if (p.openElements.hasInTableScope($.TR)) {
          p.openElements.clearBackToTableRowContext();
          p.openElements.pop();
          p.insertionMode = IN_TABLE_BODY_MODE;
          p._processToken(token);
        }
      } else if (tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD) {
        if (p.openElements.hasInTableScope(tn) || p.openElements.hasInTableScope($.TR)) {
          p.openElements.clearBackToTableRowContext();
          p.openElements.pop();
          p.insertionMode = IN_TABLE_BODY_MODE;
          p._processToken(token);
        }
      } else if (tn !== $.BODY && tn !== $.CAPTION && tn !== $.COL && tn !== $.COLGROUP || tn !== $.HTML && tn !== $.TD && tn !== $.TH)
        endTagInTable(p, token);
    }
    function startTagInCell(p, token) {
      var tn = token.tagName;
      if (tn === $.CAPTION || tn === $.COL || tn === $.COLGROUP || tn === $.TBODY || tn === $.TD || tn === $.TFOOT || tn === $.TH || tn === $.THEAD || tn === $.TR) {
        if (p.openElements.hasInTableScope($.TD) || p.openElements.hasInTableScope($.TH)) {
          p._closeTableCell();
          p._processToken(token);
        }
      } else
        startTagInBody(p, token);
    }
    function endTagInCell(p, token) {
      var tn = token.tagName;
      if (tn === $.TD || tn === $.TH) {
        if (p.openElements.hasInTableScope(tn)) {
          p.openElements.generateImpliedEndTags();
          p.openElements.popUntilTagNamePopped(tn);
          p.activeFormattingElements.clearToLastMarker();
          p.insertionMode = IN_ROW_MODE;
        }
      } else if (tn === $.TABLE || tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD || tn === $.TR) {
        if (p.openElements.hasInTableScope(tn)) {
          p._closeTableCell();
          p._processToken(token);
        }
      } else if (tn !== $.BODY && tn !== $.CAPTION && tn !== $.COL && tn !== $.COLGROUP && tn !== $.HTML)
        endTagInBody(p, token);
    }
    function startTagInSelect(p, token) {
      var tn = token.tagName;
      if (tn === $.HTML)
        startTagInBody(p, token);
      else if (tn === $.OPTION) {
        if (p.openElements.currentTagName === $.OPTION)
          p.openElements.pop();
        p._insertElement(token, NS.HTML);
      } else if (tn === $.OPTGROUP) {
        if (p.openElements.currentTagName === $.OPTION)
          p.openElements.pop();
        if (p.openElements.currentTagName === $.OPTGROUP)
          p.openElements.pop();
        p._insertElement(token, NS.HTML);
      } else if (tn === $.INPUT || tn === $.KEYGEN || tn === $.TEXTAREA || tn === $.SELECT) {
        if (p.openElements.hasInSelectScope($.SELECT)) {
          p.openElements.popUntilTagNamePopped($.SELECT);
          p._resetInsertionMode();
          if (tn !== $.SELECT)
            p._processToken(token);
        }
      } else if (tn === $.SCRIPT || tn === $.TEMPLATE)
        startTagInHead(p, token);
    }
    function endTagInSelect(p, token) {
      var tn = token.tagName;
      if (tn === $.OPTGROUP) {
        var prevOpenElement = p.openElements.items[p.openElements.stackTop - 1], prevOpenElementTn = prevOpenElement && p.treeAdapter.getTagName(prevOpenElement);
        if (p.openElements.currentTagName === $.OPTION && prevOpenElementTn === $.OPTGROUP)
          p.openElements.pop();
        if (p.openElements.currentTagName === $.OPTGROUP)
          p.openElements.pop();
      } else if (tn === $.OPTION) {
        if (p.openElements.currentTagName === $.OPTION)
          p.openElements.pop();
      } else if (tn === $.SELECT && p.openElements.hasInSelectScope($.SELECT)) {
        p.openElements.popUntilTagNamePopped($.SELECT);
        p._resetInsertionMode();
      } else if (tn === $.TEMPLATE)
        endTagInHead(p, token);
    }
    function startTagInSelectInTable(p, token) {
      var tn = token.tagName;
      if (tn === $.CAPTION || tn === $.TABLE || tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD || tn === $.TR || tn === $.TD || tn === $.TH) {
        p.openElements.popUntilTagNamePopped($.SELECT);
        p._resetInsertionMode();
        p._processToken(token);
      } else
        startTagInSelect(p, token);
    }
    function endTagInSelectInTable(p, token) {
      var tn = token.tagName;
      if (tn === $.CAPTION || tn === $.TABLE || tn === $.TBODY || tn === $.TFOOT || tn === $.THEAD || tn === $.TR || tn === $.TD || tn === $.TH) {
        if (p.openElements.hasInTableScope(tn)) {
          p.openElements.popUntilTagNamePopped($.SELECT);
          p._resetInsertionMode();
          p._processToken(token);
        }
      } else
        endTagInSelect(p, token);
    }
    function startTagInTemplate(p, token) {
      var tn = token.tagName;
      if (tn === $.BASE || tn === $.BASEFONT || tn === $.BGSOUND || tn === $.LINK || tn === $.META || tn === $.NOFRAMES || tn === $.SCRIPT || tn === $.STYLE || tn === $.TEMPLATE || tn === $.TITLE)
        startTagInHead(p, token);
      else {
        var newInsertionMode = TEMPLATE_INSERTION_MODE_SWITCH_MAP[tn] || IN_BODY_MODE;
        p._popTmplInsertionMode();
        p._pushTmplInsertionMode(newInsertionMode);
        p.insertionMode = newInsertionMode;
        p._processToken(token);
      }
    }
    function endTagInTemplate(p, token) {
      if (token.tagName === $.TEMPLATE)
        endTagInHead(p, token);
    }
    function eofInTemplate(p, token) {
      if (p.openElements.tmplCount > 0) {
        p.openElements.popUntilTagNamePopped($.TEMPLATE);
        p.activeFormattingElements.clearToLastMarker();
        p._popTmplInsertionMode();
        p._resetInsertionMode();
        p._processToken(token);
      } else
        p.stopped = true;
    }
    function startTagAfterBody(p, token) {
      if (token.tagName === $.HTML)
        startTagInBody(p, token);
      else
        tokenAfterBody(p, token);
    }
    function endTagAfterBody(p, token) {
      if (token.tagName === $.HTML) {
        if (!p.fragmentContext)
          p.insertionMode = AFTER_AFTER_BODY_MODE;
      } else
        tokenAfterBody(p, token);
    }
    function tokenAfterBody(p, token) {
      p.insertionMode = IN_BODY_MODE;
      p._processToken(token);
    }
    function startTagInFrameset(p, token) {
      var tn = token.tagName;
      if (tn === $.HTML)
        startTagInBody(p, token);
      else if (tn === $.FRAMESET)
        p._insertElement(token, NS.HTML);
      else if (tn === $.FRAME)
        p._appendElement(token, NS.HTML);
      else if (tn === $.NOFRAMES)
        startTagInHead(p, token);
    }
    function endTagInFrameset(p, token) {
      if (token.tagName === $.FRAMESET && !p.openElements.isRootHtmlElementCurrent()) {
        p.openElements.pop();
        if (!p.fragmentContext && p.openElements.currentTagName !== $.FRAMESET)
          p.insertionMode = AFTER_FRAMESET_MODE;
      }
    }
    function startTagAfterFrameset(p, token) {
      var tn = token.tagName;
      if (tn === $.HTML)
        startTagInBody(p, token);
      else if (tn === $.NOFRAMES)
        startTagInHead(p, token);
    }
    function endTagAfterFrameset(p, token) {
      if (token.tagName === $.HTML)
        p.insertionMode = AFTER_AFTER_FRAMESET_MODE;
    }
    function startTagAfterAfterBody(p, token) {
      if (token.tagName === $.HTML)
        startTagInBody(p, token);
      else
        tokenAfterAfterBody(p, token);
    }
    function tokenAfterAfterBody(p, token) {
      p.insertionMode = IN_BODY_MODE;
      p._processToken(token);
    }
    function startTagAfterAfterFrameset(p, token) {
      var tn = token.tagName;
      if (tn === $.HTML)
        startTagInBody(p, token);
      else if (tn === $.NOFRAMES)
        startTagInHead(p, token);
    }
    function nullCharacterInForeignContent(p, token) {
      token.chars = UNICODE.REPLACEMENT_CHARACTER;
      p._insertCharacters(token);
    }
    function characterInForeignContent(p, token) {
      p._insertCharacters(token);
      p.framesetOk = false;
    }
    function startTagInForeignContent(p, token) {
      if (foreignContent.causesExit(token) && !p.fragmentContext) {
        while (p.treeAdapter.getNamespaceURI(p.openElements.current) !== NS.HTML && !p._isIntegrationPoint(p.openElements.current))
          p.openElements.pop();
        p._processToken(token);
      } else {
        var current = p._getAdjustedCurrentElement(), currentNs = p.treeAdapter.getNamespaceURI(current);
        if (currentNs === NS.MATHML)
          foreignContent.adjustTokenMathMLAttrs(token);
        else if (currentNs === NS.SVG) {
          foreignContent.adjustTokenSVGTagName(token);
          foreignContent.adjustTokenSVGAttrs(token);
        }
        foreignContent.adjustTokenXMLAttrs(token);
        if (token.selfClosing)
          p._appendElement(token, currentNs);
        else
          p._insertElement(token, currentNs);
      }
    }
    function endTagInForeignContent(p, token) {
      for (var i = p.openElements.stackTop; i > 0; i--) {
        var element = p.openElements.items[i];
        if (p.treeAdapter.getNamespaceURI(element) === NS.HTML) {
          p._processToken(token);
          break;
        }
        if (p.treeAdapter.getTagName(element).toLowerCase() === token.tagName) {
          p.openElements.popUntilElementPopped(element);
          break;
        }
      }
    }
  });

  // node_modules/parse5/lib/serializer/index.js
  var require_serializer = __commonJS((exports2, module2) => {
    "use strict";
    var defaultTreeAdapter = require_default();
    var mergeOptions = require_merge_options();
    var doctype = require_doctype();
    var HTML = require_html();
    var $ = HTML.TAG_NAMES;
    var NS = HTML.NAMESPACES;
    var DEFAULT_OPTIONS = {
      treeAdapter: defaultTreeAdapter
    };
    var AMP_REGEX = /&/g;
    var NBSP_REGEX = /\u00a0/g;
    var DOUBLE_QUOTE_REGEX = /"/g;
    var LT_REGEX = /</g;
    var GT_REGEX = />/g;
    var Serializer = module2.exports = function(node2, options) {
      this.options = mergeOptions(DEFAULT_OPTIONS, options);
      this.treeAdapter = this.options.treeAdapter;
      this.html = "";
      this.startNode = node2;
    };
    Serializer.escapeString = function(str, attrMode) {
      str = str.replace(AMP_REGEX, "&amp;").replace(NBSP_REGEX, "&nbsp;");
      if (attrMode)
        str = str.replace(DOUBLE_QUOTE_REGEX, "&quot;");
      else {
        str = str.replace(LT_REGEX, "&lt;").replace(GT_REGEX, "&gt;");
      }
      return str;
    };
    Serializer.prototype.serialize = function() {
      this._serializeChildNodes(this.startNode);
      return this.html;
    };
    Serializer.prototype._serializeChildNodes = function(parentNode) {
      var childNodes = this.treeAdapter.getChildNodes(parentNode);
      if (childNodes) {
        for (var i = 0, cnLength = childNodes.length; i < cnLength; i++) {
          var currentNode = childNodes[i];
          if (this.treeAdapter.isElementNode(currentNode))
            this._serializeElement(currentNode);
          else if (this.treeAdapter.isTextNode(currentNode))
            this._serializeTextNode(currentNode);
          else if (this.treeAdapter.isCommentNode(currentNode))
            this._serializeCommentNode(currentNode);
          else if (this.treeAdapter.isDocumentTypeNode(currentNode))
            this._serializeDocumentTypeNode(currentNode);
        }
      }
    };
    Serializer.prototype._serializeElement = function(node2) {
      var tn = this.treeAdapter.getTagName(node2), ns = this.treeAdapter.getNamespaceURI(node2);
      this.html += "<" + tn;
      this._serializeAttributes(node2);
      this.html += ">";
      if (tn !== $.AREA && tn !== $.BASE && tn !== $.BASEFONT && tn !== $.BGSOUND && tn !== $.BR && tn !== $.BR && tn !== $.COL && tn !== $.EMBED && tn !== $.FRAME && tn !== $.HR && tn !== $.IMG && tn !== $.INPUT && tn !== $.KEYGEN && tn !== $.LINK && tn !== $.MENUITEM && tn !== $.META && tn !== $.PARAM && tn !== $.SOURCE && tn !== $.TRACK && tn !== $.WBR) {
        var childNodesHolder = tn === $.TEMPLATE && ns === NS.HTML ? this.treeAdapter.getTemplateContent(node2) : node2;
        this._serializeChildNodes(childNodesHolder);
        this.html += "</" + tn + ">";
      }
    };
    Serializer.prototype._serializeAttributes = function(node2) {
      var attrs = this.treeAdapter.getAttrList(node2);
      for (var i = 0, attrsLength = attrs.length; i < attrsLength; i++) {
        var attr = attrs[i], value = Serializer.escapeString(attr.value, true);
        this.html += " ";
        if (!attr.namespace)
          this.html += attr.name;
        else if (attr.namespace === NS.XML)
          this.html += "xml:" + attr.name;
        else if (attr.namespace === NS.XMLNS) {
          if (attr.name !== "xmlns")
            this.html += "xmlns:";
          this.html += attr.name;
        } else if (attr.namespace === NS.XLINK)
          this.html += "xlink:" + attr.name;
        else
          this.html += attr.namespace + ":" + attr.name;
        this.html += '="' + value + '"';
      }
    };
    Serializer.prototype._serializeTextNode = function(node2) {
      var content = this.treeAdapter.getTextNodeContent(node2), parent = this.treeAdapter.getParentNode(node2), parentTn = void 0;
      if (parent && this.treeAdapter.isElementNode(parent))
        parentTn = this.treeAdapter.getTagName(parent);
      if (parentTn === $.STYLE || parentTn === $.SCRIPT || parentTn === $.XMP || parentTn === $.IFRAME || parentTn === $.NOEMBED || parentTn === $.NOFRAMES || parentTn === $.PLAINTEXT || parentTn === $.NOSCRIPT)
        this.html += content;
      else
        this.html += Serializer.escapeString(content, false);
    };
    Serializer.prototype._serializeCommentNode = function(node2) {
      this.html += "<!--" + this.treeAdapter.getCommentNodeContent(node2) + "-->";
    };
    Serializer.prototype._serializeDocumentTypeNode = function(node2) {
      var name = this.treeAdapter.getDocumentTypeNodeName(node2);
      this.html += "<" + doctype.serializeContent(name, null, null) + ">";
    };
  });

  // node_modules/parse5/lib/tree_adapters/htmlparser2.js
  var require_htmlparser2 = __commonJS((exports2) => {
    "use strict";
    var doctype = require_doctype();
    var DOCUMENT_MODE = require_html().DOCUMENT_MODE;
    var nodeTypes = {
      element: 1,
      text: 3,
      cdata: 4,
      comment: 8
    };
    var nodePropertyShorthands = {
      tagName: "name",
      childNodes: "children",
      parentNode: "parent",
      previousSibling: "prev",
      nextSibling: "next",
      nodeValue: "data"
    };
    var Node = function(props) {
      for (var key in props) {
        if (props.hasOwnProperty(key))
          this[key] = props[key];
      }
    };
    Node.prototype = {
      get firstChild() {
        var children = this.children;
        return children && children[0] || null;
      },
      get lastChild() {
        var children = this.children;
        return children && children[children.length - 1] || null;
      },
      get nodeType() {
        return nodeTypes[this.type] || nodeTypes.element;
      }
    };
    Object.keys(nodePropertyShorthands).forEach(function(key) {
      var shorthand = nodePropertyShorthands[key];
      Object.defineProperty(Node.prototype, key, {
        get: function() {
          return this[shorthand] || null;
        },
        set: function(val) {
          this[shorthand] = val;
          return val;
        }
      });
    });
    exports2.createDocument = function() {
      return new Node({
        type: "root",
        name: "root",
        parent: null,
        prev: null,
        next: null,
        children: [],
        "x-mode": DOCUMENT_MODE.NO_QUIRKS
      });
    };
    exports2.createDocumentFragment = function() {
      return new Node({
        type: "root",
        name: "root",
        parent: null,
        prev: null,
        next: null,
        children: []
      });
    };
    exports2.createElement = function(tagName, namespaceURI, attrs) {
      var attribs = Object.create(null), attribsNamespace = Object.create(null), attribsPrefix = Object.create(null);
      for (var i = 0; i < attrs.length; i++) {
        var attrName = attrs[i].name;
        attribs[attrName] = attrs[i].value;
        attribsNamespace[attrName] = attrs[i].namespace;
        attribsPrefix[attrName] = attrs[i].prefix;
      }
      return new Node({
        type: tagName === "script" || tagName === "style" ? tagName : "tag",
        name: tagName,
        namespace: namespaceURI,
        attribs,
        "x-attribsNamespace": attribsNamespace,
        "x-attribsPrefix": attribsPrefix,
        children: [],
        parent: null,
        prev: null,
        next: null
      });
    };
    exports2.createCommentNode = function(data) {
      return new Node({
        type: "comment",
        data,
        parent: null,
        prev: null,
        next: null
      });
    };
    var createTextNode = function(value) {
      return new Node({
        type: "text",
        data: value,
        parent: null,
        prev: null,
        next: null
      });
    };
    var appendChild = exports2.appendChild = function(parentNode, newNode) {
      var prev = parentNode.children[parentNode.children.length - 1];
      if (prev) {
        prev.next = newNode;
        newNode.prev = prev;
      }
      parentNode.children.push(newNode);
      newNode.parent = parentNode;
    };
    var insertBefore = exports2.insertBefore = function(parentNode, newNode, referenceNode) {
      var insertionIdx = parentNode.children.indexOf(referenceNode), prev = referenceNode.prev;
      if (prev) {
        prev.next = newNode;
        newNode.prev = prev;
      }
      referenceNode.prev = newNode;
      newNode.next = referenceNode;
      parentNode.children.splice(insertionIdx, 0, newNode);
      newNode.parent = parentNode;
    };
    exports2.setTemplateContent = function(templateElement, contentElement) {
      appendChild(templateElement, contentElement);
    };
    exports2.getTemplateContent = function(templateElement) {
      return templateElement.children[0];
    };
    exports2.setDocumentType = function(document2, name, publicId, systemId) {
      var data = doctype.serializeContent(name, publicId, systemId), doctypeNode = null;
      for (var i = 0; i < document2.children.length; i++) {
        if (document2.children[i].type === "directive" && document2.children[i].name === "!doctype") {
          doctypeNode = document2.children[i];
          break;
        }
      }
      if (doctypeNode) {
        doctypeNode.data = data;
        doctypeNode["x-name"] = name;
        doctypeNode["x-publicId"] = publicId;
        doctypeNode["x-systemId"] = systemId;
      } else {
        appendChild(document2, new Node({
          type: "directive",
          name: "!doctype",
          data,
          "x-name": name,
          "x-publicId": publicId,
          "x-systemId": systemId
        }));
      }
    };
    exports2.setDocumentMode = function(document2, mode) {
      document2["x-mode"] = mode;
    };
    exports2.getDocumentMode = function(document2) {
      return document2["x-mode"];
    };
    exports2.detachNode = function(node2) {
      if (node2.parent) {
        var idx = node2.parent.children.indexOf(node2), prev = node2.prev, next = node2.next;
        node2.prev = null;
        node2.next = null;
        if (prev)
          prev.next = next;
        if (next)
          next.prev = prev;
        node2.parent.children.splice(idx, 1);
        node2.parent = null;
      }
    };
    exports2.insertText = function(parentNode, text) {
      var lastChild = parentNode.children[parentNode.children.length - 1];
      if (lastChild && lastChild.type === "text")
        lastChild.data += text;
      else
        appendChild(parentNode, createTextNode(text));
    };
    exports2.insertTextBefore = function(parentNode, text, referenceNode) {
      var prevNode = parentNode.children[parentNode.children.indexOf(referenceNode) - 1];
      if (prevNode && prevNode.type === "text")
        prevNode.data += text;
      else
        insertBefore(parentNode, createTextNode(text), referenceNode);
    };
    exports2.adoptAttributes = function(recipient, attrs) {
      for (var i = 0; i < attrs.length; i++) {
        var attrName = attrs[i].name;
        if (typeof recipient.attribs[attrName] === "undefined") {
          recipient.attribs[attrName] = attrs[i].value;
          recipient["x-attribsNamespace"][attrName] = attrs[i].namespace;
          recipient["x-attribsPrefix"][attrName] = attrs[i].prefix;
        }
      }
    };
    exports2.getFirstChild = function(node2) {
      return node2.children[0];
    };
    exports2.getChildNodes = function(node2) {
      return node2.children;
    };
    exports2.getParentNode = function(node2) {
      return node2.parent;
    };
    exports2.getAttrList = function(element) {
      var attrList = [];
      for (var name in element.attribs) {
        attrList.push({
          name,
          value: element.attribs[name],
          namespace: element["x-attribsNamespace"][name],
          prefix: element["x-attribsPrefix"][name]
        });
      }
      return attrList;
    };
    exports2.getTagName = function(element) {
      return element.name;
    };
    exports2.getNamespaceURI = function(element) {
      return element.namespace;
    };
    exports2.getTextNodeContent = function(textNode) {
      return textNode.data;
    };
    exports2.getCommentNodeContent = function(commentNode) {
      return commentNode.data;
    };
    exports2.getDocumentTypeNodeName = function(doctypeNode) {
      return doctypeNode["x-name"];
    };
    exports2.getDocumentTypeNodePublicId = function(doctypeNode) {
      return doctypeNode["x-publicId"];
    };
    exports2.getDocumentTypeNodeSystemId = function(doctypeNode) {
      return doctypeNode["x-systemId"];
    };
    exports2.isTextNode = function(node2) {
      return node2.type === "text";
    };
    exports2.isCommentNode = function(node2) {
      return node2.type === "comment";
    };
    exports2.isDocumentTypeNode = function(node2) {
      return node2.type === "directive" && node2.name === "!doctype";
    };
    exports2.isElementNode = function(node2) {
      return !!node2.attribs;
    };
  });

  // node_modules/events/events.js
  var require_events = __commonJS((exports2, module2) => {
    "use strict";
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn)
        console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter() {
      EventEmitter.init.call(this);
    }
    module2.exports = EventEmitter;
    module2.exports.once = once;
    EventEmitter.EventEmitter = EventEmitter;
    EventEmitter.prototype._events = void 0;
    EventEmitter.prototype._eventsCount = 0;
    EventEmitter.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter.prototype.emit = function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++)
        args.push(arguments[i]);
      var doError = type === "error";
      var events = this._events;
      if (events !== void 0)
        doError = doError && events.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er;
        if (args.length > 0)
          er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err;
      }
      var handler = events[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          ReflectApply(listeners[i], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m;
      var events;
      var existing;
      checkListener(listener);
      events = target._events;
      if (events === void 0) {
        events = target._events = Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events.newListener !== void 0) {
          target.emit("newListener", type, listener.listener ? listener.listener : listener);
          events = target._events;
        }
        existing = events[type];
      }
      if (existing === void 0) {
        existing = events[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    EventEmitter.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter.prototype.on = EventEmitter.prototype.addListener;
    EventEmitter.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = {fired: false, wrapFn: void 0, target, type, listener};
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter.prototype.removeListener = function removeListener(type, listener) {
      var list, events, position, i, originalListener;
      checkListener(listener);
      events = this._events;
      if (events === void 0)
        return this;
      list = events[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events[type] = list[0];
        if (events.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events, i;
      events = this._events;
      if (events === void 0)
        return this;
      if (events.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener")
            continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events = target._events;
      if (events === void 0)
        return [];
      var evlistener = events[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events = this._events;
      if (events !== void 0) {
        var evlistener = events[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    function once(emitter, name) {
      return new Promise(function(resolve, reject) {
        function eventListener() {
          if (errorListener !== void 0) {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        ;
        var errorListener;
        if (name !== "error") {
          errorListener = function errorListener2(err) {
            emitter.removeListener(name, eventListener);
            reject(err);
          };
          emitter.once("error", errorListener);
        }
        emitter.once(name, eventListener);
      });
    }
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/stream-browser.js
  var require_stream_browser = __commonJS((exports2, module2) => {
    module2.exports = require_events().EventEmitter;
  });

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS((exports2) => {
    "use strict";
    exports2.byteLength = byteLength;
    exports2.toByteArray = toByteArray;
    exports2.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
      }
      return parts.join("");
    }
  });

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS((exports2) => {
    /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
    exports2.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports2.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    };
  });

  // node_modules/buffer/index.js
  var require_buffer = __commonJS((exports2) => {
    /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */
    "use strict";
    const base64 = require_base64_js();
    const ieee754 = require_ieee754();
    const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports2.Buffer = Buffer2;
    exports2.SlowBuffer = SlowBuffer;
    exports2.INSPECT_MAX_BYTES = 50;
    const K_MAX_LENGTH = 2147483647;
    exports2.kMaxLength = K_MAX_LENGTH;
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = {foo: function() {
          return 42;
        }};
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer2.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this))
          return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer2.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this))
          return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function Buffer2(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError('The "string" argument must be of type string. Received type number');
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer2.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError('The "value" argument must not be of type number. Received type number');
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer2.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b)
        return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    }
    Buffer2.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer2, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer2.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer2.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer2.alloc(+length);
    }
    Buffer2.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer2.prototype;
    };
    Buffer2.compare = function compare(a, b) {
      if (isInstance(a, Uint8Array))
        a = Buffer2.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array))
        b = Buffer2.from(b, b.offset, b.byteLength);
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      }
      if (a === b)
        return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer2.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer = Buffer2.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer2.isBuffer(buf))
              buf = Buffer2.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(buffer, buf, pos);
          }
        } else if (!Buffer2.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (Buffer2.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0)
        return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding)
        encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer2.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
    Buffer2.prototype.equals = function equals(b) {
      if (!Buffer2.isBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b)
        return true;
      return Buffer2.compare(this, b) === 0;
    };
    Buffer2.prototype.inspect = function inspect() {
      let str = "";
      const max = exports2.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max)
        str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
    }
    Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength);
      }
      if (!Buffer2.isBuffer(target)) {
        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0)
        return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0)
        byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val === "string") {
        val = Buffer2.from(val, encoding);
      }
      if (Buffer2.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i;
            if (i - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found)
            return i;
        }
      }
      return -1;
    }
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed))
          return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer2.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    const MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len)
        end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer2.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer2.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer2.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
      if (offset < 0)
        throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target))
        throw new TypeError("argument should be a Buffer");
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("Index out of range");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
      }
      return len;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    const errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E("ERR_BUFFER_OUT_OF_BOUNDS", function(name) {
      if (name) {
        return `${name} is outside of buffer bounds`;
      }
      return "Attempt to access memory outside buffer bounds";
    }, RangeError);
    E("ERR_INVALID_ARG_TYPE", function(name, actual) {
      return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
    }, TypeError);
    E("ERR_OUT_OF_RANGE", function(str, range, input) {
      let msg = `The value of "${str}" is out of range.`;
      let received = input;
      if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input));
      } else if (typeof input === "bigint") {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
          received = addNumericalSeparator(received);
        }
        received += "n";
      }
      msg += ` It must be ${range}. Received ${received}`;
      return msg;
    }, RangeError);
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength2);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length}`, value);
    }
    const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2)
        return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0)
          break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length)
          break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    const hexSliceLookupTable = function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  });

  // empty:/Volumes/DUMBLEDORE1/Users/fficnar/Projects/Shared Projects/mablung-pug/node_modules/util/util.js
  var require_util2 = __commonJS(() => {
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/buffer_list.js
  var require_buffer_list = __commonJS((exports2, module2) => {
    "use strict";
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {value, enumerable: true, configurable: true, writable: true});
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var _require = require_buffer();
    var Buffer2 = _require.Buffer;
    var _require2 = require_util2();
    var inspect = _require2.inspect;
    var custom = inspect && inspect.custom || "inspect";
    function copyBuffer(src, target, offset) {
      Buffer2.prototype.copy.call(src, target, offset);
    }
    module2.exports = /* @__PURE__ */ function() {
      function BufferList() {
        _classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      _createClass(BufferList, [{
        key: "push",
        value: function push(v) {
          var entry = {
            data: v,
            next: null
          };
          if (this.length > 0)
            this.tail.next = entry;
          else
            this.head = entry;
          this.tail = entry;
          ++this.length;
        }
      }, {
        key: "unshift",
        value: function unshift(v) {
          var entry = {
            data: v,
            next: this.head
          };
          if (this.length === 0)
            this.tail = entry;
          this.head = entry;
          ++this.length;
        }
      }, {
        key: "shift",
        value: function shift() {
          if (this.length === 0)
            return;
          var ret = this.head.data;
          if (this.length === 1)
            this.head = this.tail = null;
          else
            this.head = this.head.next;
          --this.length;
          return ret;
        }
      }, {
        key: "clear",
        value: function clear() {
          this.head = this.tail = null;
          this.length = 0;
        }
      }, {
        key: "join",
        value: function join(s) {
          if (this.length === 0)
            return "";
          var p = this.head;
          var ret = "" + p.data;
          while (p = p.next) {
            ret += s + p.data;
          }
          return ret;
        }
      }, {
        key: "concat",
        value: function concat(n) {
          if (this.length === 0)
            return Buffer2.alloc(0);
          var ret = Buffer2.allocUnsafe(n >>> 0);
          var p = this.head;
          var i = 0;
          while (p) {
            copyBuffer(p.data, ret, i);
            i += p.data.length;
            p = p.next;
          }
          return ret;
        }
      }, {
        key: "consume",
        value: function consume(n, hasStrings) {
          var ret;
          if (n < this.head.data.length) {
            ret = this.head.data.slice(0, n);
            this.head.data = this.head.data.slice(n);
          } else if (n === this.head.data.length) {
            ret = this.shift();
          } else {
            ret = hasStrings ? this._getString(n) : this._getBuffer(n);
          }
          return ret;
        }
      }, {
        key: "first",
        value: function first() {
          return this.head.data;
        }
      }, {
        key: "_getString",
        value: function _getString(n) {
          var p = this.head;
          var c = 1;
          var ret = p.data;
          n -= ret.length;
          while (p = p.next) {
            var str = p.data;
            var nb = n > str.length ? str.length : n;
            if (nb === str.length)
              ret += str;
            else
              ret += str.slice(0, n);
            n -= nb;
            if (n === 0) {
              if (nb === str.length) {
                ++c;
                if (p.next)
                  this.head = p.next;
                else
                  this.head = this.tail = null;
              } else {
                this.head = p;
                p.data = str.slice(nb);
              }
              break;
            }
            ++c;
          }
          this.length -= c;
          return ret;
        }
      }, {
        key: "_getBuffer",
        value: function _getBuffer(n) {
          var ret = Buffer2.allocUnsafe(n);
          var p = this.head;
          var c = 1;
          p.data.copy(ret);
          n -= p.data.length;
          while (p = p.next) {
            var buf = p.data;
            var nb = n > buf.length ? buf.length : n;
            buf.copy(ret, ret.length - n, 0, nb);
            n -= nb;
            if (n === 0) {
              if (nb === buf.length) {
                ++c;
                if (p.next)
                  this.head = p.next;
                else
                  this.head = this.tail = null;
              } else {
                this.head = p;
                p.data = buf.slice(nb);
              }
              break;
            }
            ++c;
          }
          this.length -= c;
          return ret;
        }
      }, {
        key: custom,
        value: function value(_, options) {
          return inspect(this, _objectSpread({}, options, {
            depth: 0,
            customInspect: false
          }));
        }
      }]);
      return BufferList;
    }();
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/destroy.js
  var require_destroy = __commonJS((exports2, module2) => {
    "use strict";
    function destroy(err, cb) {
      var _this = this;
      var readableDestroyed = this._readableState && this._readableState.destroyed;
      var writableDestroyed = this._writableState && this._writableState.destroyed;
      if (readableDestroyed || writableDestroyed) {
        if (cb) {
          cb(err);
        } else if (err) {
          if (!this._writableState) {
            "process".nextTick(emitErrorNT, this, err);
          } else if (!this._writableState.errorEmitted) {
            this._writableState.errorEmitted = true;
            "process".nextTick(emitErrorNT, this, err);
          }
        }
        return this;
      }
      if (this._readableState) {
        this._readableState.destroyed = true;
      }
      if (this._writableState) {
        this._writableState.destroyed = true;
      }
      this._destroy(err || null, function(err2) {
        if (!cb && err2) {
          if (!_this._writableState) {
            "process".nextTick(emitErrorAndCloseNT, _this, err2);
          } else if (!_this._writableState.errorEmitted) {
            _this._writableState.errorEmitted = true;
            "process".nextTick(emitErrorAndCloseNT, _this, err2);
          } else {
            "process".nextTick(emitCloseNT, _this);
          }
        } else if (cb) {
          "process".nextTick(emitCloseNT, _this);
          cb(err2);
        } else {
          "process".nextTick(emitCloseNT, _this);
        }
      });
      return this;
    }
    function emitErrorAndCloseNT(self, err) {
      emitErrorNT(self, err);
      emitCloseNT(self);
    }
    function emitCloseNT(self) {
      if (self._writableState && !self._writableState.emitClose)
        return;
      if (self._readableState && !self._readableState.emitClose)
        return;
      self.emit("close");
    }
    function undestroy() {
      if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
      }
      if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
      }
    }
    function emitErrorNT(self, err) {
      self.emit("error", err);
    }
    function errorOrDestroy(stream, err) {
      var rState = stream._readableState;
      var wState = stream._writableState;
      if (rState && rState.autoDestroy || wState && wState.autoDestroy)
        stream.destroy(err);
      else
        stream.emit("error", err);
    }
    module2.exports = {
      destroy,
      undestroy,
      errorOrDestroy
    };
  });

  // node_modules/stream-browserify/node_modules/readable-stream/errors.js
  var require_errors = __commonJS((exports2, module2) => {
    "use strict";
    const codes = {};
    function createErrorType(code, message, Base) {
      if (!Base) {
        Base = Error;
      }
      function getMessage(arg1, arg2, arg3) {
        if (typeof message === "string") {
          return message;
        } else {
          return message(arg1, arg2, arg3);
        }
      }
      class NodeError extends Base {
        constructor(arg1, arg2, arg3) {
          super(getMessage(arg1, arg2, arg3));
        }
      }
      NodeError.prototype.name = Base.name;
      NodeError.prototype.code = code;
      codes[code] = NodeError;
    }
    function oneOf(expected, thing) {
      if (Array.isArray(expected)) {
        const len = expected.length;
        expected = expected.map((i) => String(i));
        if (len > 2) {
          return `one of ${thing} ${expected.slice(0, len - 1).join(", ")}, or ` + expected[len - 1];
        } else if (len === 2) {
          return `one of ${thing} ${expected[0]} or ${expected[1]}`;
        } else {
          return `of ${thing} ${expected[0]}`;
        }
      } else {
        return `of ${thing} ${String(expected)}`;
      }
    }
    function startsWith(str, search, pos) {
      return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
    function endsWith(str, search, this_len) {
      if (this_len === void 0 || this_len > str.length) {
        this_len = str.length;
      }
      return str.substring(this_len - search.length, this_len) === search;
    }
    function includes(str, search, start) {
      if (typeof start !== "number") {
        start = 0;
      }
      if (start + search.length > str.length) {
        return false;
      } else {
        return str.indexOf(search, start) !== -1;
      }
    }
    createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
      return 'The value "' + value + '" is invalid for option "' + name + '"';
    }, TypeError);
    createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
      let determiner;
      if (typeof expected === "string" && startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
      } else {
        determiner = "must be";
      }
      let msg;
      if (endsWith(name, " argument")) {
        msg = `The ${name} ${determiner} ${oneOf(expected, "type")}`;
      } else {
        const type = includes(name, ".") ? "property" : "argument";
        msg = `The "${name}" ${type} ${determiner} ${oneOf(expected, "type")}`;
      }
      msg += `. Received type ${typeof actual}`;
      return msg;
    }, TypeError);
    createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
    createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
      return "The " + name + " method is not implemented";
    });
    createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
    createErrorType("ERR_STREAM_DESTROYED", function(name) {
      return "Cannot call " + name + " after a stream was destroyed";
    });
    createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
    createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
    createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
    createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
      return "Unknown encoding: " + arg;
    }, TypeError);
    createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
    module2.exports.codes = codes;
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/state.js
  var require_state = __commonJS((exports2, module2) => {
    "use strict";
    var ERR_INVALID_OPT_VALUE = require_errors().codes.ERR_INVALID_OPT_VALUE;
    function highWaterMarkFrom(options, isDuplex, duplexKey) {
      return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
    }
    function getHighWaterMark(state, options, duplexKey, isDuplex) {
      var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
      if (hwm != null) {
        if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
          var name = isDuplex ? duplexKey : "highWaterMark";
          throw new ERR_INVALID_OPT_VALUE(name, hwm);
        }
        return Math.floor(hwm);
      }
      return state.objectMode ? 16 : 16 * 1024;
    }
    module2.exports = {
      getHighWaterMark
    };
  });

  // node_modules/util-deprecate/browser.js
  var require_browser = __commonJS((exports2, module2) => {
    module2.exports = deprecate;
    function deprecate(fn, msg) {
      if (config("noDeprecation")) {
        return fn;
      }
      var warned = false;
      function deprecated() {
        if (!warned) {
          if (config("throwDeprecation")) {
            throw new Error(msg);
          } else if (config("traceDeprecation")) {
            console.trace(msg);
          } else {
            console.warn(msg);
          }
          warned = true;
        }
        return fn.apply(this, arguments);
      }
      return deprecated;
    }
    function config(name) {
      try {
        if (!"global".localStorage)
          return false;
      } catch (_) {
        return false;
      }
      var val = "global".localStorage[name];
      if (val == null)
        return false;
      return String(val).toLowerCase() === "true";
    }
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_writable.js
  var require_stream_writable = __commonJS((exports2, module2) => {
    "use strict";
    module2.exports = Writable;
    function CorkedRequest(state) {
      var _this = this;
      this.next = null;
      this.entry = null;
      this.finish = function() {
        onCorkedFinish(_this, state);
      };
    }
    var Duplex;
    Writable.WritableState = WritableState;
    var internalUtil = {
      deprecate: require_browser()
    };
    var Stream = require_stream_browser();
    var Buffer2 = require_buffer().Buffer;
    var OurUint8Array = "global".Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer2.from(chunk);
    }
    function _isUint8Array(obj) {
      return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var destroyImpl = require_destroy();
    var _require = require_state();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    var ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES;
    var ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END;
    var ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    require_inherits_browser()(Writable, Stream);
    function nop() {
    }
    function WritableState(options, stream, isDuplex) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      if (typeof isDuplex !== "boolean")
        isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.writableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
      this.finalCalled = false;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      this.destroyed = false;
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = function(er) {
        onwrite(stream, er);
      };
      this.writecb = null;
      this.writelen = 0;
      this.bufferedRequest = null;
      this.lastBufferedRequest = null;
      this.pendingcb = 0;
      this.prefinished = false;
      this.errorEmitted = false;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.bufferedRequestCount = 0;
      this.corkedRequestsFree = new CorkedRequest(this);
    }
    WritableState.prototype.getBuffer = function getBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    };
    (function() {
      try {
        Object.defineProperty(WritableState.prototype, "buffer", {
          get: internalUtil.deprecate(function writableStateBufferGetter() {
            return this.getBuffer();
          }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
        });
      } catch (_) {
      }
    })();
    var realHasInstance;
    if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
      realHasInstance = Function.prototype[Symbol.hasInstance];
      Object.defineProperty(Writable, Symbol.hasInstance, {
        value: function value(object) {
          if (realHasInstance.call(this, object))
            return true;
          if (this !== Writable)
            return false;
          return object && object._writableState instanceof WritableState;
        }
      });
    } else {
      realHasInstance = function realHasInstance2(object) {
        return object instanceof this;
      };
    }
    function Writable(options) {
      Duplex = Duplex || require_stream_duplex();
      var isDuplex = this instanceof Duplex;
      if (!isDuplex && !realHasInstance.call(Writable, this))
        return new Writable(options);
      this._writableState = new WritableState(options, this, isDuplex);
      this.writable = true;
      if (options) {
        if (typeof options.write === "function")
          this._write = options.write;
        if (typeof options.writev === "function")
          this._writev = options.writev;
        if (typeof options.destroy === "function")
          this._destroy = options.destroy;
        if (typeof options.final === "function")
          this._final = options.final;
      }
      Stream.call(this);
    }
    Writable.prototype.pipe = function() {
      errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
    };
    function writeAfterEnd(stream, cb) {
      var er = new ERR_STREAM_WRITE_AFTER_END();
      errorOrDestroy(stream, er);
      "process".nextTick(cb, er);
    }
    function validChunk(stream, state, chunk, cb) {
      var er;
      if (chunk === null) {
        er = new ERR_STREAM_NULL_VALUES();
      } else if (typeof chunk !== "string" && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
      }
      if (er) {
        errorOrDestroy(stream, er);
        "process".nextTick(cb, er);
        return false;
      }
      return true;
    }
    Writable.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
      var isBuf = !state.objectMode && _isUint8Array(chunk);
      if (isBuf && !Buffer2.isBuffer(chunk)) {
        chunk = _uint8ArrayToBuffer(chunk);
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (isBuf)
        encoding = "buffer";
      else if (!encoding)
        encoding = state.defaultEncoding;
      if (typeof cb !== "function")
        cb = nop;
      if (state.ending)
        writeAfterEnd(this, cb);
      else if (isBuf || validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
      }
      return ret;
    };
    Writable.prototype.cork = function() {
      this._writableState.corked++;
    };
    Writable.prototype.uncork = function() {
      var state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest)
          clearBuffer(this, state);
      }
    };
    Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      if (typeof encoding === "string")
        encoding = encoding.toLowerCase();
      if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
        throw new ERR_UNKNOWN_ENCODING(encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };
    Object.defineProperty(Writable.prototype, "writableBuffer", {
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
        chunk = Buffer2.from(chunk, encoding);
      }
      return chunk;
    }
    Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
      if (!isBuf) {
        var newChunk = decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
          isBuf = true;
          encoding = "buffer";
          chunk = newChunk;
        }
      }
      var len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      var ret = state.length < state.highWaterMark;
      if (!ret)
        state.needDrain = true;
      if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
          chunk,
          encoding,
          isBuf,
          callback: cb,
          next: null
        };
        if (last) {
          last.next = state.lastBufferedRequest;
        } else {
          state.bufferedRequest = state.lastBufferedRequest;
        }
        state.bufferedRequestCount += 1;
      } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
      }
      return ret;
    }
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (state.destroyed)
        state.onwrite(new ERR_STREAM_DESTROYED("write"));
      else if (writev)
        stream._writev(chunk, state.onwrite);
      else
        stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    function onwriteError(stream, state, sync, er, cb) {
      --state.pendingcb;
      if (sync) {
        "process".nextTick(cb, er);
        "process".nextTick(finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
      } else {
        cb(er);
        stream._writableState.errorEmitted = true;
        errorOrDestroy(stream, er);
        finishMaybe(stream, state);
      }
    }
    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }
    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
      if (typeof cb !== "function")
        throw new ERR_MULTIPLE_CALLBACK();
      onwriteStateUpdate(state);
      if (er)
        onwriteError(stream, state, sync, er, cb);
      else {
        var finished = needFinish(state) || stream.destroyed;
        if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
          clearBuffer(stream, state);
        }
        if (sync) {
          "process".nextTick(afterWrite, stream, state, finished, cb);
        } else {
          afterWrite(stream, state, finished, cb);
        }
      }
    }
    function afterWrite(stream, state, finished, cb) {
      if (!finished)
        onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    }
    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit("drain");
      }
    }
    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      var entry = state.bufferedRequest;
      if (stream._writev && entry && entry.next) {
        var l = state.bufferedRequestCount;
        var buffer = new Array(l);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;
        while (entry) {
          buffer[count] = entry;
          if (!entry.isBuf)
            allBuffers = false;
          entry = entry.next;
          count += 1;
        }
        buffer.allBuffers = allBuffers;
        doWrite(stream, state, true, state.length, buffer, "", holder.finish);
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
          state.corkedRequestsFree = holder.next;
          holder.next = null;
        } else {
          state.corkedRequestsFree = new CorkedRequest(state);
        }
        state.bufferedRequestCount = 0;
      } else {
        while (entry) {
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, cb);
          entry = entry.next;
          state.bufferedRequestCount--;
          if (state.writing) {
            break;
          }
        }
        if (entry === null)
          state.lastBufferedRequest = null;
      }
      state.bufferedRequest = entry;
      state.bufferProcessing = false;
    }
    Writable.prototype._write = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
    };
    Writable.prototype._writev = null;
    Writable.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (chunk !== null && chunk !== void 0)
        this.write(chunk, encoding);
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (!state.ending)
        endWritable(this, state, cb);
      return this;
    };
    Object.defineProperty(Writable.prototype, "writableLength", {
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function needFinish(state) {
      return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
    }
    function callFinal(stream, state) {
      stream._final(function(err) {
        state.pendingcb--;
        if (err) {
          errorOrDestroy(stream, err);
        }
        state.prefinished = true;
        stream.emit("prefinish");
        finishMaybe(stream, state);
      });
    }
    function prefinish(stream, state) {
      if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === "function" && !state.destroyed) {
          state.pendingcb++;
          state.finalCalled = true;
          "process".nextTick(callFinal, stream, state);
        } else {
          state.prefinished = true;
          stream.emit("prefinish");
        }
      }
    }
    function finishMaybe(stream, state) {
      var need = needFinish(state);
      if (need) {
        prefinish(stream, state);
        if (state.pendingcb === 0) {
          state.finished = true;
          stream.emit("finish");
          if (state.autoDestroy) {
            var rState = stream._readableState;
            if (!rState || rState.autoDestroy && rState.endEmitted) {
              stream.destroy();
            }
          }
        }
      }
      return need;
    }
    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);
      if (cb) {
        if (state.finished)
          "process".nextTick(cb);
        else
          stream.once("finish", cb);
      }
      state.ended = true;
      stream.writable = false;
    }
    function onCorkedFinish(corkReq, state, err) {
      var entry = corkReq.entry;
      corkReq.entry = null;
      while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
      }
      state.corkedRequestsFree.next = corkReq;
    }
    Object.defineProperty(Writable.prototype, "destroyed", {
      enumerable: false,
      get: function get() {
        if (this._writableState === void 0) {
          return false;
        }
        return this._writableState.destroyed;
      },
      set: function set(value) {
        if (!this._writableState) {
          return;
        }
        this._writableState.destroyed = value;
      }
    });
    Writable.prototype.destroy = destroyImpl.destroy;
    Writable.prototype._undestroy = destroyImpl.undestroy;
    Writable.prototype._destroy = function(err, cb) {
      cb(err);
    };
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_duplex.js
  var require_stream_duplex = __commonJS((exports2, module2) => {
    "use strict";
    var objectKeys = Object.keys || function(obj) {
      var keys2 = [];
      for (var key in obj) {
        keys2.push(key);
      }
      return keys2;
    };
    module2.exports = Duplex;
    var Readable = require_stream_readable();
    var Writable = require_stream_writable();
    require_inherits_browser()(Duplex, Readable);
    {
      var keys = objectKeys(Writable.prototype);
      for (var v = 0; v < keys.length; v++) {
        var method = keys[v];
        if (!Duplex.prototype[method])
          Duplex.prototype[method] = Writable.prototype[method];
      }
    }
    function Duplex(options) {
      if (!(this instanceof Duplex))
        return new Duplex(options);
      Readable.call(this, options);
      Writable.call(this, options);
      this.allowHalfOpen = true;
      if (options) {
        if (options.readable === false)
          this.readable = false;
        if (options.writable === false)
          this.writable = false;
        if (options.allowHalfOpen === false) {
          this.allowHalfOpen = false;
          this.once("end", onend);
        }
      }
    }
    Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
      enumerable: false,
      get: function get() {
        return this._writableState.highWaterMark;
      }
    });
    Object.defineProperty(Duplex.prototype, "writableBuffer", {
      enumerable: false,
      get: function get() {
        return this._writableState && this._writableState.getBuffer();
      }
    });
    Object.defineProperty(Duplex.prototype, "writableLength", {
      enumerable: false,
      get: function get() {
        return this._writableState.length;
      }
    });
    function onend() {
      if (this._writableState.ended)
        return;
      "process".nextTick(onEndNT, this);
    }
    function onEndNT(self) {
      self.end();
    }
    Object.defineProperty(Duplex.prototype, "destroyed", {
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function set(value) {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return;
        }
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }
    });
  });

  // node_modules/safe-buffer/index.js
  var require_safe_buffer = __commonJS((exports2, module2) => {
    var buffer = require_buffer();
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module2.exports = buffer;
    } else {
      copyProps(buffer, exports2);
      exports2.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  });

  // node_modules/string_decoder/lib/string_decoder.js
  var require_string_decoder = __commonJS((exports2) => {
    "use strict";
    var Buffer2 = require_safe_buffer().Buffer;
    var isEncoding = Buffer2.isEncoding || function(encoding) {
      encoding = "" + encoding;
      switch (encoding && encoding.toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return true;
        default:
          return false;
      }
    };
    function _normalizeEncoding(enc) {
      if (!enc)
        return "utf8";
      var retried;
      while (true) {
        switch (enc) {
          case "utf8":
          case "utf-8":
            return "utf8";
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return "utf16le";
          case "latin1":
          case "binary":
            return "latin1";
          case "base64":
          case "ascii":
          case "hex":
            return enc;
          default:
            if (retried)
              return;
            enc = ("" + enc).toLowerCase();
            retried = true;
        }
      }
    }
    function normalizeEncoding(enc) {
      var nenc = _normalizeEncoding(enc);
      if (typeof nenc !== "string" && (Buffer2.isEncoding === isEncoding || !isEncoding(enc)))
        throw new Error("Unknown encoding: " + enc);
      return nenc || enc;
    }
    exports2.StringDecoder = StringDecoder;
    function StringDecoder(encoding) {
      this.encoding = normalizeEncoding(encoding);
      var nb;
      switch (this.encoding) {
        case "utf16le":
          this.text = utf16Text;
          this.end = utf16End;
          nb = 4;
          break;
        case "utf8":
          this.fillLast = utf8FillLast;
          nb = 4;
          break;
        case "base64":
          this.text = base64Text;
          this.end = base64End;
          nb = 3;
          break;
        default:
          this.write = simpleWrite;
          this.end = simpleEnd;
          return;
      }
      this.lastNeed = 0;
      this.lastTotal = 0;
      this.lastChar = Buffer2.allocUnsafe(nb);
    }
    StringDecoder.prototype.write = function(buf) {
      if (buf.length === 0)
        return "";
      var r;
      var i;
      if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === void 0)
          return "";
        i = this.lastNeed;
        this.lastNeed = 0;
      } else {
        i = 0;
      }
      if (i < buf.length)
        return r ? r + this.text(buf, i) : this.text(buf, i);
      return r || "";
    };
    StringDecoder.prototype.end = utf8End;
    StringDecoder.prototype.text = utf8Text;
    StringDecoder.prototype.fillLast = function(buf) {
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
      this.lastNeed -= buf.length;
    };
    function utf8CheckByte(byte) {
      if (byte <= 127)
        return 0;
      else if (byte >> 5 === 6)
        return 2;
      else if (byte >> 4 === 14)
        return 3;
      else if (byte >> 3 === 30)
        return 4;
      return byte >> 6 === 2 ? -1 : -2;
    }
    function utf8CheckIncomplete(self, buf, i) {
      var j = buf.length - 1;
      if (j < i)
        return 0;
      var nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0)
          self.lastNeed = nb - 1;
        return nb;
      }
      if (--j < i || nb === -2)
        return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0)
          self.lastNeed = nb - 2;
        return nb;
      }
      if (--j < i || nb === -2)
        return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) {
          if (nb === 2)
            nb = 0;
          else
            self.lastNeed = nb - 3;
        }
        return nb;
      }
      return 0;
    }
    function utf8CheckExtraBytes(self, buf, p) {
      if ((buf[0] & 192) !== 128) {
        self.lastNeed = 0;
        return "\uFFFD";
      }
      if (self.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 192) !== 128) {
          self.lastNeed = 1;
          return "\uFFFD";
        }
        if (self.lastNeed > 2 && buf.length > 2) {
          if ((buf[2] & 192) !== 128) {
            self.lastNeed = 2;
            return "\uFFFD";
          }
        }
      }
    }
    function utf8FillLast(buf) {
      var p = this.lastTotal - this.lastNeed;
      var r = utf8CheckExtraBytes(this, buf, p);
      if (r !== void 0)
        return r;
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, p, 0, buf.length);
      this.lastNeed -= buf.length;
    }
    function utf8Text(buf, i) {
      var total = utf8CheckIncomplete(this, buf, i);
      if (!this.lastNeed)
        return buf.toString("utf8", i);
      this.lastTotal = total;
      var end = buf.length - (total - this.lastNeed);
      buf.copy(this.lastChar, 0, end);
      return buf.toString("utf8", i, end);
    }
    function utf8End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed)
        return r + "\uFFFD";
      return r;
    }
    function utf16Text(buf, i) {
      if ((buf.length - i) % 2 === 0) {
        var r = buf.toString("utf16le", i);
        if (r) {
          var c = r.charCodeAt(r.length - 1);
          if (c >= 55296 && c <= 56319) {
            this.lastNeed = 2;
            this.lastTotal = 4;
            this.lastChar[0] = buf[buf.length - 2];
            this.lastChar[1] = buf[buf.length - 1];
            return r.slice(0, -1);
          }
        }
        return r;
      }
      this.lastNeed = 1;
      this.lastTotal = 2;
      this.lastChar[0] = buf[buf.length - 1];
      return buf.toString("utf16le", i, buf.length - 1);
    }
    function utf16End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString("utf16le", 0, end);
      }
      return r;
    }
    function base64Text(buf, i) {
      var n = (buf.length - i) % 3;
      if (n === 0)
        return buf.toString("base64", i);
      this.lastNeed = 3 - n;
      this.lastTotal = 3;
      if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
      } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
      }
      return buf.toString("base64", i, buf.length - n);
    }
    function base64End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed)
        return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
      return r;
    }
    function simpleWrite(buf) {
      return buf.toString(this.encoding);
    }
    function simpleEnd(buf) {
      return buf && buf.length ? this.write(buf) : "";
    }
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/end-of-stream.js
  var require_end_of_stream = __commonJS((exports2, module2) => {
    "use strict";
    var ERR_STREAM_PREMATURE_CLOSE = require_errors().codes.ERR_STREAM_PREMATURE_CLOSE;
    function once(callback) {
      var called = false;
      return function() {
        if (called)
          return;
        called = true;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        callback.apply(this, args);
      };
    }
    function noop() {
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function eos(stream, opts, callback) {
      if (typeof opts === "function")
        return eos(stream, null, opts);
      if (!opts)
        opts = {};
      callback = once(callback || noop);
      var readable = opts.readable || opts.readable !== false && stream.readable;
      var writable = opts.writable || opts.writable !== false && stream.writable;
      var onlegacyfinish = function onlegacyfinish2() {
        if (!stream.writable)
          onfinish();
      };
      var writableEnded = stream._writableState && stream._writableState.finished;
      var onfinish = function onfinish2() {
        writable = false;
        writableEnded = true;
        if (!readable)
          callback.call(stream);
      };
      var readableEnded = stream._readableState && stream._readableState.endEmitted;
      var onend = function onend2() {
        readable = false;
        readableEnded = true;
        if (!writable)
          callback.call(stream);
      };
      var onerror = function onerror2(err) {
        callback.call(stream, err);
      };
      var onclose = function onclose2() {
        var err;
        if (readable && !readableEnded) {
          if (!stream._readableState || !stream._readableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
        if (writable && !writableEnded) {
          if (!stream._writableState || !stream._writableState.ended)
            err = new ERR_STREAM_PREMATURE_CLOSE();
          return callback.call(stream, err);
        }
      };
      var onrequest = function onrequest2() {
        stream.req.on("finish", onfinish);
      };
      if (isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req)
          onrequest();
        else
          stream.on("request", onrequest);
      } else if (writable && !stream._writableState) {
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
      }
      stream.on("end", onend);
      stream.on("finish", onfinish);
      if (opts.error !== false)
        stream.on("error", onerror);
      stream.on("close", onclose);
      return function() {
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req)
          stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
      };
    }
    module2.exports = eos;
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/async_iterator.js
  var require_async_iterator = __commonJS((exports2, module2) => {
    "use strict";
    var _Object$setPrototypeO;
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {value, enumerable: true, configurable: true, writable: true});
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var finished = require_end_of_stream();
    var kLastResolve = Symbol("lastResolve");
    var kLastReject = Symbol("lastReject");
    var kError = Symbol("error");
    var kEnded = Symbol("ended");
    var kLastPromise = Symbol("lastPromise");
    var kHandlePromise = Symbol("handlePromise");
    var kStream = Symbol("stream");
    function createIterResult(value, done) {
      return {
        value,
        done
      };
    }
    function readAndResolve(iter) {
      var resolve = iter[kLastResolve];
      if (resolve !== null) {
        var data = iter[kStream].read();
        if (data !== null) {
          iter[kLastPromise] = null;
          iter[kLastResolve] = null;
          iter[kLastReject] = null;
          resolve(createIterResult(data, false));
        }
      }
    }
    function onReadable(iter) {
      "process".nextTick(readAndResolve, iter);
    }
    function wrapForNext(lastPromise, iter) {
      return function(resolve, reject) {
        lastPromise.then(function() {
          if (iter[kEnded]) {
            resolve(createIterResult(void 0, true));
            return;
          }
          iter[kHandlePromise](resolve, reject);
        }, reject);
      };
    }
    var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
    });
    var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
      get stream() {
        return this[kStream];
      },
      next: function next() {
        var _this = this;
        var error = this[kError];
        if (error !== null) {
          return Promise.reject(error);
        }
        if (this[kEnded]) {
          return Promise.resolve(createIterResult(void 0, true));
        }
        if (this[kStream].destroyed) {
          return new Promise(function(resolve, reject) {
            "process".nextTick(function() {
              if (_this[kError]) {
                reject(_this[kError]);
              } else {
                resolve(createIterResult(void 0, true));
              }
            });
          });
        }
        var lastPromise = this[kLastPromise];
        var promise;
        if (lastPromise) {
          promise = new Promise(wrapForNext(lastPromise, this));
        } else {
          var data = this[kStream].read();
          if (data !== null) {
            return Promise.resolve(createIterResult(data, false));
          }
          promise = new Promise(this[kHandlePromise]);
        }
        this[kLastPromise] = promise;
        return promise;
      }
    }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
      return this;
    }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
      var _this2 = this;
      return new Promise(function(resolve, reject) {
        _this2[kStream].destroy(null, function(err) {
          if (err) {
            reject(err);
            return;
          }
          resolve(createIterResult(void 0, true));
        });
      });
    }), _Object$setPrototypeO), AsyncIteratorPrototype);
    var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator2(stream) {
      var _Object$create;
      var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
        value: stream,
        writable: true
      }), _defineProperty(_Object$create, kLastResolve, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kLastReject, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kError, {
        value: null,
        writable: true
      }), _defineProperty(_Object$create, kEnded, {
        value: stream._readableState.endEmitted,
        writable: true
      }), _defineProperty(_Object$create, kHandlePromise, {
        value: function value(resolve, reject) {
          var data = iterator[kStream].read();
          if (data) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            resolve(createIterResult(data, false));
          } else {
            iterator[kLastResolve] = resolve;
            iterator[kLastReject] = reject;
          }
        },
        writable: true
      }), _Object$create));
      iterator[kLastPromise] = null;
      finished(stream, function(err) {
        if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
          var reject = iterator[kLastReject];
          if (reject !== null) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            reject(err);
          }
          iterator[kError] = err;
          return;
        }
        var resolve = iterator[kLastResolve];
        if (resolve !== null) {
          iterator[kLastPromise] = null;
          iterator[kLastResolve] = null;
          iterator[kLastReject] = null;
          resolve(createIterResult(void 0, true));
        }
        iterator[kEnded] = true;
      });
      stream.on("readable", onReadable.bind(null, iterator));
      return iterator;
    };
    module2.exports = createReadableStreamAsyncIterator;
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/from-browser.js
  var require_from_browser = __commonJS((exports2, module2) => {
    module2.exports = function() {
      throw new Error("Readable.from is not available in the browser");
    };
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_readable.js
  var require_stream_readable = __commonJS((exports2, module2) => {
    "use strict";
    module2.exports = Readable;
    var Duplex;
    Readable.ReadableState = ReadableState;
    var EE = require_events().EventEmitter;
    var EElistenerCount = function EElistenerCount2(emitter, type) {
      return emitter.listeners(type).length;
    };
    var Stream = require_stream_browser();
    var Buffer2 = require_buffer().Buffer;
    var OurUint8Array = "global".Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer2.from(chunk);
    }
    function _isUint8Array(obj) {
      return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var debugUtil = require_util2();
    var debug;
    if (debugUtil && debugUtil.debuglog) {
      debug = debugUtil.debuglog("stream");
    } else {
      debug = function debug2() {
      };
    }
    var BufferList = require_buffer_list();
    var destroyImpl = require_destroy();
    var _require = require_state();
    var getHighWaterMark = _require.getHighWaterMark;
    var _require$codes = require_errors().codes;
    var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
    var ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
    var StringDecoder;
    var createReadableStreamAsyncIterator;
    var from;
    require_inherits_browser()(Readable, Stream);
    var errorOrDestroy = destroyImpl.errorOrDestroy;
    var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
    function prependListener(emitter, event, fn) {
      if (typeof emitter.prependListener === "function")
        return emitter.prependListener(event, fn);
      if (!emitter._events || !emitter._events[event])
        emitter.on(event, fn);
      else if (Array.isArray(emitter._events[event]))
        emitter._events[event].unshift(fn);
      else
        emitter._events[event] = [fn, emitter._events[event]];
    }
    function ReadableState(options, stream, isDuplex) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      if (typeof isDuplex !== "boolean")
        isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex)
        this.objectMode = this.objectMode || !!options.readableObjectMode;
      this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
      this.sync = true;
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.resumeScheduled = false;
      this.paused = true;
      this.emitClose = options.emitClose !== false;
      this.autoDestroy = !!options.autoDestroy;
      this.destroyed = false;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.awaitDrain = 0;
      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        if (!StringDecoder)
          StringDecoder = require_string_decoder().StringDecoder;
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
      }
    }
    function Readable(options) {
      Duplex = Duplex || require_stream_duplex();
      if (!(this instanceof Readable))
        return new Readable(options);
      var isDuplex = this instanceof Duplex;
      this._readableState = new ReadableState(options, this, isDuplex);
      this.readable = true;
      if (options) {
        if (typeof options.read === "function")
          this._read = options.read;
        if (typeof options.destroy === "function")
          this._destroy = options.destroy;
      }
      Stream.call(this);
    }
    Object.defineProperty(Readable.prototype, "destroyed", {
      enumerable: false,
      get: function get() {
        if (this._readableState === void 0) {
          return false;
        }
        return this._readableState.destroyed;
      },
      set: function set(value) {
        if (!this._readableState) {
          return;
        }
        this._readableState.destroyed = value;
      }
    });
    Readable.prototype.destroy = destroyImpl.destroy;
    Readable.prototype._undestroy = destroyImpl.undestroy;
    Readable.prototype._destroy = function(err, cb) {
      cb(err);
    };
    Readable.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
      var skipChunkCheck;
      if (!state.objectMode) {
        if (typeof chunk === "string") {
          encoding = encoding || state.defaultEncoding;
          if (encoding !== state.encoding) {
            chunk = Buffer2.from(chunk, encoding);
            encoding = "";
          }
          skipChunkCheck = true;
        }
      } else {
        skipChunkCheck = true;
      }
      return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
    };
    Readable.prototype.unshift = function(chunk) {
      return readableAddChunk(this, chunk, null, true, false);
    };
    function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
      debug("readableAddChunk", chunk);
      var state = stream._readableState;
      if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
      } else {
        var er;
        if (!skipChunkCheck)
          er = chunkInvalid(state, chunk);
        if (er) {
          errorOrDestroy(stream, er);
        } else if (state.objectMode || chunk && chunk.length > 0) {
          if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer2.prototype) {
            chunk = _uint8ArrayToBuffer(chunk);
          }
          if (addToFront) {
            if (state.endEmitted)
              errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
            else
              addChunk(stream, state, chunk, true);
          } else if (state.ended) {
            errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
          } else if (state.destroyed) {
            return false;
          } else {
            state.reading = false;
            if (state.decoder && !encoding) {
              chunk = state.decoder.write(chunk);
              if (state.objectMode || chunk.length !== 0)
                addChunk(stream, state, chunk, false);
              else
                maybeReadMore(stream, state);
            } else {
              addChunk(stream, state, chunk, false);
            }
          }
        } else if (!addToFront) {
          state.reading = false;
          maybeReadMore(stream, state);
        }
      }
      return !state.ended && (state.length < state.highWaterMark || state.length === 0);
    }
    function addChunk(stream, state, chunk, addToFront) {
      if (state.flowing && state.length === 0 && !state.sync) {
        state.awaitDrain = 0;
        stream.emit("data", chunk);
      } else {
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront)
          state.buffer.unshift(chunk);
        else
          state.buffer.push(chunk);
        if (state.needReadable)
          emitReadable(stream);
      }
      maybeReadMore(stream, state);
    }
    function chunkInvalid(state, chunk) {
      var er;
      if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
        er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
      }
      return er;
    }
    Readable.prototype.isPaused = function() {
      return this._readableState.flowing === false;
    };
    Readable.prototype.setEncoding = function(enc) {
      if (!StringDecoder)
        StringDecoder = require_string_decoder().StringDecoder;
      var decoder = new StringDecoder(enc);
      this._readableState.decoder = decoder;
      this._readableState.encoding = this._readableState.decoder.encoding;
      var p = this._readableState.buffer.head;
      var content = "";
      while (p !== null) {
        content += decoder.write(p.data);
        p = p.next;
      }
      this._readableState.buffer.clear();
      if (content !== "")
        this._readableState.buffer.push(content);
      this._readableState.length = content.length;
      return this;
    };
    var MAX_HWM = 1073741824;
    function computeNewHighWaterMark(n) {
      if (n >= MAX_HWM) {
        n = MAX_HWM;
      } else {
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
      }
      return n;
    }
    function howMuchToRead(n, state) {
      if (n <= 0 || state.length === 0 && state.ended)
        return 0;
      if (state.objectMode)
        return 1;
      if (n !== n) {
        if (state.flowing && state.length)
          return state.buffer.head.data.length;
        else
          return state.length;
      }
      if (n > state.highWaterMark)
        state.highWaterMark = computeNewHighWaterMark(n);
      if (n <= state.length)
        return n;
      if (!state.ended) {
        state.needReadable = true;
        return 0;
      }
      return state.length;
    }
    Readable.prototype.read = function(n) {
      debug("read", n);
      n = parseInt(n, 10);
      var state = this._readableState;
      var nOrig = n;
      if (n !== 0)
        state.emittedReadable = false;
      if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        debug("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended)
          endReadable(this);
        else
          emitReadable(this);
        return null;
      }
      n = howMuchToRead(n, state);
      if (n === 0 && state.ended) {
        if (state.length === 0)
          endReadable(this);
        return null;
      }
      var doRead = state.needReadable;
      debug("need readable", doRead);
      if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug("length less than watermark", doRead);
      }
      if (state.ended || state.reading) {
        doRead = false;
        debug("reading or ended", doRead);
      } else if (doRead) {
        debug("do read");
        state.reading = true;
        state.sync = true;
        if (state.length === 0)
          state.needReadable = true;
        this._read(state.highWaterMark);
        state.sync = false;
        if (!state.reading)
          n = howMuchToRead(nOrig, state);
      }
      var ret;
      if (n > 0)
        ret = fromList(n, state);
      else
        ret = null;
      if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n = 0;
      } else {
        state.length -= n;
        state.awaitDrain = 0;
      }
      if (state.length === 0) {
        if (!state.ended)
          state.needReadable = true;
        if (nOrig !== n && state.ended)
          endReadable(this);
      }
      if (ret !== null)
        this.emit("data", ret);
      return ret;
    };
    function onEofChunk(stream, state) {
      debug("onEofChunk");
      if (state.ended)
        return;
      if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
      if (state.sync) {
        emitReadable(stream);
      } else {
        state.needReadable = false;
        if (!state.emittedReadable) {
          state.emittedReadable = true;
          emitReadable_(stream);
        }
      }
    }
    function emitReadable(stream) {
      var state = stream._readableState;
      debug("emitReadable", state.needReadable, state.emittedReadable);
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug("emitReadable", state.flowing);
        state.emittedReadable = true;
        "process".nextTick(emitReadable_, stream);
      }
    }
    function emitReadable_(stream) {
      var state = stream._readableState;
      debug("emitReadable_", state.destroyed, state.length, state.ended);
      if (!state.destroyed && (state.length || state.ended)) {
        stream.emit("readable");
        state.emittedReadable = false;
      }
      state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
      flow(stream);
    }
    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        "process".nextTick(maybeReadMore_, stream, state);
      }
    }
    function maybeReadMore_(stream, state) {
      while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
        var len = state.length;
        debug("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length)
          break;
      }
      state.readingMore = false;
    }
    Readable.prototype._read = function(n) {
      errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
    };
    Readable.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
      var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== "process".stdout && dest !== "process".stderr;
      var endFn = doEnd ? onend : unpipe;
      if (state.endEmitted)
        "process".nextTick(endFn);
      else
        src.once("end", endFn);
      dest.on("unpipe", onunpipe);
      function onunpipe(readable, unpipeInfo) {
        debug("onunpipe");
        if (readable === src) {
          if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
            unpipeInfo.hasUnpiped = true;
            cleanup();
          }
        }
      }
      function onend() {
        debug("onend");
        dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on("drain", ondrain);
      var cleanedUp = false;
      function cleanup() {
        debug("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true;
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
          ondrain();
      }
      src.on("data", ondata);
      function ondata(chunk) {
        debug("ondata");
        var ret = dest.write(chunk);
        debug("dest.write", ret);
        if (ret === false) {
          if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
            debug("false write response, pause", state.awaitDrain);
            state.awaitDrain++;
          }
          src.pause();
        }
      }
      function onerror(er) {
        debug("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (EElistenerCount(dest, "error") === 0)
          errorOrDestroy(dest, er);
      }
      prependListener(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
      }
      dest.once("close", onclose);
      function onfinish() {
        debug("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
      }
      dest.once("finish", onfinish);
      function unpipe() {
        debug("unpipe");
        src.unpipe(dest);
      }
      dest.emit("pipe", src);
      if (!state.flowing) {
        debug("pipe resume");
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src) {
      return function pipeOnDrainFunctionResult() {
        var state = src._readableState;
        debug("pipeOnDrain", state.awaitDrain);
        if (state.awaitDrain)
          state.awaitDrain--;
        if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
          state.flowing = true;
          flow(src);
        }
      };
    }
    Readable.prototype.unpipe = function(dest) {
      var state = this._readableState;
      var unpipeInfo = {
        hasUnpiped: false
      };
      if (state.pipesCount === 0)
        return this;
      if (state.pipesCount === 1) {
        if (dest && dest !== state.pipes)
          return this;
        if (!dest)
          dest = state.pipes;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest)
          dest.emit("unpipe", this, unpipeInfo);
        return this;
      }
      if (!dest) {
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var i = 0; i < len; i++) {
          dests[i].emit("unpipe", this, {
            hasUnpiped: false
          });
        }
        return this;
      }
      var index = indexOf(state.pipes, dest);
      if (index === -1)
        return this;
      state.pipes.splice(index, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1)
        state.pipes = state.pipes[0];
      dest.emit("unpipe", this, unpipeInfo);
      return this;
    };
    Readable.prototype.on = function(ev, fn) {
      var res = Stream.prototype.on.call(this, ev, fn);
      var state = this._readableState;
      if (ev === "data") {
        state.readableListening = this.listenerCount("readable") > 0;
        if (state.flowing !== false)
          this.resume();
      } else if (ev === "readable") {
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.flowing = false;
          state.emittedReadable = false;
          debug("on readable", state.length, state.reading);
          if (state.length) {
            emitReadable(this);
          } else if (!state.reading) {
            "process".nextTick(nReadingNextTick, this);
          }
        }
      }
      return res;
    };
    Readable.prototype.addListener = Readable.prototype.on;
    Readable.prototype.removeListener = function(ev, fn) {
      var res = Stream.prototype.removeListener.call(this, ev, fn);
      if (ev === "readable") {
        "process".nextTick(updateReadableListening, this);
      }
      return res;
    };
    Readable.prototype.removeAllListeners = function(ev) {
      var res = Stream.prototype.removeAllListeners.apply(this, arguments);
      if (ev === "readable" || ev === void 0) {
        "process".nextTick(updateReadableListening, this);
      }
      return res;
    };
    function updateReadableListening(self) {
      var state = self._readableState;
      state.readableListening = self.listenerCount("readable") > 0;
      if (state.resumeScheduled && !state.paused) {
        state.flowing = true;
      } else if (self.listenerCount("data") > 0) {
        self.resume();
      }
    }
    function nReadingNextTick(self) {
      debug("readable nexttick read 0");
      self.read(0);
    }
    Readable.prototype.resume = function() {
      var state = this._readableState;
      if (!state.flowing) {
        debug("resume");
        state.flowing = !state.readableListening;
        resume(this, state);
      }
      state.paused = false;
      return this;
    };
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        "process".nextTick(resume_, stream, state);
      }
    }
    function resume_(stream, state) {
      debug("resume", state.reading);
      if (!state.reading) {
        stream.read(0);
      }
      state.resumeScheduled = false;
      stream.emit("resume");
      flow(stream);
      if (state.flowing && !state.reading)
        stream.read(0);
    }
    Readable.prototype.pause = function() {
      debug("call pause flowing=%j", this._readableState.flowing);
      if (this._readableState.flowing !== false) {
        debug("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }
      this._readableState.paused = true;
      return this;
    };
    function flow(stream) {
      var state = stream._readableState;
      debug("flow", state.flowing);
      while (state.flowing && stream.read() !== null) {
        ;
      }
    }
    Readable.prototype.wrap = function(stream) {
      var _this = this;
      var state = this._readableState;
      var paused = false;
      stream.on("end", function() {
        debug("wrapped end");
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length)
            _this.push(chunk);
        }
        _this.push(null);
      });
      stream.on("data", function(chunk) {
        debug("wrapped data");
        if (state.decoder)
          chunk = state.decoder.write(chunk);
        if (state.objectMode && (chunk === null || chunk === void 0))
          return;
        else if (!state.objectMode && (!chunk || !chunk.length))
          return;
        var ret = _this.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i in stream) {
        if (this[i] === void 0 && typeof stream[i] === "function") {
          this[i] = function methodWrap(method) {
            return function methodWrapReturnFunction() {
              return stream[method].apply(stream, arguments);
            };
          }(i);
        }
      }
      for (var n = 0; n < kProxyEvents.length; n++) {
        stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
      }
      this._read = function(n2) {
        debug("wrapped _read", n2);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return this;
    };
    if (typeof Symbol === "function") {
      Readable.prototype[Symbol.asyncIterator] = function() {
        if (createReadableStreamAsyncIterator === void 0) {
          createReadableStreamAsyncIterator = require_async_iterator();
        }
        return createReadableStreamAsyncIterator(this);
      };
    }
    Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
      enumerable: false,
      get: function get() {
        return this._readableState.highWaterMark;
      }
    });
    Object.defineProperty(Readable.prototype, "readableBuffer", {
      enumerable: false,
      get: function get() {
        return this._readableState && this._readableState.buffer;
      }
    });
    Object.defineProperty(Readable.prototype, "readableFlowing", {
      enumerable: false,
      get: function get() {
        return this._readableState.flowing;
      },
      set: function set(state) {
        if (this._readableState) {
          this._readableState.flowing = state;
        }
      }
    });
    Readable._fromList = fromList;
    Object.defineProperty(Readable.prototype, "readableLength", {
      enumerable: false,
      get: function get() {
        return this._readableState.length;
      }
    });
    function fromList(n, state) {
      if (state.length === 0)
        return null;
      var ret;
      if (state.objectMode)
        ret = state.buffer.shift();
      else if (!n || n >= state.length) {
        if (state.decoder)
          ret = state.buffer.join("");
        else if (state.buffer.length === 1)
          ret = state.buffer.first();
        else
          ret = state.buffer.concat(state.length);
        state.buffer.clear();
      } else {
        ret = state.buffer.consume(n, state.decoder);
      }
      return ret;
    }
    function endReadable(stream) {
      var state = stream._readableState;
      debug("endReadable", state.endEmitted);
      if (!state.endEmitted) {
        state.ended = true;
        "process".nextTick(endReadableNT, state, stream);
      }
    }
    function endReadableNT(state, stream) {
      debug("endReadableNT", state.endEmitted, state.length);
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit("end");
        if (state.autoDestroy) {
          var wState = stream._writableState;
          if (!wState || wState.autoDestroy && wState.finished) {
            stream.destroy();
          }
        }
      }
    }
    if (typeof Symbol === "function") {
      Readable.from = function(iterable, opts) {
        if (from === void 0) {
          from = require_from_browser();
        }
        return from(Readable, iterable, opts);
      };
    }
    function indexOf(xs, x) {
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x)
          return i;
      }
      return -1;
    }
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_transform.js
  var require_stream_transform = __commonJS((exports2, module2) => {
    "use strict";
    module2.exports = Transform;
    var _require$codes = require_errors().codes;
    var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
    var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
    var ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING;
    var ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
    var Duplex = require_stream_duplex();
    require_inherits_browser()(Transform, Duplex);
    function afterTransform(er, data) {
      var ts = this._transformState;
      ts.transforming = false;
      var cb = ts.writecb;
      if (cb === null) {
        return this.emit("error", new ERR_MULTIPLE_CALLBACK());
      }
      ts.writechunk = null;
      ts.writecb = null;
      if (data != null)
        this.push(data);
      cb(er);
      var rs = this._readableState;
      rs.reading = false;
      if (rs.needReadable || rs.length < rs.highWaterMark) {
        this._read(rs.highWaterMark);
      }
    }
    function Transform(options) {
      if (!(this instanceof Transform))
        return new Transform(options);
      Duplex.call(this, options);
      this._transformState = {
        afterTransform: afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
      };
      this._readableState.needReadable = true;
      this._readableState.sync = false;
      if (options) {
        if (typeof options.transform === "function")
          this._transform = options.transform;
        if (typeof options.flush === "function")
          this._flush = options.flush;
      }
      this.on("prefinish", prefinish);
    }
    function prefinish() {
      var _this = this;
      if (typeof this._flush === "function" && !this._readableState.destroyed) {
        this._flush(function(er, data) {
          done(_this, er, data);
        });
      } else {
        done(this, null, null);
      }
    }
    Transform.prototype.push = function(chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };
    Transform.prototype._transform = function(chunk, encoding, cb) {
      cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
    };
    Transform.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
          this._read(rs.highWaterMark);
      }
    };
    Transform.prototype._read = function(n) {
      var ts = this._transformState;
      if (ts.writechunk !== null && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        ts.needTransform = true;
      }
    };
    Transform.prototype._destroy = function(err, cb) {
      Duplex.prototype._destroy.call(this, err, function(err2) {
        cb(err2);
      });
    };
    function done(stream, er, data) {
      if (er)
        return stream.emit("error", er);
      if (data != null)
        stream.push(data);
      if (stream._writableState.length)
        throw new ERR_TRANSFORM_WITH_LENGTH_0();
      if (stream._transformState.transforming)
        throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
      return stream.push(null);
    }
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/_stream_passthrough.js
  var require_stream_passthrough = __commonJS((exports2, module2) => {
    "use strict";
    module2.exports = PassThrough;
    var Transform = require_stream_transform();
    require_inherits_browser()(PassThrough, Transform);
    function PassThrough(options) {
      if (!(this instanceof PassThrough))
        return new PassThrough(options);
      Transform.call(this, options);
    }
    PassThrough.prototype._transform = function(chunk, encoding, cb) {
      cb(null, chunk);
    };
  });

  // node_modules/stream-browserify/node_modules/readable-stream/lib/internal/streams/pipeline.js
  var require_pipeline = __commonJS((exports2, module2) => {
    "use strict";
    var eos;
    function once(callback) {
      var called = false;
      return function() {
        if (called)
          return;
        called = true;
        callback.apply(void 0, arguments);
      };
    }
    var _require$codes = require_errors().codes;
    var ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
    var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
    function noop(err) {
      if (err)
        throw err;
    }
    function isRequest(stream) {
      return stream.setHeader && typeof stream.abort === "function";
    }
    function destroyer(stream, reading, writing, callback) {
      callback = once(callback);
      var closed = false;
      stream.on("close", function() {
        closed = true;
      });
      if (eos === void 0)
        eos = require_end_of_stream();
      eos(stream, {
        readable: reading,
        writable: writing
      }, function(err) {
        if (err)
          return callback(err);
        closed = true;
        callback();
      });
      var destroyed = false;
      return function(err) {
        if (closed)
          return;
        if (destroyed)
          return;
        destroyed = true;
        if (isRequest(stream))
          return stream.abort();
        if (typeof stream.destroy === "function")
          return stream.destroy();
        callback(err || new ERR_STREAM_DESTROYED("pipe"));
      };
    }
    function call(fn) {
      fn();
    }
    function pipe(from, to) {
      return from.pipe(to);
    }
    function popCallback(streams) {
      if (!streams.length)
        return noop;
      if (typeof streams[streams.length - 1] !== "function")
        return noop;
      return streams.pop();
    }
    function pipeline() {
      for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
        streams[_key] = arguments[_key];
      }
      var callback = popCallback(streams);
      if (Array.isArray(streams[0]))
        streams = streams[0];
      if (streams.length < 2) {
        throw new ERR_MISSING_ARGS("streams");
      }
      var error;
      var destroys = streams.map(function(stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return destroyer(stream, reading, writing, function(err) {
          if (!error)
            error = err;
          if (err)
            destroys.forEach(call);
          if (reading)
            return;
          destroys.forEach(call);
          callback(error);
        });
      });
      return streams.reduce(pipe);
    }
    module2.exports = pipeline;
  });

  // node_modules/stream-browserify/index.js
  var require_stream_browserify = __commonJS((exports2, module2) => {
    module2.exports = Stream;
    var EE = require_events().EventEmitter;
    var inherits = require_inherits_browser();
    inherits(Stream, EE);
    Stream.Readable = require_stream_readable();
    Stream.Writable = require_stream_writable();
    Stream.Duplex = require_stream_duplex();
    Stream.Transform = require_stream_transform();
    Stream.PassThrough = require_stream_passthrough();
    Stream.finished = require_end_of_stream();
    Stream.pipeline = require_pipeline();
    Stream.Stream = Stream;
    function Stream() {
      EE.call(this);
    }
    Stream.prototype.pipe = function(dest, options) {
      var source = this;
      function ondata(chunk) {
        if (dest.writable) {
          if (dest.write(chunk) === false && source.pause) {
            source.pause();
          }
        }
      }
      source.on("data", ondata);
      function ondrain() {
        if (source.readable && source.resume) {
          source.resume();
        }
      }
      dest.on("drain", ondrain);
      if (!dest._isStdio && (!options || options.end !== false)) {
        source.on("end", onend);
        source.on("close", onclose);
      }
      var didOnEnd = false;
      function onend() {
        if (didOnEnd)
          return;
        didOnEnd = true;
        dest.end();
      }
      function onclose() {
        if (didOnEnd)
          return;
        didOnEnd = true;
        if (typeof dest.destroy === "function")
          dest.destroy();
      }
      function onerror(er) {
        cleanup();
        if (EE.listenerCount(this, "error") === 0) {
          throw er;
        }
      }
      source.on("error", onerror);
      dest.on("error", onerror);
      function cleanup() {
        source.removeListener("data", ondata);
        dest.removeListener("drain", ondrain);
        source.removeListener("end", onend);
        source.removeListener("close", onclose);
        source.removeListener("error", onerror);
        dest.removeListener("error", onerror);
        source.removeListener("end", cleanup);
        source.removeListener("close", cleanup);
        dest.removeListener("close", cleanup);
      }
      source.on("end", cleanup);
      source.on("close", cleanup);
      dest.on("close", cleanup);
      dest.emit("pipe", source);
      return dest;
    };
  });

  // node_modules/parse5/lib/parser/parser_stream.js
  var require_parser_stream = __commonJS((exports2, module2) => {
    "use strict";
    var WritableStream = require_stream_browserify().Writable;
    var inherits = require_util().inherits;
    var Parser = require_parser();
    var ParserStream = module2.exports = function(options) {
      WritableStream.call(this);
      this.parser = new Parser(options);
      this.lastChunkWritten = false;
      this.writeCallback = null;
      this.pausedByScript = false;
      this.document = this.parser.treeAdapter.createDocument();
      this.pendingHtmlInsertions = [];
      this._resume = this._resume.bind(this);
      this._documentWrite = this._documentWrite.bind(this);
      this._scriptHandler = this._scriptHandler.bind(this);
      this.parser._bootstrap(this.document, null);
    };
    inherits(ParserStream, WritableStream);
    ParserStream.prototype._write = function(chunk, encoding, callback) {
      this.writeCallback = callback;
      this.parser.tokenizer.write(chunk.toString("utf8"), this.lastChunkWritten);
      this._runParsingLoop();
    };
    ParserStream.prototype.end = function(chunk, encoding, callback) {
      this.lastChunkWritten = true;
      WritableStream.prototype.end.call(this, chunk || "", encoding, callback);
    };
    ParserStream.prototype._runParsingLoop = function() {
      this.parser.runParsingLoopForCurrentChunk(this.writeCallback, this._scriptHandler);
    };
    ParserStream.prototype._resume = function() {
      if (!this.pausedByScript)
        throw new Error("Parser was already resumed");
      while (this.pendingHtmlInsertions.length) {
        var html = this.pendingHtmlInsertions.pop();
        this.parser.tokenizer.insertHtmlAtCurrentPos(html);
      }
      this.pausedByScript = false;
      if (this.parser.tokenizer.active)
        this._runParsingLoop();
    };
    ParserStream.prototype._documentWrite = function(html) {
      if (!this.parser.stopped)
        this.pendingHtmlInsertions.push(html);
    };
    ParserStream.prototype._scriptHandler = function(scriptElement) {
      if (this.listeners("script").length) {
        this.pausedByScript = true;
        this.emit("script", scriptElement, this._documentWrite, this._resume);
      } else
        this._runParsingLoop();
    };
  });

  // node_modules/parse5/lib/parser/plain_text_conversion_stream.js
  var require_plain_text_conversion_stream = __commonJS((exports2, module2) => {
    "use strict";
    var ParserStream = require_parser_stream();
    var inherits = require_util().inherits;
    var $ = require_html().TAG_NAMES;
    var PlainTextConversionStream = module2.exports = function(options) {
      ParserStream.call(this, options);
      this.parser._insertFakeElement($.HTML);
      this.parser._insertFakeElement($.HEAD);
      this.parser.openElements.pop();
      this.parser._insertFakeElement($.BODY);
      this.parser._insertFakeElement($.PRE);
      this.parser.treeAdapter.insertText(this.parser.openElements.current, "\n");
      this.parser.switchToPlaintextParsing();
    };
    inherits(PlainTextConversionStream, ParserStream);
  });

  // node_modules/parse5/lib/serializer/serializer_stream.js
  var require_serializer_stream = __commonJS((exports2, module2) => {
    "use strict";
    var ReadableStream = require_stream_browserify().Readable;
    var inherits = require_util().inherits;
    var Serializer = require_serializer();
    var SerializerStream = module2.exports = function(node2, options) {
      ReadableStream.call(this);
      this.serializer = new Serializer(node2, options);
      Object.defineProperty(this.serializer, "html", {
        get: function() {
          return "";
        },
        set: this.push.bind(this)
      });
    };
    inherits(SerializerStream, ReadableStream);
    SerializerStream.prototype._read = function() {
      this.serializer.serialize();
      this.push(null);
    };
  });

  // node_modules/parse5/lib/sax/dev_null_stream.js
  var require_dev_null_stream = __commonJS((exports2, module2) => {
    "use strict";
    var WritableStream = require_stream_browserify().Writable;
    var util = require_util();
    var DevNullStream = module2.exports = function() {
      WritableStream.call(this);
    };
    util.inherits(DevNullStream, WritableStream);
    DevNullStream.prototype._write = function(chunk, encoding, cb) {
      cb();
    };
  });

  // node_modules/parse5/lib/sax/parser_feedback_simulator.js
  var require_parser_feedback_simulator = __commonJS((exports2, module2) => {
    "use strict";
    var Tokenizer = require_tokenizer();
    var foreignContent = require_foreign_content();
    var UNICODE = require_unicode();
    var HTML = require_html();
    var $ = HTML.TAG_NAMES;
    var NS = HTML.NAMESPACES;
    var ParserFeedbackSimulator = module2.exports = function(tokenizer) {
      this.tokenizer = tokenizer;
      this.namespaceStack = [];
      this.namespaceStackTop = -1;
      this._enterNamespace(NS.HTML);
    };
    ParserFeedbackSimulator.prototype.getNextToken = function() {
      var token = this.tokenizer.getNextToken();
      if (token.type === Tokenizer.START_TAG_TOKEN)
        this._handleStartTagToken(token);
      else if (token.type === Tokenizer.END_TAG_TOKEN)
        this._handleEndTagToken(token);
      else if (token.type === Tokenizer.NULL_CHARACTER_TOKEN && this.inForeignContent) {
        token.type = Tokenizer.CHARACTER_TOKEN;
        token.chars = UNICODE.REPLACEMENT_CHARACTER;
      } else if (this.skipNextNewLine) {
        if (token.type !== Tokenizer.HIBERNATION_TOKEN)
          this.skipNextNewLine = false;
        if (token.type === Tokenizer.WHITESPACE_CHARACTER_TOKEN && token.chars[0] === "\n") {
          if (token.chars.length === 1)
            return this.getNextToken();
          token.chars = token.chars.substr(1);
        }
      }
      return token;
    };
    ParserFeedbackSimulator.prototype._enterNamespace = function(namespace) {
      this.namespaceStackTop++;
      this.namespaceStack.push(namespace);
      this.inForeignContent = namespace !== NS.HTML;
      this.currentNamespace = namespace;
      this.tokenizer.allowCDATA = this.inForeignContent;
    };
    ParserFeedbackSimulator.prototype._leaveCurrentNamespace = function() {
      this.namespaceStackTop--;
      this.namespaceStack.pop();
      this.currentNamespace = this.namespaceStack[this.namespaceStackTop];
      this.inForeignContent = this.currentNamespace !== NS.HTML;
      this.tokenizer.allowCDATA = this.inForeignContent;
    };
    ParserFeedbackSimulator.prototype._ensureTokenizerMode = function(tn) {
      if (tn === $.TEXTAREA || tn === $.TITLE)
        this.tokenizer.state = Tokenizer.MODE.RCDATA;
      else if (tn === $.PLAINTEXT)
        this.tokenizer.state = Tokenizer.MODE.PLAINTEXT;
      else if (tn === $.SCRIPT)
        this.tokenizer.state = Tokenizer.MODE.SCRIPT_DATA;
      else if (tn === $.STYLE || tn === $.IFRAME || tn === $.XMP || tn === $.NOEMBED || tn === $.NOFRAMES || tn === $.NOSCRIPT)
        this.tokenizer.state = Tokenizer.MODE.RAWTEXT;
    };
    ParserFeedbackSimulator.prototype._handleStartTagToken = function(token) {
      var tn = token.tagName;
      if (tn === $.SVG)
        this._enterNamespace(NS.SVG);
      else if (tn === $.MATH)
        this._enterNamespace(NS.MATHML);
      if (this.inForeignContent) {
        if (foreignContent.causesExit(token)) {
          this._leaveCurrentNamespace();
          return;
        }
        var currentNs = this.currentNamespace;
        if (currentNs === NS.MATHML)
          foreignContent.adjustTokenMathMLAttrs(token);
        else if (currentNs === NS.SVG) {
          foreignContent.adjustTokenSVGTagName(token);
          foreignContent.adjustTokenSVGAttrs(token);
        }
        foreignContent.adjustTokenXMLAttrs(token);
        tn = token.tagName;
        if (!token.selfClosing && foreignContent.isIntegrationPoint(tn, currentNs, token.attrs))
          this._enterNamespace(NS.HTML);
      } else {
        if (tn === $.PRE || tn === $.TEXTAREA || tn === $.LISTING)
          this.skipNextNewLine = true;
        else if (tn === $.IMAGE)
          token.tagName = $.IMG;
        this._ensureTokenizerMode(tn);
      }
    };
    ParserFeedbackSimulator.prototype._handleEndTagToken = function(token) {
      var tn = token.tagName;
      if (!this.inForeignContent) {
        var previousNs = this.namespaceStack[this.namespaceStackTop - 1];
        if (previousNs === NS.SVG && foreignContent.SVG_TAG_NAMES_ADJUSTMENT_MAP[tn])
          tn = foreignContent.SVG_TAG_NAMES_ADJUSTMENT_MAP[tn];
        if (foreignContent.isIntegrationPoint(tn, previousNs, token.attrs))
          this._leaveCurrentNamespace();
      } else if (tn === $.SVG && this.currentNamespace === NS.SVG || tn === $.MATH && this.currentNamespace === NS.MATHML)
        this._leaveCurrentNamespace();
      if (this.currentNamespace === NS.SVG)
        foreignContent.adjustTokenSVGTagName(token);
    };
  });

  // node_modules/parse5/lib/sax/index.js
  var require_sax = __commonJS((exports2, module2) => {
    "use strict";
    var TransformStream = require_stream_browserify().Transform;
    var DevNullStream = require_dev_null_stream();
    var inherits = require_util().inherits;
    var Tokenizer = require_tokenizer();
    var LocationInfoTokenizerMixin = require_tokenizer_mixin();
    var ParserFeedbackSimulator = require_parser_feedback_simulator();
    var mergeOptions = require_merge_options();
    var DEFAULT_OPTIONS = {
      locationInfo: false
    };
    var SAXParser = module2.exports = function(options) {
      TransformStream.call(this);
      this.options = mergeOptions(DEFAULT_OPTIONS, options);
      this.tokenizer = new Tokenizer(options);
      if (this.options.locationInfo)
        new LocationInfoTokenizerMixin(this.tokenizer);
      this.parserFeedbackSimulator = new ParserFeedbackSimulator(this.tokenizer);
      this.pendingText = null;
      this.currentTokenLocation = void 0;
      this.lastChunkWritten = false;
      this.stopped = false;
      this.pipe(new DevNullStream());
    };
    inherits(SAXParser, TransformStream);
    SAXParser.prototype._transform = function(chunk, encoding, callback) {
      if (!this.stopped) {
        this.tokenizer.write(chunk.toString("utf8"), this.lastChunkWritten);
        this._runParsingLoop();
      }
      this.push(chunk);
      callback();
    };
    SAXParser.prototype._flush = function(callback) {
      callback();
    };
    SAXParser.prototype.end = function(chunk, encoding, callback) {
      this.lastChunkWritten = true;
      TransformStream.prototype.end.call(this, chunk, encoding, callback);
    };
    SAXParser.prototype.stop = function() {
      this.stopped = true;
    };
    SAXParser.prototype._runParsingLoop = function() {
      do {
        var token = this.parserFeedbackSimulator.getNextToken();
        if (token.type === Tokenizer.HIBERNATION_TOKEN)
          break;
        if (token.type === Tokenizer.CHARACTER_TOKEN || token.type === Tokenizer.WHITESPACE_CHARACTER_TOKEN || token.type === Tokenizer.NULL_CHARACTER_TOKEN) {
          if (this.options.locationInfo) {
            if (this.pendingText === null)
              this.currentTokenLocation = token.location;
            else
              this.currentTokenLocation.endOffset = token.location.endOffset;
          }
          this.pendingText = (this.pendingText || "") + token.chars;
        } else {
          this._emitPendingText();
          this._handleToken(token);
        }
      } while (!this.stopped && token.type !== Tokenizer.EOF_TOKEN);
    };
    SAXParser.prototype._handleToken = function(token) {
      if (this.options.locationInfo)
        this.currentTokenLocation = token.location;
      if (token.type === Tokenizer.START_TAG_TOKEN)
        this.emit("startTag", token.tagName, token.attrs, token.selfClosing, this.currentTokenLocation);
      else if (token.type === Tokenizer.END_TAG_TOKEN)
        this.emit("endTag", token.tagName, this.currentTokenLocation);
      else if (token.type === Tokenizer.COMMENT_TOKEN)
        this.emit("comment", token.data, this.currentTokenLocation);
      else if (token.type === Tokenizer.DOCTYPE_TOKEN)
        this.emit("doctype", token.name, token.publicId, token.systemId, this.currentTokenLocation);
    };
    SAXParser.prototype._emitPendingText = function() {
      if (this.pendingText !== null) {
        this.emit("text", this.pendingText, this.currentTokenLocation);
        this.pendingText = null;
      }
    };
  });

  // node_modules/parse5/lib/index.js
  var require_lib = __commonJS((exports2) => {
    "use strict";
    var Parser = require_parser();
    var Serializer = require_serializer();
    exports2.parse = function parse(html, options) {
      var parser = new Parser(options);
      return parser.parse(html);
    };
    exports2.parseFragment = function parseFragment(fragmentContext, html, options) {
      if (typeof fragmentContext === "string") {
        options = html;
        html = fragmentContext;
        fragmentContext = null;
      }
      var parser = new Parser(options);
      return parser.parseFragment(html, fragmentContext);
    };
    exports2.serialize = function(node2, options) {
      var serializer = new Serializer(node2, options);
      return serializer.serialize();
    };
    exports2.treeAdapters = {
      default: require_default(),
      htmlparser2: require_htmlparser2()
    };
    exports2.ParserStream = require_parser_stream();
    exports2.PlainTextConversionStream = require_plain_text_conversion_stream();
    exports2.SerializerStream = require_serializer_stream();
    exports2.SAXParser = require_sax();
  });

  // node_modules/ramda/src/addIndex.js
  var require_addIndex = __commonJS((exports2, module2) => {
    var _concat = require_concat();
    var _curry1 = require_curry1();
    var _slice = require_slice();
    var curryN = require_curryN2();
    module2.exports = _curry1(function addIndex(fn) {
      return curryN(fn.length, function() {
        var idx = 0;
        var origFn = arguments[0];
        var list = arguments[arguments.length - 1];
        var args = _slice(arguments);
        args[0] = function() {
          var result = origFn.apply(this, _concat(arguments, [idx, list]));
          idx += 1;
          return result;
        };
        return fn.apply(this, args);
      });
    });
  });

  // node_modules/ramda/src/internal/_xfind.js
  var require_xfind = __commonJS((exports2, module2) => {
    var _curry2 = require_curry2();
    var _reduced = require_reduced();
    var _xfBase = require_xfBase();
    module2.exports = function() {
      function XFind(f, xf) {
        this.xf = xf;
        this.f = f;
        this.found = false;
      }
      XFind.prototype["@@transducer/init"] = _xfBase.init;
      XFind.prototype["@@transducer/result"] = function(result) {
        if (!this.found) {
          result = this.xf["@@transducer/step"](result, void 0);
        }
        return this.xf["@@transducer/result"](result);
      };
      XFind.prototype["@@transducer/step"] = function(result, input) {
        if (this.f(input)) {
          this.found = true;
          result = _reduced(this.xf["@@transducer/step"](result, input));
        }
        return result;
      };
      return _curry2(function _xfind(f, xf) {
        return new XFind(f, xf);
      });
    }();
  });

  // node_modules/ramda/src/find.js
  var require_find = __commonJS((exports2, module2) => {
    var _curry2 = require_curry2();
    var _dispatchable = require_dispatchable();
    var _xfind = require_xfind();
    module2.exports = _curry2(_dispatchable("find", _xfind, function find(fn, list) {
      var idx = 0;
      var len = list.length;
      while (idx < len) {
        if (fn(list[idx])) {
          return list[idx];
        }
        idx += 1;
      }
    }));
  });

  // node_modules/ramda/src/sortBy.js
  var require_sortBy = __commonJS((exports2, module2) => {
    var _curry2 = require_curry2();
    var _slice = require_slice();
    module2.exports = _curry2(function sortBy(fn, list) {
      return _slice(list).sort(function(a, b) {
        var aa = fn(a);
        var bb = fn(b);
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      });
    });
  });

  // node_modules/html-to-hyperscript/build/helpers.js
  var require_helpers = __commonJS((exports2) => {
    "use strict";
    var addIndex = require_addIndex();
    var append = require_append();
    var contains = require_contains2();
    var curry = require_curry();
    var filter = require_filter2();
    var find = require_find();
    var identity = require_identity2();
    var join = require_join();
    var map = require_map2();
    var pipe = require_pipe2();
    var reduce = require_reduce2();
    var reject = require_reject();
    var sortBy = require_sortBy();
    var mapI = addIndex(map);
    var reduceI = addIndex(reduce);
    var dropEmpty = filter(identity);
    var joinNonEmpty = pipe(dropEmpty, join(", "));
    var commonSort = sortBy(identity);
    var filterByNames = curry(function(names, attrs) {
      return filter(function(attr) {
        return contains(attr.name, names);
      }, attrs);
    });
    var rejectByNames = curry(function(names, attrs) {
      return reject(function(attr) {
        return contains(attr.name, names);
      }, attrs);
    });
    var findByName = curry(function(name, attrs) {
      return find(function(attr) {
        return attr.name == name;
      }, attrs);
    });
    exports2.mapI = mapI;
    exports2.reduceI = reduceI;
    exports2.dropEmpty = dropEmpty;
    exports2.joinNonEmpty = joinNonEmpty;
    exports2.commonSort = commonSort;
    exports2.filterByNames = filterByNames;
    exports2.rejectByNames = rejectByNames;
    exports2.findByName = findByName;
  });

  // node_modules/html-to-hyperscript/build/inline.js
  var require_inline = __commonJS((exports2, module2) => {
    "use strict";
    module2.exports = ["b", "big", "i", "small", "tt", "abbr", "acronym", "cite", "code", "dfn", "em", "kbd", "strong", "samp", "time", "var", "a", "bdo", "br", "img", "map", "object", "q", "script", "span", "sub", "sup", "button", "input", "label", "select", "textarea"];
  });

  // node_modules/html-to-hyperscript/build/index.js
  var require_build = __commonJS((exports2) => {
    "use strict";
    var assoc = require_assoc();
    var assocPath = require_assocPath();
    var append = require_append();
    var contains = require_contains2();
    var curry = require_curry();
    var drop = require_drop();
    var dropWhile = require_dropWhile();
    var identity = require_identity2();
    var join = require_join();
    var keys = require_keys();
    var map = require_map2();
    var merge = require_merge();
    var pipe = require_pipe2();
    var prepend = require_prepend();
    var split = require_split();
    var reduce = require_reduce2();
    var repeat = require_repeat();
    var replace = require_replace();
    var takeWhile = require_takeWhile();
    var trim = require_trim();
    var parse5 = require_lib();
    var _require = require_helpers();
    var mapI = _require.mapI;
    var reduceI = _require.reduceI;
    var dropEmpty = _require.dropEmpty;
    var joinNonEmpty = _require.joinNonEmpty;
    var commonSort = _require.commonSort;
    var filterByNames = _require.filterByNames;
    var rejectByNames = _require.rejectByNames;
    var findByName = _require.findByName;
    var inline = require_inline();
    var isComment = function isComment2(node2) {
      return node2.nodeName == "#comment";
    };
    var isText = function isText2(node2) {
      return node2.nodeName == "#text";
    };
    var isTag = function isTag2(node2) {
      return !(isComment(node2) || isText(node2));
    };
    var isInline = function isInline2(node2) {
      return isTag(node2) && contains(node2.tagName, inline);
    };
    var hasSelectorAttrs = function hasSelectorAttrs2(node2) {
      return filterByNames(["id", "className"], node2.attrs).length > 0;
    };
    var hasNonSelectorAttrs = function hasNonSelectorAttrs2(node2) {
      return rejectByNames(["id", "className"], node2.attrs).length > 0;
    };
    var hasChildren = function hasChildren2(node2) {
      return node2.childNodes && node2.childNodes.length > 0;
    };
    var normalizeAttrs = function normalizeAttrs2(attrs) {
      var className = (findByName("class", attrs) || findByName("classname", attrs) || {}).value;
      var htmlFor = (findByName("for", attrs) || findByName("htmlfor", attrs) || {}).value;
      return pipe(className ? append({name: "className", value: className}) : identity, htmlFor ? append({name: "htmlFor", value: htmlFor}) : identity)(rejectByNames(["class", "classname", "for", "htmlfor"], attrs));
    };
    var CSSRuleTextToObject = function CSSRuleTextToObject2(CSSText) {
      var regex = /([\w-]*)\s*:\s*([^;]*)/g;
      var match = void 0;
      var obj = {};
      while (match = regex.exec(CSSText)) {
        obj[match[1]] = match[2].trim();
      }
      return obj;
    };
    var attributesSelector = function attributesSelector2(item) {
      switch (item.name) {
        case "id":
          return assoc("id", item.value);
        case "style":
          return assoc("style", CSSRuleTextToObject(item.value));
        default:
          return assocPath(["attributes", item.name], item.value);
      }
    };
    var htmlToHs2 = curry(function(opts, html) {
      opts = merge({
        tabSize: 2,
        attributesSelector,
        syntax: "hh"
      }, opts);
      var nodes = parse5.parseFragment(trim(html)).childNodes;
      if (!nodes.length) {
        nodes = [{
          nodeName: "#text",
          value: html
        }];
      }
      var makeSpace = function makeSpace2(depth) {
        var tab = join("", repeat(" ", opts.tabSize));
        return join("", repeat(tab, depth));
      };
      var renderSelector = function renderSelector2(depth, node2) {
        var id = (findByName("id", node2.attrs) || {}).value;
        var className = (findByName("className", node2.attrs) || {}).value;
        var idSelector = id ? "#" + id : "";
        var classSelector = className ? "." + join(".", split(" ", className)) : "";
        return idSelector + classSelector;
      };
      var renderProps = function renderProps2(depth, node2) {
        var space = makeSpace(depth);
        var attrs = node2.attrs;
        var props = reduce(function(z, x) {
          return opts.attributesSelector(x)(z);
        }, {}, attrs);
        var json = JSON.stringify(props, null, 2);
        var rows = split("\n", json);
        var shiftedRows = prepend(rows[0], map(function(row) {
          return space + row;
        }, drop(1, rows)));
        return join("\n", shiftedRows);
      };
      var renderTextNode = function renderTextNode2(depth, node2, i) {
        var space = makeSpace(depth);
        var leftNode = node2.parentNode && node2.parentNode.childNodes[i - 1];
        var rightNode = node2.parentNode && node2.parentNode.childNodes[i + 1];
        var keepLeftSpace = leftNode ? isInline(leftNode) : false;
        var keepRightSpace = rightNode ? isInline(rightNode) : false;
        var text = node2.value;
        if (!keepLeftSpace) {
          text = replace(/^\s+/, "", text);
        }
        if (!keepRightSpace) {
          text = replace(/\s+$/, "", text);
        }
        if (text) {
          return space + "`" + text + "`";
        } else {
          return "";
        }
      };
      var renderCommentNode = function renderCommentNode2(depth, node2, i) {
        var space = makeSpace(depth);
        var comment = trim(node2.data);
        if (comment) {
          return space + "/* " + comment + " */";
        } else {
          return "";
        }
      };
      var renderTagNode = function renderTagNode2(depth, node2, i) {
        var space = makeSpace(depth);
        var selector = hasSelectorAttrs(node2) && renderSelector(depth, node2);
        var props = hasNonSelectorAttrs(node2) && renderProps(depth, node2);
        var children = hasChildren(node2) && renderNodes(depth, node2.childNodes);
        if (opts.syntax == "hh") {
          var quotedSelector = selector && '"' + selector + '"';
          return space + node2.tagName + "(" + joinNonEmpty([quotedSelector, props, children]) + ")";
        } else {
          var tagNameAndSelector = '"' + node2.tagName + (selector || "") + '"';
          return space + "h(" + joinNonEmpty([tagNameAndSelector, props, children]) + ")";
        }
      };
      var usedTagNames = new Set();
      var joinNodes = curry(function(depth, nodes2) {
        var init = dropEmpty(append(dropWhile(isComment, nodes2)[0], takeWhile(isComment, nodes2)));
        var tail = drop(1, dropWhile(isComment, nodes2));
        return reduceI(function(memo, node2, i) {
          var res = renderNode(depth, node2, i + init.length);
          if (memo && res) {
            return memo + (isComment(node2) ? "\n" : ",\n") + res;
          } else if (res) {
            return memo + res;
          } else {
            return memo;
          }
        }, join("\n", mapI(renderNode(depth), init)), tail);
      });
      var renderNodes = curry(function(depth, nodes2) {
        if (nodes2.length == 1 && isComment(nodes2[0])) {
          return renderCommentNode(0, nodes2[0], 0);
        } else if (nodes2.length == 1 && isText(nodes2[0])) {
          if (opts.syntax == "hh") {
            return "[" + renderTextNode(0, nodes2[0], 0) + "]";
          } else {
            return renderTextNode(0, nodes2[0], 0);
          }
        } else {
          var space = makeSpace(depth);
          return "[\n" + joinNodes(depth + 1, nodes2) + "\n" + space + "]";
        }
      });
      var renderNode = curry(function(depth, node2, i) {
        if (isComment(node2)) {
          return renderCommentNode(depth, node2, i);
        } else if (isText(node2)) {
          return renderTextNode(depth, node2, i);
        } else {
          usedTagNames.add(node2.tagName);
          var normNode = assoc("attrs", normalizeAttrs(node2.attrs), node2);
          return renderTagNode(depth, normNode, i);
        }
      });
      if (nodes.length == 1) {
        return [renderNode(0, nodes[0], 0), commonSort(Array.from(usedTagNames))];
      } else {
        return [renderNodes(0, nodes), commonSort(Array.from(usedTagNames))];
      }
    });
    var htmlToHs = curry(function(opts, html) {
      return htmlToHs2(opts, html)[0];
    });
    exports2.htmlToHs = htmlToHs;
    exports2.htmlToHs2 = htmlToHs2;
  });

  // node_modules/is-node/index.js
  var require_is_node = __commonJS((exports2, module2) => {
    "use strict";
    exports2 = module2.exports = !!("process".versions && "process".versions.node);
  });

  // distributable-commonjs/library/utility.cjs
  var require_utility = __commonJS((exports) => {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Utility = void 0;
    var _hyperscript = _interopRequireDefault(require_hyperscript());
    var _clone = _interopRequireDefault(require_clone());
    var ModuleConvert = _interopRequireWildcard(require_build());
    var _isNode = _interopRequireDefault(require_is_node());
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = new WeakMap();
      _getRequireWildcardCache = function() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {default: obj};
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    const {
      htmlToHs2: Convert
    } = ModuleConvert.default || ModuleConvert;
    class Utility {
      static create(...parameter) {
        return (0, _hyperscript.default)(...parameter);
      }
      static createNode(name, ...parameter) {
        let _name = name;
        let _property = {};
        let _childNode = [];
        switch (parameter.length) {
          case 0:
            break;
          case 1:
            switch (true) {
              case typeof parameter[0] === "string":
                _childNode = [parameter[0]];
                break;
              case Array.isArray(parameter[0]):
                _childNode = parameter[0];
                break;
              default:
                _property = parameter[0];
            }
            break;
          default:
            switch (true) {
              case typeof parameter[1] === "string":
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
        let _attribute = property.attributes ? (0, _clone.default)(property.attributes) : {};
        let map = {
          class: "className",
          colspan: "colSpan",
          for: "htmlFor",
          "http-equiv": "httpEquiv"
        };
        Object.entries(_property).filter(([name]) => name.toLowerCase() in map).forEach(([name, value]) => {
          _property[map[name.toLowerCase()]] = value;
          delete _property[name];
        });
        Object.entries(_property).filter(([name]) => /^\((.*?)\)$/.test(name) || _isNode.default && /^data-(.*?)$/.test(name) || name === "checked").forEach(([name, value]) => {
          _attribute[name] = value;
          delete _property[name];
        });
        if (_isNode.default && !Array.isArray(_attribute)) {
          _attribute = Object.entries(_attribute).sort(([leftName], [rightName]) => leftName.localeCompare(rightName)).map(([name, value]) => ({
            name,
            value
          }));
        }
        _property[_isNode.default ? "attributes" : "attrs"] = _attribute;
        return _property;
      }
      static getNode(node2) {
        let previousIndex = -1;
        let previousNode = void 0;
        node2 = node2.reduce((accumulator, currentNode) => {
          if (typeof currentNode === "string" && typeof previousNode === "string") {
            accumulator[previousIndex] += currentNode;
          } else {
            accumulator.push(currentNode);
            previousIndex++;
          }
          previousNode = currentNode;
          return accumulator;
        }, []);
        return node2;
      }
      static addNode(value, node2) {
        node2.push(...Array.isArray(value) ? value : [value]);
      }
      static addAttribute(name, value, attribute) {
        if (typeof value === "boolean" && value === false) {
        } else {
          name = this.getAttributeName(name);
          value = this.getAttributeValue(name, value, attribute[name]);
          if (value !== void 0) {
            attribute[name] = value;
          }
        }
      }
      static getAttributeName(name) {
        return name;
      }
      static getAttributeValue(name, value, currentValue) {
        if (typeof value === "boolean") {
          value = value ? name : false;
        } else if (typeof value === "string") {
          value = currentValue ? `${currentValue} ${value}` : value;
        } else if (Array.isArray(value)) {
          value = currentValue ? `${currentValue} ${value.join(" ")}` : value.join(" ");
        } else {
          switch (name.toLowerCase()) {
            case "class":
              value = Object.keys(value).filter((key) => value[key]).join(" ");
              break;
          }
        }
        return value === "" ? void 0 : value;
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
          entry.forEach(([name, value2]) => fn(value2, name));
          return entry.length;
        }
      }
      static convertToNode(value) {
        let pattern = /^\/\/<!\[CDATA\[(.*?)\/\/\]\]>$/ims;
        if (pattern.test(value)) {
          return value;
        } else {
          let [source, tag] = Convert({
            syntax: "h",
            tabSize: 2
          }, value);
          if (tag.length > 0) {
            let pattern = /h\((.*?)\)/gims;
            while (pattern.test(source)) {
              source = source.replace(pattern, "this.createNode($1)");
            }
            return eval(source);
          } else {
            return value;
          }
        }
      }
    }
    exports.Utility = Utility;
  });

  // distributable-commonjs/test/library/resource/scenario-00/case/02-case-fall-through-break.cjs
  var require_case_fall_through_break = __commonJS((exports2) => {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = _default;
    var _utility = require_utility();
    function __getNode(__local = {}, __utility = {}) {
      function __getNode2(__utility2 = {}) {
        const __node = [];
        var friends = 0;
        switch (friends) {
          case 0:
            __utility2.addNode(__utility2.createNode("p", {}, (() => {
              const __node2 = [];
              __utility2.addNode(__utility2.convertToNode("you have no friends"), __node2);
              return __node2;
            })()), __node);
            break;
            break;
          case 1:
            __utility2.addNode(__utility2.createNode("p", {}, (() => {
              const __node2 = [];
              __utility2.addNode(__utility2.convertToNode("you have very few friends"), __node2);
              return __node2;
            })()), __node);
            break;
          default:
            __utility2.addNode(__utility2.createNode("p", {}, (() => {
              const __node2 = [];
              __utility2.addNode(__utility2.convertToNode("you have "), __node2);
              {
                let value = friends;
                if (typeof value === "string") {
                  __utility2.addNode(__utility2.convertToNode(value), __node2);
                } else {
                  __utility2.addNode(value, __node2);
                }
              }
              __utility2.addNode(__utility2.convertToNode(" friends"), __node2);
              return __node2;
            })()), __node);
        }
        return __utility2.getNode(__node);
      }
      return __getNode2(__utility);
    }
    function _default(__local = {}, __utility = _utility.Utility) {
      return __getNode(__local, __utility);
    }
  });

  // distributable-commonjs/test/library/resource/scenario-00/case/02-case-fall-through-break-pre-bundle.cjs
  "use strict";
  var _caseFallThroughBreak = _interopRequireDefault2(require_case_fall_through_break());
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  let div = document.querySelector("body div");
  let node = (0, _caseFallThroughBreak.default)({});
  node.forEach((node2) => div.appendChild(typeof node2 === "string" ? document.createTextNode(node2) : node2));
})();
