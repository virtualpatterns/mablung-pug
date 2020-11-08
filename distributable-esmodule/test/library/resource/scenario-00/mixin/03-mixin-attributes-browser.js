// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-08 06:13:17
// Path = 'distributable-esmodule/test/library/resource/scenario-00/mixin/03-mixin-attributes.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    function __mixin__link(attribute, block, href, name) {
      const attributes = attribute
      const __node = []
      // attributes == {class: "btn"}
      // a(class!=attributes.class href!=href)!= name
      __utility.addNode(
        __utility.createNode(
          'a',
          (() => {
            const __attribute = {}
            __utility.addAttribute('class', attributes.class, __attribute)
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
      __mixin__link(
        (() => {
          const __attribute = {}
          __utility.addAttribute('class', 'btn', __attribute)
          return __attribute
        })(),
        undefined,
        '/foo',
        'foo'
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
