// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-10 05:14:07
// Path = 'distributable-esmodule/test/library/resource/scenario-00/comment/01-default-unbuffered.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    // will not output within markup
    __utility.addNode(
      __utility.createNode(
        'p',
        {},
        (() => {
          const __node = []
          __utility.addNode(__utility.convertToNode('foo'), __node)
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
          __utility.addNode(__utility.convertToNode('bar'), __node)
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
