// Created by @virtualpatterns/mablung-pug v0.0.1-17
// Path = 'distributable-esmodule/test/library/resource/scenario-00/text/06-whitespace-not-recommended.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    __utility.addNode(__utility.convertToNode('Hey, check out '), __node)
    __utility.addNode(
      __utility.createNode(
        'a',
        (() => {
          const __attribute = {}
          __utility.addAttribute(
            'href',
            'http://example.biz/kitteh.png',
            __attribute
          )
          return __attribute
        })(),
        (() => {
          const __node = []
          __utility.addNode(__utility.convertToNode('this picture'), __node)
          return __node
        })()
      ),
      __node
    )
    __utility.addNode(__utility.convertToNode(' of my cat!'), __node)
    return __utility.getNode(__node)
  }
  return __getNode(__utility)
}
export default function (__local = {}, __utility = Utility) {
  return __getNode(__local, __utility)
}
