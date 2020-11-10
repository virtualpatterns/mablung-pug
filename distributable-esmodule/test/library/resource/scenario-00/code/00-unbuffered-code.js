// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-10 05:31:30
// Path = 'distributable-esmodule/test/library/resource/scenario-00/code/00-unbuffered-code.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    for (var x = 0; x < 1; x++) {
      __utility.addNode(
        __utility.createNode(
          'li',
          {},
          (() => {
            const __node = []
            __utility.addNode(__utility.convertToNode('item'), __node)
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
