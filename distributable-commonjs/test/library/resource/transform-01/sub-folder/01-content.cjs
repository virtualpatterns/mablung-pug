'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('@virtualpatterns/mablung-pug/utility')

// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-10 05:14:04
// Path = 'distributable-commonjs/test/library/resource/transform-01/sub-folder/01-content.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    var authenticated = true

    __utility.addNode(
      __utility.createNode(
        'body',
        (() => {
          const __attribute = {}

          __utility.addAttribute(
            'class',
            authenticated ? 'authed' : 'anon',
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
