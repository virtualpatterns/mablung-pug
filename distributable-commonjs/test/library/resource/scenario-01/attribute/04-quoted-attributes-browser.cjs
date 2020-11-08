'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-17
// Path = 'distributable-commonjs/test/library/resource/scenario-01/attribute/04-quoted-attributes.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []

    __utility.addNode(
      __utility.createNode(
        'div',
        (() => {
          const __attribute = {}

          __utility.addAttribute('class', 'div-class', __attribute)

          __utility.addAttribute('(click)', 'play()', __attribute)

          return __attribute
        })(),
        []
      ),
      __node
    )

    __utility.addNode(
      __utility.createNode(
        'div',
        (() => {
          const __attribute = {}

          __utility.addAttribute('class', 'div-class', __attribute)

          __utility.addAttribute('(click)', 'play()', __attribute)

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
