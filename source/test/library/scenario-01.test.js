import DefaultCompare, * as ModuleCompare from 'html-differ'
import Path from 'path'
import Test from 'ava'

import { Scenario } from './scenario.js'

const { 'HtmlDiffer': _Compare } = DefaultCompare || ModuleCompare
const Compare = new _Compare({ 'compareAttributesAsJSON': [ { 'name': 'style', 'isFunction': false } ], 'ignoreComments': false })
const FilePath = __filePath
const FolderPath = Path.dirname(FilePath)
const Require = __require

;[ 
  Require.resolve('./resource/scenario-01/attribute/03-multiline-attribute.pug'),
  Require.resolve('./resource/scenario-01/comment/04-conditional-comment.pug')
].forEach((path) => {

  Test(`'${Path.relative(`${FolderPath}/resource/scenario-01`, path)}' browser is equal to server is not equal to reference`, async (test) => {

    let scenario = await Scenario.createScenarioFromFile(path)
    let [ referenceHtml, serverHtml, browserHtml ] = await Promise.all([ scenario.getReferenceHtml(), scenario.getServerHtml(), scenario.getBrowserHtml() ])

    if (Compare.isEqual(serverHtml, referenceHtml)) {

      test.log('-'.repeat(80))
      test.log('reference')
      test.log('-'.repeat(80))
      test.log(referenceHtml)

      test.log('-'.repeat(80))
      test.log('server')
      test.log('-'.repeat(80))
      test.log(serverHtml)

    }

    test.false(Compare.isEqual(serverHtml, referenceHtml))

    if (!Compare.isEqual(browserHtml, serverHtml)) {

      test.log('-'.repeat(80))
      test.log('server')
      test.log('-'.repeat(80))
      test.log(serverHtml)

      test.log('-'.repeat(80))
      test.log('browser')
      test.log('-'.repeat(80))
      test.log(browserHtml)

    }

    test.true(Compare.isEqual(browserHtml, serverHtml))

  })

})

;[ 
  Require.resolve('./resource/scenario-01/attribute/18-innerText.pug')
].forEach((path) => {

  Test(`'${Path.relative(`${FolderPath}/resource/scenario-01`, path)}' browser is not equal to server is not equal to reference`, async (test) => {

    let scenario = await Scenario.createScenarioFromFile(path)
    let [ referenceHtml, serverHtml, browserHtml ] = await Promise.all([ scenario.getReferenceHtml(), scenario.getServerHtml(), scenario.getBrowserHtml() ])

    if (Compare.isEqual(serverHtml, referenceHtml)) {

      test.log('-'.repeat(80))
      test.log('reference')
      test.log('-'.repeat(80))
      test.log(referenceHtml)

      test.log('-'.repeat(80))
      test.log('server')
      test.log('-'.repeat(80))
      test.log(serverHtml)

    }

    test.false(Compare.isEqual(serverHtml, referenceHtml))

    if (Compare.isEqual(browserHtml, serverHtml)) {

      test.log('-'.repeat(80))
      test.log('server')
      test.log('-'.repeat(80))
      test.log(serverHtml)

      test.log('-'.repeat(80))
      test.log('browser')
      test.log('-'.repeat(80))
      test.log(browserHtml)

    }

    test.false(Compare.isEqual(browserHtml, serverHtml))

  })

})

;[ 
  Require.resolve('./resource/scenario-01/filter/02-nested-filter.pug')
].forEach((path) => {

  Test(`'${Path.relative(`${FolderPath}/resource/scenario-01`, path)}' browser is equal to reference, server is not equal to reference`, async (test) => {

    let scenario = await Scenario.createScenarioFromFile(path)
    let [ referenceHtml, serverHtml, browserHtml ] = await Promise.all([ scenario.getReferenceHtml(), scenario.getServerHtml(), scenario.getBrowserHtml() ])

    if (Compare.isEqual(serverHtml, referenceHtml)) {

      test.log('-'.repeat(80))
      test.log('reference')
      test.log('-'.repeat(80))
      test.log(referenceHtml)

      test.log('-'.repeat(80))
      test.log('server')
      test.log('-'.repeat(80))
      test.log(serverHtml)

    }

    test.false(Compare.isEqual(serverHtml, referenceHtml))

    if (!Compare.isEqual(browserHtml, referenceHtml)) {

      test.log('-'.repeat(80))
      test.log('reference')
      test.log('-'.repeat(80))
      test.log(referenceHtml)

      test.log('-'.repeat(80))
      test.log('browser')
      test.log('-'.repeat(80))
      test.log(browserHtml)

    }

    test.true(Compare.isEqual(browserHtml, referenceHtml))

  })

})

;[ 
  Require.resolve('./resource/scenario-01/attribute/04-quoted-attributes.pug')
].forEach((path) => {

  Test(`'${Path.relative(`${FolderPath}/resource/scenario-01`, path)}' throws Error`, async (test) => {
    let scenario = await Scenario.createScenarioFromFile(path)
    await test.throwsAsync(scenario.getBrowserHtml(), { 'instanceOf': Error })
  })

})
