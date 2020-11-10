// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-10 05:14:07
// Path = 'distributable-esmodule/test/library/resource/scenario-00/attribute/08-boolean-attribute.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    __utility.addNode(
      __utility.createNode(
        'input',
        (() => {
          const __attribute = {}
          __utility.addAttribute('type', 'checkbox', __attribute)
          __utility.addAttribute('checked', true, __attribute)
          return __attribute
        })(),
        []
      ),
      __node
    )
    // |
    // |
    // input(type!='checkbox' checked!=true)
    // |
    // |
    // input(type!='checkbox' checked!=false)
    // |
    // |
    // input(type!='checkbox' checked!=true.toString())
    return __utility.getNode(__node)
  }
  return __getNode(__utility)
}
export default function (__local = {}, __utility = Utility) {
  return __getNode(__local, __utility)
}
