import _URL from "url";import BaseTest from 'ava';
import DefaultCompare, * as ModuleCompare from 'html-differ';
import Path from 'path';

import { Scenario } from './scenario.js';

const { 'HtmlDiffer': _Compare } = DefaultCompare || ModuleCompare;
const Compare = new _Compare({ 'compareAttributesAsJSON': [{ 'name': 'style', 'isFunction': false }], 'ignoreComments': false });
const FilePath = _URL.fileURLToPath(import.meta.url);
const FolderPath = Path.dirname(FilePath);

Scenario.createScenarioFromFolder(`${FolderPath}/resource/scenario-00`).forEach(scenario => {

  let Test = scenario.modifier.reduce((Test, modifier) => Test[modifier], BaseTest);

  Test(`'${Path.relative(`${FolderPath}/resource/scenario-00`, scenario.path)}'`, async test => {

    let [referenceHtml, serverHtml, browserHtml] = await Promise.all([scenario.getReferenceHtml(), scenario.getServerHtml(), scenario.getBrowserHtml()]);

    if (!Compare.isEqual(serverHtml, referenceHtml)) {

      test.log('-'.repeat(80));
      test.log('reference');
      test.log('-'.repeat(80));
      test.log(referenceHtml);

      test.log('-'.repeat(80));
      test.log('server');
      test.log('-'.repeat(80));
      test.log(serverHtml);

    }

    test.true(Compare.isEqual(serverHtml, referenceHtml));

    if (!Compare.isEqual(browserHtml, serverHtml)) {

      test.log('-'.repeat(80));
      test.log('server');
      test.log('-'.repeat(80));
      test.log(serverHtml);

      test.log('-'.repeat(80));
      test.log('browser');
      test.log('-'.repeat(80));
      test.log(browserHtml);

    }

    test.true(Compare.isEqual(browserHtml, serverHtml));

  });

});
//# sourceMappingURL=scenario-00.test.js.map