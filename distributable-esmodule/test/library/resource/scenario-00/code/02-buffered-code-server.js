// Created by @virtualpatterns/mablung-pug v0.0.1-16
// Path = 'distributable-esmodule/test/library/resource/scenario-00/code/02-buffered-code.pug'
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
          {
            let value = 'This code is <strong>not</strong> escaped!'
            if (typeof value === 'string') {
              __utility.addNode(__utility.convertToNode(value), __node)
            } else {
              __utility.addNode(value, __node)
            }
          }
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