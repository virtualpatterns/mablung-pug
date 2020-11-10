"use strict";

var ModuleParser = _interopRequireWildcard(require("@babel/parser"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _ava = _interopRequireDefault(require("ava"));

var _touch = _interopRequireDefault(require("touch"));

var ModuleTraverse = _interopRequireWildcard(require("@babel/traverse"));

var _index = require("../../index.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  'parse': Parse
} = ModuleParser.default || ModuleParser;
const Traverse = ModuleTraverse.default.default || ModuleTraverse.default;
const FilePath = __filename;

const FolderPath = _path.default.dirname(FilePath);

const Require = require;
(0, _ava.default)('createModuleFromPath(sourcePath, targetPath, option) using file', async test => {
  let sourcePath = `${FolderPath}/resource/transform-01/file/00-content.pug`;
  let targetPath = `${FolderPath}/resource/transform-01/file/00-content${_path.default.extname(FilePath)}`; // succeeds writing target
  // await test.notThrowsAsync(Transform.createModuleFromPath(sourcePath))

  test.is(await _index.Transform.createModuleFromPath(sourcePath), targetPath);
  test.true(await _fsExtra.default.pathExists(targetPath)); // succeeds (but writes nothing) with no change to source
  // await test.notThrowsAsync(Transform.createModuleFromPath(sourcePath))

  test.is(await _index.Transform.createModuleFromPath(sourcePath), targetPath); // fails to overwrite as 'flag' defaults to 'wx' with changed source 

  await (0, _touch.default)(sourcePath);
  await test.throwsAsync(_index.Transform.createModuleFromPath(sourcePath), {
    'code': 'EEXIST'
  }); // succeeds to overwrite as 'flag' is 'w' with changed source 

  await (0, _touch.default)(sourcePath);
  await test.notThrowsAsync(_index.Transform.createModuleFromPath(sourcePath, undefined, {
    'flag': 'w'
  })); // succeeds to overwrite as 'flag' is 'w' with changed source, utility import is defined

  let utilityPath = _path.default.relative(_path.default.dirname(sourcePath), Require.resolve(`../../library/utility${_path.default.extname(FilePath)}`));

  await (0, _touch.default)(sourcePath);
  await test.notThrowsAsync(_index.Transform.createModuleFromPath(sourcePath, undefined, {
    'flag': 'w',
    'utility': utilityPath
  }));
  let content = await _fsExtra.default.readFile(targetPath, {
    'encoding': 'utf-8'
  });
  let ast = Parse(content, {
    'sourceType': 'module'
  });
  let existsUtility = false;
  Traverse(ast, {
    CallExpression(path) {
      if (path.node.callee.name === 'require' && path.node.arguments.length === 1 && path.node.arguments[0].type === 'StringLiteral') {
        // test.log(`const Utility = require('${path.node.arguments[0].value}')`)
        test.is(path.node.arguments[0].value, utilityPath);
        existsUtility = true;
      }
    },

    ImportDeclaration(path) {
      // test.log(`import Utility from '${path.node.source.value}'`)
      test.is(path.node.source.value, utilityPath);
      existsUtility = true;
    }

  });
  test.true(existsUtility);
});
(0, _ava.default)('createModuleFromPath(sourcePath, targetPath, option) using folder', async test => {
  let sourcePath = `${FolderPath}/resource/transform-01/folder`;
  let targetPath = [`${FolderPath}/resource/transform-01/folder/00-content${_path.default.extname(FilePath)}`, `${FolderPath}/resource/transform-01/folder/01-content${_path.default.extname(FilePath)}`, `${FolderPath}/resource/transform-01/folder/02-content${_path.default.extname(FilePath)}`]; // succeeds writing target

  test.deepEqual(await _index.Transform.createModuleFromPath(sourcePath), targetPath);
  targetPath.forEach(targetPath => test.true(_fsExtra.default.pathExistsSync(targetPath))); // succeeds (but writes nothing) with no change to source

  test.deepEqual(await _index.Transform.createModuleFromPath(sourcePath), targetPath); // fails to overwrite as 'flag' defaults to 'wx' with changed source 

  await (0, _touch.default)(`${sourcePath}/02-content.pug`);
  await test.throwsAsync(_index.Transform.createModuleFromPath(sourcePath), {
    'code': 'EEXIST'
  }); // succeeds to overwrite as 'flag' is 'w' with changed source 

  await (0, _touch.default)(`${sourcePath}/02-content.pug`);
  await test.notThrowsAsync(_index.Transform.createModuleFromPath(sourcePath, undefined, {
    'flag': 'w'
  }));
});
(0, _ava.default)('createModuleFromPath(sourcePath, targetPath, option) using sub-folder', async test => {
  let sourcePath = `${FolderPath}/resource/transform-01/sub-folder`;
  let targetPath = [`${FolderPath}/resource/transform-01/sub-folder/folder/00-content${_path.default.extname(FilePath)}`, `${FolderPath}/resource/transform-01/sub-folder/folder/01-content${_path.default.extname(FilePath)}`, `${FolderPath}/resource/transform-01/sub-folder/folder/02-content${_path.default.extname(FilePath)}`, `${FolderPath}/resource/transform-01/sub-folder/00-content${_path.default.extname(FilePath)}`, `${FolderPath}/resource/transform-01/sub-folder/01-content${_path.default.extname(FilePath)}`, `${FolderPath}/resource/transform-01/sub-folder/02-content${_path.default.extname(FilePath)}`]; // succeeds writing target

  test.deepEqual(await _index.Transform.createModuleFromPath(sourcePath), targetPath);
  targetPath.forEach(targetPath => test.true(_fsExtra.default.pathExistsSync(targetPath))); // succeeds (but writes nothing) with no change to source

  test.deepEqual(await _index.Transform.createModuleFromPath(sourcePath), targetPath); // fails to overwrite as 'flag' defaults to 'wx' with changed source 

  await (0, _touch.default)(`${sourcePath}/folder/02-content.pug`);
  await (0, _touch.default)(`${sourcePath}/02-content.pug`);
  await test.throwsAsync(_index.Transform.createModuleFromPath(sourcePath), {
    'code': 'EEXIST'
  }); // succeeds to overwrite as 'flag' is 'w' with changed source 

  await (0, _touch.default)(`${sourcePath}/folder/02-content.pug`);
  await (0, _touch.default)(`${sourcePath}/02-content.pug`);
  await test.notThrowsAsync(_index.Transform.createModuleFromPath(sourcePath, undefined, {
    'flag': 'w'
  }));
});
//# sourceMappingURL=transform-01.test.cjs.map