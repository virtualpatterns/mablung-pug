'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-16
// Path = 'distributable-commonjs/test/library/resource/scenario-01/include/02-filtered-text.pug'
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
                    'title',
                    {},
                    (() => {
                      const __node = []

                      __utility.addNode(
                        __utility.convertToNode('An Article'),
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
                  __utility.convertToNode(
                    '# 02-filtered-text-markdown.md\n\nThis is an article written in markdown.'
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