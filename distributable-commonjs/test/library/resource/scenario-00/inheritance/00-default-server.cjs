'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-16
// Path = 'distributable-commonjs/test/library/resource/scenario-00/inheritance/00-default.pug'
function __getNode(__local = {}, __utility = {}) {
  const { title } = __local

  function __getNode(__utility = {}) {
    const __node = []

    __utility.addNode(
      __utility.createNode(
        'html',
        {},
        (() => {
          const __node = []

          __utility.addNode(
            __utility.createNode(
              'head',
              {},
              (() => {
                const __node = []

                __utility.addNode(
                  __utility.createNode(
                    'title',
                    {},
                    (() => {
                      const __node = []

                      __utility.addNode(
                        __utility.convertToNode('My Site - '),
                        __node
                      )

                      {
                        let value = title

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

                __utility.addNode(
                  __utility.createNode(
                    'script',
                    (() => {
                      const __attribute = {}

                      __utility.addAttribute('src', '/jquery.js', __attribute)

                      return __attribute
                    })(),
                    []
                  ),
                  __node
                )

                return __node
              })()
            ),
            __node
          )

          __utility.addNode(
            __utility.createNode(
              'body',
              {},
              (() => {
                const __node = [] // BlockNode.isEmpty = true

                __utility.addNode(
                  __utility.createNode(
                    'div',
                    (() => {
                      const __attribute = {}

                      __utility.addAttribute('id', 'footer', __attribute)

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

                            __utility.addNode(
                              __utility.convertToNode('some footer content'),
                              __node
                            )

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
