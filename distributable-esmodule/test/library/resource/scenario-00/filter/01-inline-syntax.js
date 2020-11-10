// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-10 05:31:29
// Path = 'distributable-esmodule/test/library/resource/scenario-00/filter/01-inline-syntax.pug'
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
            __utility.convertToNode('<strong>BOLD TEXT</strong>'),
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
            __utility.convertToNode('In the midst of a large amount of plain'),
            __node
          )
          __utility.addNode('\n', __node)
          __utility.addNode(
            __utility.convertToNode('text, suddenly a wild '),
            __node
          )
          __utility.addNode(
            __utility.convertToNode('<em>Markdown</em>'),
            __node
          )
          __utility.addNode('', __node)
          __utility.addNode('\n', __node)
          __utility.addNode(__utility.convertToNode('appeared.'), __node)
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
