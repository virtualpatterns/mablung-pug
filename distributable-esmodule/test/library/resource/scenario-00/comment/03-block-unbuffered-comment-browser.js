// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-08 06:14:24
// Path = 'distributable-esmodule/test/library/resource/scenario-00/comment/03-block-unbuffered-comment.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    __utility.addNode(
      __utility.createNode(
        'body',
        {},
        (() => {
          const __node = []
          // Comments for your template writers.
          // Use as much text as you want.
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
