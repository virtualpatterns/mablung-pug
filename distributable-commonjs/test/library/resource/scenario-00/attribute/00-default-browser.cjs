'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-17
// Path = 'distributable-commonjs/test/library/resource/scenario-00/attribute/00-default.pug'
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
    ) // |
    // |
    // a(class!='button' href!='//google.com') Google
    // |
    // |
    // a(class!='button', href!='//google.com') Google

    return __utility.getNode(__node)
  }

  return __getNode(__utility)
}

function _default(__local = {}, __utility = _utility.Utility) {
  return __getNode(__local, __utility)
}
