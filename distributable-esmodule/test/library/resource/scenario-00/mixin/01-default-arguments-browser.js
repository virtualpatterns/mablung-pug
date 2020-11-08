// Created by @virtualpatterns/mablung-pug v0.0.1-17
// Path = 'distributable-esmodule/test/library/resource/scenario-00/mixin/01-default-arguments.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    function __mixin__pet(attribute, block, name) {
      const attributes = attribute
      const __node = []
      __utility.addNode(
        __utility.createNode(
          'li',
          (() => {
            const __attribute = {}
            __utility.addAttribute('class', 'pet', __attribute)
            return __attribute
          })(),
          (() => {
            const __node = []
            {
              let value = name
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
      return __node
    }
    __utility.addNode(
      __utility.createNode(
        'ul',
        {},
        (() => {
          const __node = []
          __utility.addNode(
            __mixin__pet(undefined, undefined, 'cat'),

            __node
          )

          __utility.addNode(
            __mixin__pet(undefined, undefined, 'dog'),

            __node
          )

          __utility.addNode(
            __mixin__pet(undefined, undefined, 'pig'),

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
