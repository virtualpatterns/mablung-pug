"use strict";

var _ava = _interopRequireDefault(require("ava"));

var ModuleCompare = _interopRequireWildcard(require("html-differ"));

var _path = _interopRequireDefault(require("path"));

var _scenario = require("./scenario.cjs");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

_scenario.Scenario.createScenarioFromFolder(`${FolderPath}/resource/scenario-00`).forEach(scenario => {
  let Test = scenario.modifier.reduce((Test, modifier) => Test[modifier], _ava.default);
  Test(`'${_path.default.relative(`${FolderPath}/resource/scenario-00`, scenario.path)}'`, async test => {
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
//# sourceMappingURL=scenario-00.test.cjs.map