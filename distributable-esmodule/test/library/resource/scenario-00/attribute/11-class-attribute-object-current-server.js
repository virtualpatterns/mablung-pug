// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-08 06:13:17
// Path = 'distributable-esmodule/test/library/resource/scenario-00/attribute/11-class-attribute-object-current.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    var currentUrl = '/about'
    // a(class!={active: currentUrl === '/'} href!='/') Home
    __utility.addNode(
      __utility.createNode(
        'a',
        (() => {
          const __attribute = {}
          __utility.addAttribute(
            'class',
            { active: currentUrl === '/' },
            __attribute
          )
          return __attribute
        })(),
        (() => {
          const __node = []
          __utility.addNode(__utility.convertToNode('Home'), __node)
          return __node
        })()
      ),
      __node
    )
    __utility.addNode('', __node)
    __utility.addNode('\n', __node)
    __utility.addNode('', __node)
    // a(class!={active: currentUrl === '/about'} href!='/about') About
    __utility.addNode(
      __utility.createNode(
        'a',
        (() => {
          const __attribute = {}
          __utility.addAttribute(
            'class',
            { active: currentUrl === '/about' },
            __attribute
          )
          return __attribute
        })(),
        (() => {
          const __node = []
          __utility.addNode(__utility.convertToNode('About'), __node)
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
