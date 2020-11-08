// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-08 06:13:18
// Path = 'distributable-esmodule/test/library/resource/scenario-00/interpolation/06-whitespace-control.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    __utility.addNode(
      __utility.createNode(
        'div',
        {},
        (() => {
          const __node = []
          __utility.addNode(
            __utility.createNode(
              'p',
              {},
              (() => {
                const __node = []
                __utility.addNode(
                  __utility.convertToNode(
                    "If I don't write the paragraph with tag interpolation, tags like"
                  ),
                  __node
                )
                __utility.addNode(
                  __utility.createNode(
                    'strong',
                    {},
                    (() => {
                      const __node = []
                      __utility.addNode(
                        __utility.convertToNode('strong'),
                        __node
                      )
                      return __node
                    })()
                  ),
                  __node
                )
                __utility.addNode(__utility.convertToNode('and'), __node)
                __utility.addNode(
                  __utility.createNode(
                    'em',
                    {},
                    (() => {
                      const __node = []
                      __utility.addNode(__utility.convertToNode('em'), __node)
                      return __node
                    })()
                  ),
                  __node
                )
                __utility.addNode(
                  __utility.convertToNode('might produce unexpected results.'),
                  __node
                )
                return __node
              })()
            ),
            __node
          )
          __utility.addNode(
            __utility.createNode(
              'p',
              {},
              (() => {
                const __node = []
                __utility.addNode(
                  __utility.convertToNode('If I do, whitespace is '),
                  __node
                )
                __utility.addNode(
                  __utility.createNode(
                    'strong',
                    {},
                    (() => {
                      const __node = []
                      __utility.addNode(
                        __utility.convertToNode('respected'),
                        __node
                      )
                      return __node
                    })()
                  ),
                  __node
                )
                __utility.addNode(__utility.convertToNode(' and '), __node)
                __utility.addNode(
                  __utility.createNode(
                    'em',
                    {},
                    (() => {
                      const __node = []
                      __utility.addNode(
                        __utility.convertToNode('everybody'),
                        __node
                      )
                      return __node
                    })()
                  ),
                  __node
                )
                __utility.addNode(__utility.convertToNode(' is happy.'), __node)
                return __node
              })()
            ),
            __node
          )
          return __node
        })()
      ),
      __node
    )
    // <div><p>If I don't write the paragraph with tag interpolation, tags like<strong>strong</strong>and<em>em</em>might produce unexpected results.</p><p>If I do, whitespace is <strong>respected</strong> and <em>everybody</em> is happy.</p></div>
    return __utility.getNode(__node)
  }
  return __getNode(__utility)
}
export default function (__local = {}, __utility = Utility) {
  return __getNode(__local, __utility)
}
