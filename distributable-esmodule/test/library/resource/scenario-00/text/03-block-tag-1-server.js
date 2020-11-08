// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-08 06:14:23
// Path = 'distributable-esmodule/test/library/resource/scenario-00/text/03-block-tag-1.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    __utility.addNode(
      __utility.createNode(
        'script',
        {},
        (() => {
          const __node = []
          __utility.addNode(__utility.convertToNode('if (usingPug)'), __node)
          __utility.addNode('\n', __node)
          __utility.addNode(
            __utility.convertToNode("  console.log('you are awesome')"),
            __node
          )
          __utility.addNode('\n', __node)
          __utility.addNode(__utility.convertToNode('else'), __node)
          __utility.addNode('\n', __node)
          __utility.addNode(
            __utility.convertToNode("  console.log('use pug')"),
            __node
          )
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
