'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-08 06:14:22
// Path = 'distributable-commonjs/test/library/resource/scenario-00/code/00-unbuffered-code.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []

    for (var x = 0; x < 1; x++) {
      __utility.addNode(
        __utility.createNode(
          'li',
          {},
          (() => {
            const __node = []

            __utility.addNode(__utility.convertToNode('item'), __node)

            return __node
          })()
        ),
        __node
      )
    }

    return __utility.getNode(__node)
  }

  return __getNode(__utility)
}

function _default(__local = {}, __utility = _utility.Utility) {
  return __getNode(__local, __utility)
}
