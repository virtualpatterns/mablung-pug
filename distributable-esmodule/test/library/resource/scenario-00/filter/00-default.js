// Created by @virtualpatterns/mablung-pug v0.0.1-18
// Created at 2020-11-10 05:31:29
// Path = 'distributable-esmodule/test/library/resource/scenario-00/filter/00-default.pug'
import { Utility } from '../../../../../library/utility.js'
function __getNode(__local = {}, __utility = {}) {
  function __getNode(__utility = {}) {
    const __node = []
    __utility.addNode(
      __utility.convertToNode(
        '<h1>Markdown</h1>\n<p>Markdown document with <a href="http://links.com">http://links.com</a> and</p>\n<pre><code class="highlight-js">var codeBlocks;\n</code></pre>\n'
      ),
      __node
    )
    __utility.addNode(
      __utility.createNode(
        'script',
        {},
        (() => {
          const __node = []
          __utility.addNode(
            __utility.convertToNode(
              "(function() {\n  console.log('This is coffee script');\n\n}).call(this);\n"
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
