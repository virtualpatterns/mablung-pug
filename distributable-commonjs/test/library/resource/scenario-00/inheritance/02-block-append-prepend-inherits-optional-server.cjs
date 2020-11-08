'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-08 06:14:23
// Path = 'distributable-commonjs/test/library/resource/scenario-00/inheritance/02-block-append-prepend-inherits-optional.pug'
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
                    'script',
                    (() => {
                      const __attribute = {}

                      __utility.addAttribute(
                        'src',
                        '/vendor/three.js',
                        __attribute
                      )

                      return __attribute
                    })(),
                    []
                  ),
                  __node
                )

                __utility.addNode(
                  __utility.createNode(
                    'script',
                    (() => {
                      const __attribute = {}

                      __utility.addAttribute('src', '/game.js', __attribute)

                      return __attribute
                    })(),
                    []
                  ),
                  __node
                )

                __utility.addNode(
                  __utility.createNode(
                    'script',
                    (() => {
                      const __attribute = {}

                      __utility.addAttribute(
                        'src',
                        '/vendor/jquery.js',
                        __attribute
                      )

                      return __attribute
                    })(),
                    []
                  ),
                  __node
                )

                __utility.addNode(
                  __utility.createNode(
                    'script',
                    (() => {
                      const __attribute = {}

                      __utility.addAttribute(
                        'src',
                        '/vendor/caustic.js',
                        __attribute
                      )

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
