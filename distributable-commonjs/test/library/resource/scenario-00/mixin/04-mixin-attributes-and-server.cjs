'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-08 06:13:16
// Path = 'distributable-commonjs/test/library/resource/scenario-00/mixin/04-mixin-attributes-and.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []

    function __mixin__link(attribute, block, href, name) {
      const attributes = attribute
      const __node = []

      __utility.addNode(
        __utility.createNode(
          'a',
          (() => {
            const __attribute = {}

            __utility.addAndAttribute(attributes, __attribute)

            return __attribute
          })(),
          (() => {
            const __node = []
            {
              let value = name

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

      return __node
    }

    __utility.addNode(
      __mixin__link(
        (() => {
          const __attribute = {}

          __utility.addAttribute('class', 'btn', __attribute)

          return __attribute
        })(),
        undefined,
        '/foo',
        'foo'
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
