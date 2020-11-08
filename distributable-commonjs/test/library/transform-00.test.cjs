"use strict";

var _path = _interopRequireDefault(require("path"));

var _ava = _interopRequireDefault(require("ava"));

var _index = require("../../index.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FilePath = __filename;

const FolderPath = _path.default.dirname(FilePath);

const Require = require;
(0, _ava.default)('getAstFromPath(path)', async test => {
  await test.notThrowsAsync(_index.Transform.getAstFromPath(Require.resolve('./resource/transform-00/00-default.pug')));
});
(0, _ava.default)('getSourceFromPath(path)', async test => {
  await test.notThrowsAsync(_index.Transform.getSourceFromPath(Require.resolve('./resource/transform-00/00-default.pug')));
});
(0, _ava.default)('getFunctionSourceFromPath(path)', async test => {
  await test.notThrowsAsync(_index.Transform.getFunctionSourceFromPath(Require.resolve('./resource/transform-00/00-default.pug')));
});
[Require.resolve('./resource/transform-00/attribute/07-escaped-attributes.pug')].forEach(path => {
  (0, _ava.default)(`getFunctionFromPath('${_path.default.relative(`${FolderPath}/resource/transform-00`, path)}') throws UnsupportedAttributeTransformError`, async test => {
    await test.throwsAsync(_index.Transform.getFunctionFromPath(path), {
      'instanceOf': _index.UnsupportedAttributeTransformError
    });
  });
});
[Require.resolve('./resource/transform-00/code/04-escaped-buffered-code.pug'), Require.resolve('./resource/transform-00/code/05-escaped-buffered-inline-code.pug')].forEach(path => {
  (0, _ava.default)(`getFunctionFromPath('${_path.default.relative(`${FolderPath}/resource/transform-00`, path)}') throws UnsupportedCodeTransformError`, async test => {
    await test.throwsAsync(_index.Transform.getFunctionFromPath(path), {
      'instanceOf': _index.UnsupportedCodeTransformError
    });
  });
});
[Require.resolve('./resource/transform-00/comment/00-default-buffered.pug'), Require.resolve('./resource/transform-00/comment/02-block-buffered-comment.pug')].forEach(path => {
  (0, _ava.default)(`getFunctionFromPath('${_path.default.relative(`${FolderPath}/resource/transform-00`, path)}') throws UnsupportedCommentTransformError`, async test => {
    await test.throwsAsync(_index.Transform.getFunctionFromPath(path), {
      'instanceOf': _index.UnsupportedCommentTransformError
    });
  });
});
[Require.resolve('./resource/transform-00/doctype/00-default.pug')].forEach(path => {
  (0, _ava.default)(`getFunctionFromPath('${_path.default.relative(`${FolderPath}/resource/transform-00`, path)}') throws UnsupportedDocTypeTransformError`, async test => {
    await test.throwsAsync(_index.Transform.getFunctionFromPath(path), {
      'instanceOf': _index.UnsupportedDocTypeTransformError
    });
  });
});
[Require.resolve('./resource/transform-00/tag/02-self-closing-tag.pug')].forEach(path => {
  (0, _ava.default)(`getFunctionFromPath('${_path.default.relative(`${FolderPath}/resource/transform-00`, path)}') throws UnsupportedTagTransformError`, async test => {
    await test.throwsAsync(_index.Transform.getFunctionFromPath(path), {
      'instanceOf': _index.UnsupportedTagTransformError
    });
  });
});
//# sourceMappingURL=transform-00.test.cjs.map