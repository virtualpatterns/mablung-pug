// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-10 05:31:30
// Path = 'distributable-esmodule/test/library/resource/scenario-00/case/01-case-fall-through.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    var friends = 0
    switch (friends) {
      case 0:
      case 1:
        __utility.addNode(
          __utility.createNode(
            'p',
            {},
            (() => {
              const __node = []
              __utility.addNode(
                __utility.convertToNode('you have very few friends'),
                __node
              )
              return __node
            })()
          ),
          __node
        )
        break
      default:
        __utility.addNode(
          __utility.createNode(
            'p',
            {},
            (() => {
              const __node = []
              __utility.addNode(__utility.convertToNode('you have '), __node)
              {
                let value = friends
                if (typeof value === 'string') {
                  __utility.addNode(__utility.convertToNode(value), __node)
                } else {
                  __utility.addNode(value, __node)
                }
              }
              __utility.addNode(__utility.convertToNode(' friends'), __node)
              return __node
            })()
          ),
          __node
        )
    }

    return __utility.getNode(__node)
  }
  return __getNode(__utility)
}
export default function (__local = {}, __utility = Utility) {
  return __getNode(__local, __utility)
}
