// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-10 05:31:30
// Path = 'distributable-esmodule/test/library/resource/scenario-00/mixin/05-default-values.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    // Declaration
    function __mixin__article(attribute, block, title = 'Default Title') {
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
    // Use
    __utility.addNode(
      __mixin__article(undefined, undefined),

      __node
    )

    __utility.addNode(
      __mixin__article(undefined, undefined, 'Hello world'),

      __node
    )

    return __utility.getNode(__node)
  }
  return __getNode(__utility)
}
export default function (__local = {}, __utility = Utility) {
  return __getNode(__local, __utility)
}
