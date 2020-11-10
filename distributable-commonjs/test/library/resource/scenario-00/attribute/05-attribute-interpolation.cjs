'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-10 05:14:06
// Path = 'distributable-commonjs/test/library/resource/scenario-00/attribute/05-attribute-interpolation.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    var url = 'pug-test.html'

    __utility.addNode(
      __utility.createNode(
        'a',
        (() => {
          const __attribute = {}

          __utility.addAttribute('href', '/' + url, __attribute)

          return __attribute
        })(),
        (() => {
          const __node = []

          __utility.addNode(__utility.convertToNode('Link'), __node)

          return __node
        })()
      ),
      __node
    )

    __utility.addNode('', __node)

    __utility.addNode('\n', __node)

    __utility.addNode('', __node)

    url = 'https://example.com/'

    __utility.addNode(
      __utility.createNode(
        'a',
        (() => {
          const __attribute = {}

          __utility.addAttribute('href', url, __attribute)

          return __attribute
        })(),
        (() => {
          const __node = []

          __utility.addNode(__utility.convertToNode('Another link'), __node)

          return __node
        })()
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
