'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-17
// Path = 'distributable-commonjs/test/library/resource/scenario-00/code/01-block-unbuffered-code.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    var list = ['Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis']

    __utility.forEach(list, (item) => {
      __utility.addNode(
        __utility.createNode(
          'li',
          {},
          (() => {
            const __node = []
            {
              let value = item

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
    })

    return __utility.getNode(__node)
  }

  return __getNode(__utility)
}

function _default(__local = {}, __utility = _utility.Utility) {
  return __getNode(__local, __utility)
}
