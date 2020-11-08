// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-08 06:14:23
// Path = 'distributable-esmodule/test/library/resource/scenario-00/attribute/06-attribute-interpolation-template.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    var btnType = 'info'
    var btnSize = 'lg'
    // button(class!='btn btn-' + btnType + ' btn-' + btnSize type!='button')
    __utility.addNode(
      __utility.createNode(
        'button',
        (() => {
          const __attribute = {}
          __utility.addAttribute(
            'class',
            'btn btn-' + btnType + ' btn-' + btnSize,
            __attribute
          )
          return __attribute
        })(),
        []
      ),
      __node
    )
    __utility.addNode('', __node)
    __utility.addNode('\n', __node)
    __utility.addNode('', __node)
    // button(class!=`btn btn-${btnType} btn-${btnSize}` type!='button')
    __utility.addNode(
      __utility.createNode(
        'button',
        (() => {
          const __attribute = {}
          __utility.addAttribute(
            'class',
            `btn btn-${btnType} btn-${btnSize}`,
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
