// Created by @virtualpatterns/mablung-pug v0.0.1-17
// Path = 'distributable-esmodule/test/library/resource/scenario-00/text/02-piped-text.pug'
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
            __utility.convertToNode(
              'The pipe always goes at the beginning of its own line,'
            ),
            __node
          )
          __utility.addNode('\n', __node)
          __utility.addNode(
            __utility.convertToNode('not counting indentation.'),
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
