'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-10 05:31:28
// Path = 'distributable-commonjs/test/library/resource/scenario-00/mixin/02-mixin-block.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []

    function __mixin__article(attribute, block, title) {
      const attributes = attribute
      const __node = []

      __utility.addNode(
        __utility.createNode(
          'div',
          (() => {
            const __attribute = {}

            __utility.addAttribute('class', 'article', __attribute)

            return __attribute
          })(),
          (() => {
            const __node = []

            __utility.addNode(
              __utility.createNode(
                'div',
                (() => {
                  const __attribute = {}

                  __utility.addAttribute(
                    'class',
                    'article-wrapper',
                    __attribute
                  )

                  return __attribute
                })(),
                (() => {
                  const __node = []

                  __utility.addNode(
                    __utility.createNode(
                      'h1',
                      {},
                      (() => {
                        const __node = []
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

                  if (block) {
                    __utility.addNode(block, __node)
                  } else {
                    __utility.addNode(
                      __utility.createNode(
                        'p',
                        {},
                        (() => {
                          const __node = []

                          __utility.addNode(
                            __utility.convertToNode('No content provided'),
                            __node
                          )

                          return __node
                        })()
                      ),
                      __node
                    )
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

      return __node
    }

    __utility.addNode(
      __mixin__article(undefined, undefined, 'Hello world'),
      __node
    )

    __utility.addNode(
      __mixin__article(
        undefined,
        (() => {
          const __node = []

          __utility.addNode(
            __utility.createNode(
              'p',
              {},
              (() => {
                const __node = []

                __utility.addNode(__utility.convertToNode('This is my'), __node)

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
                  __utility.convertToNode('Amazing article'),
                  __node
                )

                return __node
              })()
            ),
            __node
          )

          return __node
        })(),
        'Hello world'
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
