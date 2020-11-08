'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-08 06:13:15
// Path = 'distributable-commonjs/test/library/resource/scenario-00/conditional/02-default-else.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    var user = {
      descriptionX: 'foo bar baz'
    }
    var authorised = false

    __utility.addNode(
      __utility.createNode(
        'div',
        (() => {
          const __attribute = {}

          __utility.addAttribute('id', 'user', __attribute)

          return __attribute
        })(),
        (() => {
          const __node = []

          if (user.description) {
            __utility.addNode(
              __utility.createNode(
                'h2',
                (() => {
                  const __attribute = {}

                  __utility.addAttribute('class', 'green', __attribute)

                  return __attribute
                })(),
                (() => {
                  const __node = []

                  __utility.addNode(
                    __utility.convertToNode('Description'),
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
                (() => {
                  const __attribute = {}

                  __utility.addAttribute('class', 'description', __attribute)

                  return __attribute
                })(),
                (() => {
                  const __node = []
                  {
                    let value = user.description

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
          } else {
            if (authorised) {
              __utility.addNode(
                __utility.createNode(
                  'h2',
                  (() => {
                    const __attribute = {}

                    __utility.addAttribute('class', 'blue', __attribute)

                    return __attribute
                  })(),
                  (() => {
                    const __node = []

                    __utility.addNode(
                      __utility.convertToNode('Description'),
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
                  (() => {
                    const __attribute = {}

                    __utility.addAttribute('class', 'description', __attribute)

                    return __attribute
                  })(),
                  (() => {
                    const __node = []

                    __utility.addNode(
                      __utility.convertToNode('User has no description,'),
                      __node
                    )

                    __utility.addNode('\n', __node)

                    __utility.addNode(
                      __utility.convertToNode('why not add one...'),
                      __node
                    )

                    return __node
                  })()
                ),
                __node
              )
            } else {
              __utility.addNode(
                __utility.createNode(
                  'h2',
                  (() => {
                    const __attribute = {}

                    __utility.addAttribute('class', 'red', __attribute)

                    return __attribute
                  })(),
                  (() => {
                    const __node = []

                    __utility.addNode(
                      __utility.convertToNode('Description'),
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
                  (() => {
                    const __attribute = {}

                    __utility.addAttribute('class', 'description', __attribute)

                    return __attribute
                  })(),
                  (() => {
                    const __node = []

                    __utility.addNode(
                      __utility.convertToNode('User has no description'),
                      __node
                    )

                    return __node
                  })()
                ),
                __node
              )
            }
          }

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
