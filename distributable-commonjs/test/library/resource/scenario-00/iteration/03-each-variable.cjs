'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-10 05:31:28
// Path = 'distributable-commonjs/test/library/resource/scenario-00/iteration/03-each-variable.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    var values = []

    __utility.addNode(
      __utility.createNode(
        'ul',
        {},
        (() => {
          const __node = []

          __utility.forEach(
            values.length ? values : ['There are no values'],
            (val) => {
              __utility.addNode(
                __utility.createNode(
                  'li',
                  {},
                  (() => {
                    const __node = []
                    {
                      let value = val

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
            }
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
