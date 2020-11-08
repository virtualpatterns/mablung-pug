'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-16
// Path = 'distributable-commonjs/test/library/resource/scenario-00/filter/01-inline-syntax.pug'
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
            __utility.convertToNode('<strong>BOLD TEXT</strong>'),
            __node
          )

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
            __utility.convertToNode('In the midst of a large amount of plain'),
            __node
          )

          __utility.addNode('\n', __node)

          __utility.addNode(
            __utility.convertToNode('text, suddenly a wild '),
            __node
          )

          __utility.addNode(
            __utility.convertToNode('<em>Markdown</em>'),
            __node
          )

          __utility.addNode('', __node)

          __utility.addNode('\n', __node)

          __utility.addNode(__utility.convertToNode('appeared.'), __node)

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
