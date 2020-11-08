'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-08 06:13:16
// Path = 'distributable-commonjs/test/library/resource/scenario-00/interpolation/05-tag-interpolation.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []

    __utility.addNode(
      __utility.createNode(
        'p',
        {},
        (() => {
          const __node = []

          __utility.addNode(
            __utility.convertToNode(
              'This is a very long and boring paragraph that spans multiple lines.'
            ),
            __node
          )

          __utility.addNode('\n', __node)

          __utility.addNode(
            __utility.convertToNode(
              'Suddenly there is a ![strong strongly worded phrase] that cannot be'
            ),
            __node
          )

          __utility.addNode('\n', __node)

          __utility.addNode(__utility.convertToNode('![em ignored].'), __node)

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
            __utility.convertToNode(
              "And here's an example of an interpolated tag with an attribute:"
            ),
            __node
          )

          __utility.addNode('\n', __node)

          __utility.addNode(
            __utility.convertToNode('![q(lang="es") \xA1Hola Mundo!]'),
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
