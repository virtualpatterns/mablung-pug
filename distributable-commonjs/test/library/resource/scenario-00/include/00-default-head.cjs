'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-10 05:31:28
// Path = 'distributable-commonjs/test/library/resource/scenario-00/include/00-default-head.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []

    __utility.addNode(
      __utility.createNode(
        'head',
        {},
        (() => {
          const __node = []

          __utility.addNode(
            __utility.createNode(
              'title',
              {},
              (() => {
                const __node = []

                __utility.addNode(__utility.convertToNode('My Site'), __node)

                return __node
              })()
            ),
            __node
          )

          __utility.addNode(
            __utility.createNode(
              'script',
              (() => {
                const __attribute = {}

                __utility.addAttribute(
                  'src',
                  '/javascripts/jquery.js',
                  __attribute
                )

                return __attribute
              })(),
              []
            ),
            __node
          )

          __utility.addNode(
            __utility.createNode(
              'script',
              (() => {
                const __attribute = {}

                __utility.addAttribute(
                  'src',
                  '/javascripts/app.js',
                  __attribute
                )

                return __attribute
              })(),
              []
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
