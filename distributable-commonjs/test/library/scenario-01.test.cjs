"use strict";

var ModuleCompare = _interopRequireWildcard(require("html-differ"));

var _path = _interopRequireDefault(require("path"));

var _ava = _interopRequireDefault(require("ava"));

var _scenario = require("./scenario.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  'HtmlDiffer': _Compare
} = ModuleCompare.default || ModuleCompare;
const Compare = new _Compare({
  'compareAttributesAsJSON': [{
    'name': 'style',
    'isFunction': false
  }],
  'ignoreComments': false
});
const FilePath = __filename;

const FolderPath = _path.default.dirname(FilePath);

const Require = require;
[Require.resolve('./resource/scenario-01/attribute/03-multiline-attribute.pug'), Require.resolve('./resource/scenario-01/comment/04-conditional-comment.pug'), Require.resolve('./resource/scenario-01/include/02-filtered-text.pug')].forEach(path => {
  (0, _ava.default)(`'${_path.default.relative(`${FolderPath}/resource/scenario-01`, path)}' browser is equal to server is not equal to reference`, async test => {
    let scenario = await _scenario.Scenario.createScenarioFromFile(path);
    let [referenceHtml, serverHtml, browserHtml] = await Promise.all([scenario.getReferenceHtml(), scenario.getServerHtml(), scenario.getBrowserHtml()]);

    if (Compare.isEqual(serverHtml, referenceHtml)) {
      test.log('-'.repeat(80));
      test.log('reference');
      test.log('-'.repeat(80));
      test.log(referenceHtml);
      test.log('-'.repeat(80));
      test.log('server');
      test.log('-'.repeat(80));
      test.log(serverHtml);
    }

    test.false(Compare.isEqual(serverHtml, referenceHtml));

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
[Require.resolve('./resource/scenario-01/attribute/18-innerText.pug')].forEach(path => {
  (0, _ava.default)(`'${_path.default.relative(`${FolderPath}/resource/scenario-01`, path)}' browser is not equal to server is not equal to reference`, async test => {
    let scenario = await _scenario.Scenario.createScenarioFromFile(path);
    let [referenceHtml, serverHtml, browserHtml] = await Promise.all([scenario.getReferenceHtml(), scenario.getServerHtml(), scenario.getBrowserHtml()]);

    if (Compare.isEqual(serverHtml, referenceHtml)) {
      test.log('-'.repeat(80));
      test.log('reference');
      test.log('-'.repeat(80));
      test.log(referenceHtml);
      test.log('-'.repeat(80));
      test.log('server');
      test.log('-'.repeat(80));
      test.log(serverHtml);
    }

    test.false(Compare.isEqual(serverHtml, referenceHtml));

    if (Compare.isEqual(browserHtml, serverHtml)) {
      test.log('-'.repeat(80));
      test.log('server');
      test.log('-'.repeat(80));
      test.log(serverHtml);
      test.log('-'.repeat(80));
      test.log('browser');
      test.log('-'.repeat(80));
      test.log(browserHtml);
    }

    test.false(Compare.isEqual(browserHtml, serverHtml));
  });
});
[Require.resolve('./resource/scenario-01/filter/02-nested-filter.pug')].forEach(path => {
  (0, _ava.default)(`'${_path.default.relative(`${FolderPath}/resource/scenario-01`, path)}' browser is equal to reference, server is not equal to reference`, async test => {
    let scenario = await _scenario.Scenario.createScenarioFromFile(path);
    let [referenceHtml, serverHtml, browserHtml] = await Promise.all([scenario.getReferenceHtml(), scenario.getServerHtml(), scenario.getBrowserHtml()]);

    if (Compare.isEqual(serverHtml, referenceHtml)) {
      test.log('-'.repeat(80));
      test.log('reference');
      test.log('-'.repeat(80));
      test.log(referenceHtml);
      test.log('-'.repeat(80));
      test.log('server');
      test.log('-'.repeat(80));
      test.log(serverHtml);
    }

    test.false(Compare.isEqual(serverHtml, referenceHtml));

    if (!Compare.isEqual(browserHtml, referenceHtml)) {
      test.log('-'.repeat(80));
      test.log('reference');
      test.log('-'.repeat(80));
      test.log(referenceHtml);
      test.log('-'.repeat(80));
      test.log('browser');
      test.log('-'.repeat(80));
      test.log(browserHtml);
    }

    test.true(Compare.isEqual(browserHtml, referenceHtml));
  });
});
[Require.resolve('./resource/scenario-01/attribute/04-quoted-attributes.pug')].forEach(path => {
  (0, _ava.default)(`'${_path.default.relative(`${FolderPath}/resource/scenario-01`, path)}' throws Error`, async test => {
    let scenario = await _scenario.Scenario.createScenarioFromFile(path);
    await test.throwsAsync(scenario.getBrowserHtml(), {
      'instanceOf': Error
    });
  });
});
//# sourceMappingURL=scenario-01.test.cjs.map