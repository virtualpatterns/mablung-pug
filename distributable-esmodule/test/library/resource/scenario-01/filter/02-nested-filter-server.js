// Created by @virtualpatterns/mablung-pug v0.0.1-16
// Path = 'distributable-esmodule/test/library/resource/scenario-01/filter/02-nested-filter.pug'
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
          __utility.addNode(
            __utility.convertToNode(
              "//<![CDATA[\nconst myFunc = () => `This is ES2015 in a CD${'ATA'}`;\n//]]>"
            ),
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
