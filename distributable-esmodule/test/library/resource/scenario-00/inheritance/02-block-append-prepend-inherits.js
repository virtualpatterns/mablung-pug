// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-10 05:14:08
// Path = 'distributable-esmodule/test/library/resource/scenario-00/inheritance/02-block-append-prepend-inherits.pug'
import { Utility } from '../../../../../library/utility.js'
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
                // BlockNode.isEmpty = true
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
export default function (__local = {}, __utility = Utility) {
  return __getNode(__local, __utility)
}
