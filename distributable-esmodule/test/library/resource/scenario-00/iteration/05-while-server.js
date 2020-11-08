// Created by @virtualpatterns/mablung-pug v0.0.1-17
// Path = 'distributable-esmodule/test/library/resource/scenario-00/iteration/05-while.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    var n = 0
    __utility.addNode(
      __utility.createNode(
        'ul',
        {},
        (() => {
          const __node = []
          while (n < 3) {
            __utility.addNode(
              __utility.createNode(
                'li',
                {},
                (() => {
                  const __node = []
                  {
                    let value = n++
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
export default function (__local = {}, __utility = Utility) {
  return __getNode(__local, __utility)
}
