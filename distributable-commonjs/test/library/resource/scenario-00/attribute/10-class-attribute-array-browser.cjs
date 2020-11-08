'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-17
// Path = 'distributable-commonjs/test/library/resource/scenario-00/attribute/10-class-attribute-array.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    var classes = ['foo', 'bar', 'baz']

    __utility.addNode(
      __utility.createNode(
        'a',
        (() => {
          const __attribute = {}

          __utility.addAttribute('class', classes, __attribute)

          return __attribute
        })(),
        []
      ),
      __node
    )

    __utility.addNode('', __node)

    __utility.addNode('\n', __node)

    __utility.addNode('', __node) // the class attribute may also be repeated to merge arrays

    __utility.addNode(
      __utility.createNode(
        'a',
        (() => {
          const __attribute = {}

          __utility.addAttribute('class', 'bang', __attribute)

          __utility.addAttribute('class', classes, __attribute)

          __utility.addAttribute('class', ['bing'], __attribute)

          return __attribute
        })(),
        []
      ),
      __node
    )

    return __utility.getNode(__node)
  }

  return __getNode(__utility)
}

function _default(__local = {}, __utility = _utility.Utility) {
  return __getNode(__local, __utility)
}
