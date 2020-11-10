'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-10 05:14:07
// Path = 'distributable-commonjs/test/library/resource/scenario-00/text/04-whitespace-2.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []

    __utility.addNode(
      __utility.createNode(
        'a',
        {},
        (() => {
          const __node = []

          __utility.addNode(
            __utility.convertToNode('...sentence ending with a link'),
            __node
          )

          return __node
        })()
      ),
      __node
    )

    __utility.addNode(__utility.convertToNode('.'), __node)

    return __utility.getNode(__node)
  }

  return __getNode(__utility)
}

function _default(__local = {}, __utility = _utility.Utility) {
  return __getNode(__local, __utility)
}
