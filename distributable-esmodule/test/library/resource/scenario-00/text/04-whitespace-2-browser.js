// Created by @virtualpatterns/mablung-pug v0.0.1-16
// Path = 'distributable-esmodule/test/library/resource/scenario-00/text/04-whitespace-2.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    __utility.addNode(
      __utility.createNode(
        'a',
        {},
        (() => {
          const __node = []
          __utility.addNode(
            __utility.convertToNode('...sentence ending with a link'),
            __node
          )
          return __node
        })()
      ),
      __node
    )
    __utility.addNode(__utility.convertToNode('.'), __node)
    return __utility.getNode(__node)
  }
  return __getNode(__utility)
}
export default function (__local = {}, __utility = Utility) {
  return __getNode(__local, __utility)
}