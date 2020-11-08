'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-08 06:13:15
// Path = 'distributable-commonjs/test/library/resource/scenario-00/include/01-plain-text.pug'
function __getNode(__local = {}, __utility = {}) {
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
                    'style',
                    {},
                    (() => {
                      const __node = []

                      __utility.addNode(
                        __utility.convertToNode('h1 {\n  color: red;\n}'),
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

          __utility.addNode(
            __utility.createNode(
              'body',
              {},
              (() => {
                const __node = []

                __utility.addNode(
                  __utility.createNode(
                    'h1',
                    {},
                    (() => {
                      const __node = []

                      __utility.addNode(
                        __utility.convertToNode('My Site'),
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
                        __utility.convertToNode(
                          'Welcome to my super lame site.'
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
                    'script',
                    {},
                    (() => {
                      const __node = []

                      __utility.addNode(
                        __utility.convertToNode(
                          "console.log('You are awesome')"
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
