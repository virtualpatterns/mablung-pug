// Created by @virtualpatterns/mablung-pug v0.0.1-16
// Path = 'distributable-esmodule/test/library/resource/scenario-00/attribute/10-class-attribute-array.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    var classes = ['foo', 'bar', 'baz']
    __utility.addNode(
      __utility.createNode(
        'a',
        (() => {
          const __attribute = {}
          __utility.addAttribute('class', classes, __attribute)
          return __attribute
        })(),
        []
      ),
      __node
    )
    __utility.addNode('', __node)
    __utility.addNode('\n', __node)
    __utility.addNode('', __node)
    // the class attribute may also be repeated to merge arrays
    __utility.addNode(
      __utility.createNode(
        'a',
        (() => {
          const __attribute = {}
          __utility.addAttribute('class', 'bang', __attribute)
          __utility.addAttribute('class', classes, __attribute)
          __utility.addAttribute('class', ['bing'], __attribute)
          return __attribute
        })(),
        []
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