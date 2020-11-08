'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = _default

var _utility = require('../../../../../library/utility.cjs')

// Created by @virtualpatterns/mablung-pug v0.0.1-16
// Path = 'distributable-commonjs/test/library/resource/scenario-00/text/05-whitespace-recommended-2.pug'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []

    __utility.addNode(
      __utility.createNode(
        'p',
        {},
        (() => {
          const __node = []

          __utility.addNode(
            __utility.convertToNode(
              'Using regular tags can help keep your lines short,'
            ),
            __node
          )

          __utility.addNode('\n', __node)

          __utility.addNode(
            __utility.convertToNode('but interpolated tags may be easier to '),
            __node
          )

          __utility.addNode(
            __utility.createNode(
              'em',
              {},
              (() => {
                const __node = []

                __utility.addNode(__utility.convertToNode('visualize'), __node)

                return __node
              })()
            ),
            __node
          )

          __utility.addNode('', __node)

          __utility.addNode('\n', __node)

          __utility.addNode(
            __utility.convertToNode(
              'whether the tags and text are whitespace-separated.'
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
