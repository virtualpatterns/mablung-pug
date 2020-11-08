'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-08 06:13:16
// Path = 'distributable-commonjs/test/library/resource/scenario-00/text/05-whitespace-recommended-1.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []

    __utility.addNode(__utility.convertToNode("Don't"), __node)

    __utility.addNode('\n', __node)

    __utility.addNode('', __node)

    __utility.addNode(
      __utility.createNode(
        'button',
        (() => {
          const __attribute = {}

          __utility.addAttribute('id', 'self-destruct', __attribute)

          return __attribute
        })(),
        (() => {
          const __node = []

          __utility.addNode(__utility.convertToNode('touch'), __node)

          return __node
        })()
      ),
      __node
    )

    __utility.addNode('', __node)

    __utility.addNode('\n', __node)

    __utility.addNode(__utility.convertToNode('me!'), __node)

    return __utility.getNode(__node)
  }

  return __getNode(__utility)
}

function _default(__local = {}, __utility = _utility.Utility) {
  return __getNode(__local, __utility)
}
