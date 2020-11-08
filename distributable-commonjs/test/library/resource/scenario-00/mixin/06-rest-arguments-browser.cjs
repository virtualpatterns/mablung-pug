'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-08 06:14:23
// Path = 'distributable-commonjs/test/library/resource/scenario-00/mixin/06-rest-arguments.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []

    function __mixin__list(attribute, block, id, ...items) {
      const attributes = attribute
      const __node = []

      __utility.addNode(
        __utility.createNode(
          'ul',
          (() => {
            const __attribute = {}

            __utility.addAttribute('id', id, __attribute)

            return __attribute
          })(),
          (() => {
            const __node = []

            __utility.forEach(items, (item) => {
              __utility.addNode(
                __utility.createNode(
                  'li',
                  {},
                  (() => {
                    const __node = []
                    {
                      let value = item

                      if (typeof value === 'string') {
                        __utility.addNode(
                          __utility.convertToNode(value),
                          __node
                        )
                      } else {
                        __utility.addNode(value, __node)
                      }
                    }
                    return __node
                  })()
                ),
                __node
              )
            })

            return __node
          })()
        ),
        __node
      )

      return __node
    }

    __utility.addNode(
      __mixin__list(undefined, undefined, 'my-list', 1, 2, 3, 4),
      __node
    )

    return __utility.getNode(__node)
  }

  return __getNode(__utility)
}

function _default(__local = {}, __utility = _utility.Utility) {
  return __getNode(__local, __utility)
}
