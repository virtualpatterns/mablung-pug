import Path from 'path'
import Test from 'ava'

import { Transform } from '../../index.js'

import { UnsupportedAttributeTransformError } from '../../index.js'
import { UnsupportedCodeTransformError } from '../../index.js'
import { UnsupportedCommentTransformError } from '../../index.js'
import { UnsupportedDocTypeTransformError } from '../../index.js'
import { UnsupportedTagTransformError } from '../../index.js'

const FilePath = __filePath
const FolderPath = Path.dirname(FilePath)
const Require = __require

Test('getAstFromPath(path)', async (test) => {
  await test.notThrowsAsync(Transform.getAstFromPath(Require.resolve('./resource/transform-00/00-default.pug')))
})

Test('getSourceFromPath(path)', async (test) => {
  await test.notThrowsAsync(Transform.getSourceFromPath(Require.resolve('./resource/transform-00/00-default.pug')))
})

Test('getFunctionSourceFromPath(path)', async (test) => {
  await test.notThrowsAsync(Transform.getFunctionSourceFromPath(Require.resolve('./resource/transform-00/00-default.pug')))
})

;[ 
  Require.resolve('./resource/transform-00/attribute/07-escaped-attributes.pug') 
].forEach((path) => {

  Test(`getFunctionFromPath('${Path.relative(`${FolderPath}/resource/transform-00`, path)}') throws UnsupportedAttributeTransformError`, async (test) => {
    await test.throwsAsync(Transform.getFunctionFromPath(path), { 'instanceOf': UnsupportedAttributeTransformError })
  })
  
})

;[ 
  Require.resolve('./resource/transform-00/code/04-escaped-buffered-code.pug'),
  Require.resolve('./resource/transform-00/code/05-escaped-buffered-inline-code.pug')
].forEach((path) => {

  Test(`getFunctionFromPath('${Path.relative(`${FolderPath}/resource/transform-00`, path)}') throws UnsupportedCodeTransformError`, async (test) => {
    await test.throwsAsync(Transform.getFunctionFromPath(path), { 'instanceOf': UnsupportedCodeTransformError })
  })

})

;[ 
  Require.resolve('./resource/transform-00/comment/00-default-buffered.pug'),
  Require.resolve('./resource/transform-00/comment/02-block-buffered-comment.pug')
].forEach((path) => {

  Test(`getFunctionFromPath('${Path.relative(`${FolderPath}/resource/transform-00`, path)}') throws UnsupportedCommentTransformError`, async (test) => {
    await test.throwsAsync(Transform.getFunctionFromPath(path), { 'instanceOf': UnsupportedCommentTransformError })
  })

})

;[ 
  Require.resolve('./resource/transform-00/doctype/00-default.pug')
].forEach((path) => {

  Test(`getFunctionFromPath('${Path.relative(`${FolderPath}/resource/transform-00`, path)}') throws UnsupportedDocTypeTransformError`, async (test) => {
    await test.throwsAsync(Transform.getFunctionFromPath(path), { 'instanceOf': UnsupportedDocTypeTransformError })
  })

})

;[ 
  Require.resolve('./resource/transform-00/tag/02-self-closing-tag.pug')
].forEach((path) => {

  Test(`getFunctionFromPath('${Path.relative(`${FolderPath}/resource/transform-00`, path)}') throws UnsupportedTagTransformError`, async (test) => {
    await test.throwsAsync(Transform.getFunctionFromPath(path), { 'instanceOf': UnsupportedTagTransformError })
  })

})
