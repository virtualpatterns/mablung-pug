// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-08 06:14:23
// Path = 'distributable-esmodule/test/library/resource/scenario-00/attribute/00-default.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    __utility.addNode(
      __utility.createNode(
        'a',
        (() => {
          const __attribute = {}
          __utility.addAttribute('href', '//google.com', __attribute)
          return __attribute
        })(),
        (() => {
          const __node = []
          __utility.addNode(__utility.convertToNode('Google'), __node)
          return __node
        })()
      ),
      __node
    )
    // |
    // |
    // a(class!='button' href!='//google.com') Google
    // |
    // |
    // a(class!='button', href!='//google.com') Google
    return __utility.getNode(__node)
  }
  return __getNode(__utility)
}
export default function (__local = {}, __utility = Utility) {
  return __getNode(__local, __utility)
}
