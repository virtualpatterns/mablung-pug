// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-08 06:14:22
// Path = 'distributable-esmodule/test/library/resource/scenario-01/attribute/03-multiline-attribute.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    __utility.addNode(
      __utility.createNode(
        'input',
        (() => {
          const __attribute = {}
          __utility.addAttribute('type', 'text', __attribute)
          __utility.addAttribute(
            'data-json',
            `
  {
    "very-long": "piece of ",
    "data": true
  }
`,
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
