import _URL2 from "url";import { createRequire as _createRequire } from "module";import _URL from "url";import FileSystem from 'fs-extra';
import Path from 'path';
import Format from 'pretty';
import Test from 'ava';

import { Transform } from './transform.js';

const FilePath = _URL.fileURLToPath(import.meta.url);
const Require = _createRequire(import.meta.url);

Test('--help', async test => {

  let code = await new Promise(resolve => {
    new Transform({ '--help': true }).
    once('exit', resolve);
  });

  test.is(code, 0);

});

Test('help create-module', async test => {

  let code = await new Promise(resolve => {
    new Transform({ 'help': 'create-module' }).
    once('exit', resolve);
  });

  test.is(code, 0);

});

Test('create-module <source-path>', async test => {

  let sourcePath = Require.resolve('./resource/transform-00.pug');
  let targetPath = `${Path.dirname(sourcePath)}/${Path.basename(sourcePath, Path.extname(sourcePath))}${Path.extname(FilePath)}`;

  let code = await new Promise(resolve => {
    new Transform({
      'create-module': true,
      [sourcePath]: true,
      [targetPath]: true,
      '--encoding': 'utf-8',
      '--flag': 'wx',
      '--utility': Path.relative(Path.dirname(sourcePath), Require.resolve('../../library/utility.js')) }).

    once('exit', resolve);
  });

  test.is(code, 0);
  test.true(await FileSystem.pathExists(targetPath));

  // __transformPath does ...
  //   URL.pathToFileURL if the environment is ESModule
  //   require.resolve if the environment is CommonJS
  let module = await import(_URL2.pathToFileURL(targetPath));
  let fn = module.default || module;
  let node = fn();

  let html = null;
  html = node[0].outerHTML;
  html = Format(html);

  test.log(html);
  test.is(html, '<a href="//google.com">Google</a>');

});
//# sourceMappingURL=transform.test.js.map