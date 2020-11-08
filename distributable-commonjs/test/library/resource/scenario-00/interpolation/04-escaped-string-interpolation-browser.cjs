'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-16
// Path = 'distributable-commonjs/test/library/resource/scenario-00/interpolation/04-escaped-string-interpolation.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    var riskyBusiness =
      "<em>Some of the girls are wearing my mother's clothing.</em>"

    __utility.addNode(
      __utility.createNode(
        'div',
        (() => {
          const __attribute = {}

          __utility.addAttribute('class', 'quote', __attribute)

          return __attribute
        })(),
        (() => {
          const __node = []

          __utility.addNode(
            __utility.createNode(
              'p',
              {},
              (() => {
                const __node = []

                __utility.addNode(__utility.convertToNode('Joel: '), __node)

                {
                  let value = riskyBusiness

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
