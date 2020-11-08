// Created by @virtualpatterns/mablung-pug v0.0.1-16
// Path = 'distributable-esmodule/test/library/resource/scenario-01/comment/04-conditional-comment.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    // doctype html
    __utility.addNode(
      __utility.convertToNode(
        '<!--[if IE 8]>\n<html lang="en" class="lt-ie9">\n<![endif]-->\n<!--[if gt IE 8]><!-->\n<html lang="en">\n<!--<![endif]-->'
      ),
      __node
    )
    __utility.addNode(
      __utility.createNode(
        'body',
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
                    'Supporting old web browsers is a pain.'
                  ),
                  __node
                )
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
    // </html>
    return __utility.getNode(__node)
  }
  return __getNode(__utility)
}
export default function (__local = {}, __utility = Utility) {
  return __getNode(__local, __utility)
}
