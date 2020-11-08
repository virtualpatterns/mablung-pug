'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-16
// Path = 'distributable-commonjs/test/library/resource/scenario-01/attribute/03-multiline-attribute.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []

    __utility.addNode(
      __utility.createNode(
        'input',
        (() => {
          const __attribute = {}

          __utility.addAttribute('type', 'text', __attribute)

          __utility.addAttribute(
            'data-json',
            `
  {
    "very-long": "piece of ",
    "data": true
  }
`,
            __attribute
          )

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
