// Created by @virtualpatterns/mablung-pug v0.0.1-17
// Path = 'distributable-esmodule/test/library/resource/scenario-00/text/04-whitespace-1.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    __utility.addNode(__utility.convertToNode('You put the em'), __node)
    __utility.addNode(
      __utility.createNode(
        'em',
        {},
        (() => {
          const __node = []
          __utility.addNode(__utility.convertToNode('pha'), __node)
          return __node
        })()
      ),
      __node
    )
    __utility.addNode(__utility.convertToNode('sis on the wrong syl'), __node)
    __utility.addNode(
      __utility.createNode(
        'em',
        {},
        (() => {
          const __node = []
          __utility.addNode(__utility.convertToNode('la'), __node)
          return __node
        })()
      ),
      __node
    )
    __utility.addNode(__utility.convertToNode('ble.'), __node)
    return __utility.getNode(__node)
  }
  return __getNode(__utility)
}
export default function (__local = {}, __utility = Utility) {
  return __getNode(__local, __utility)
}
