'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-10 05:14:06
// Path = 'distributable-commonjs/test/library/resource/scenario-00/attribute/02-multiline-attribute.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []

    __utility.addNode(
      __utility.createNode(
        'input',
        (() => {
          const __attribute = {}

          __utility.addAttribute('type', 'checkbox', __attribute)

          __utility.addAttribute('name', 'agreement', __attribute)

          __utility.addAttribute('checked', true, __attribute)

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
