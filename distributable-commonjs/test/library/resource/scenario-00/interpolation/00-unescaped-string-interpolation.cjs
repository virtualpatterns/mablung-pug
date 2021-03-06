'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-10 05:31:28
// Path = 'distributable-commonjs/test/library/resource/scenario-00/interpolation/00-unescaped-string-interpolation.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    var title = "On Dogs: Man's Best Friend"
    var author = 'enlore'
    var theGreat = '<span>escape!</span>'

    __utility.addNode(
      __utility.createNode(
        'h1',
        {},
        (() => {
          const __node = []
          {
            let value = title

            if (typeof value === 'string') {
              __utility.addNode(__utility.convertToNode(value), __node)
            } else {
              __utility.addNode(value, __node)
            }
          }
          return __node
        })()
      ),
      __node
    )

    __utility.addNode(
      __utility.createNode(
        'p',
        {},
        (() => {
          const __node = []

          __utility.addNode(
            __utility.convertToNode('Written with love by '),
            __node
          )

          {
            let value = author

            if (typeof value === 'string') {
              __utility.addNode(__utility.convertToNode(value), __node)
            } else {
              __utility.addNode(value, __node)
            }
          }
          return __node
        })()
      ),
      __node
    )

    __utility.addNode(
      __utility.createNode(
        'p',
        {},
        (() => {
          const __node = []

          __utility.addNode(
            __utility.convertToNode('This will be safe: '),
            __node
          )

          {
            let value = theGreat

            if (typeof value === 'string') {
              __utility.addNode(__utility.convertToNode(value), __node)
            } else {
              __utility.addNode(value, __node)
            }
          }
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
