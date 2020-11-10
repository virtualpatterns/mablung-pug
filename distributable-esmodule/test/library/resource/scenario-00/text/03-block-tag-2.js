// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-10 05:14:07
// Path = 'distributable-esmodule/test/library/resource/scenario-00/text/03-block-tag-2.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    __utility.addNode(
      __utility.createNode(
        'div',
        {},
        (() => {
          const __node = []
          __utility.addNode(
            __utility.createNode(
              'p',
              {},
              (() => {
                const __node = []
                __utility.addNode(
                  __utility.convertToNode(
                    'This text belongs to the paragraph tag.'
                  ),
                  __node
                )
                return __node
              })()
            ),
            __node
          )
          __utility.addNode(__utility.createNode('br', {}, []), __node)
          __utility.addNode(
            __utility.convertToNode('This text belongs to the div tag.'),
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
