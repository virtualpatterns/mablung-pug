'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-10 05:31:25
// Path = 'distributable-commonjs/test/command/resource/transform-00.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []

    __utility.addNode(
      __utility.createNode(
        'a',
        (() => {
          const __attribute = {}

          __utility.addAttribute('href', '//google.com', __attribute)

          return __attribute
        })(),
        (() => {
          const __node = []

          __utility.addNode(__utility.convertToNode('Google'), __node)

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
