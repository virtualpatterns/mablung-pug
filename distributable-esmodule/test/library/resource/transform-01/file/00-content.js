// Created by @virtualpatterns/mablung-pug v0.0.1-17
// Path = 'distributable-esmodule/test/library/resource/transform-01/file/00-content.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    var authenticated = true
    __utility.addNode(
      __utility.createNode(
        'body',
        (() => {
          const __attribute = {}
          __utility.addAttribute(
            'class',
            authenticated ? 'authed' : 'anon',
            __attribute
          )
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
