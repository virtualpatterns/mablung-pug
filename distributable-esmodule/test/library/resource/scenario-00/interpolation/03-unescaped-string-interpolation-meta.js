// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-10 05:14:07
// Path = 'distributable-esmodule/test/library/resource/scenario-00/interpolation/03-unescaped-string-interpolation-meta.pug'
import { Utility } from '../../../../../library/utility.js'
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
            __utility.convertToNode('Escaping works with #{interpolation}'),
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
        {},
        (() => {
          const __node = []
          __utility.addNode(
            __utility.convertToNode('Interpolation works with '),
            __node
          )
          {
            let value = '!{interpolation}'
            if (typeof value === 'string') {
              __utility.addNode(__utility.convertToNode(value), __node)
            } else {
              __utility.addNode(value, __node)
            }
          }
          __utility.addNode(__utility.convertToNode(' too!'), __node)
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
