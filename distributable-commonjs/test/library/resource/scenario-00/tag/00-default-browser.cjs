'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-16
// Path = 'distributable-commonjs/test/library/resource/scenario-00/tag/00-default.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []

    __utility.addNode(
      __utility.createNode(
        'ul',
        {},
        (() => {
          const __node = []

          __utility.addNode(
            __utility.createNode(
              'li',
              {},
              (() => {
                const __node = []

                __utility.addNode(__utility.convertToNode('Item A'), __node)

                return __node
              })()
            ),
            __node
          )

          __utility.addNode(
            __utility.createNode(
              'li',
              {},
              (() => {
                const __node = []

                __utility.addNode(__utility.convertToNode('Item B'), __node)

                return __node
              })()
            ),
            __node
          )

          __utility.addNode(
            __utility.createNode(
              'li',
              {},
              (() => {
                const __node = []

                __utility.addNode(__utility.convertToNode('Item C'), __node)

                return __node
              })()
            ),
            __node
          )

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