#!/usr/bin/env node
"use strict";

require("@virtualpatterns/mablung-source-map-support/install");

var _commander = _interopRequireDefault(require("commander"));

var _path = _interopRequireDefault(require("path"));

var _package = require("../library/package.cjs");

var _transform = require("../library/transform.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Process = process;

async function main() {
  try {
    _commander.default.version(_package.Package.version);

    _commander.default.command('create-module <source-path> [target-path]').description('Create a module that returns nodes').option('--encoding <encoding>', 'Encoding of the file', 'utf-8').option('--flag <flag>', 'Flag used for to write the file, one of "w" or "wx"', 'wx').option('--utility <module>', 'Module path of the utility class', '@virtualpatterns/mablung-pug/utility').action(async (sourcePath, targetPath, option) => {
      try {
        // console.log(`sourcePath = '${Path.resolve(sourcePath)}'`)
        // console.log(`targetPath = ${targetPath ? `'${Path.resolve(sourcePath)}'` : '(undefined)'}`)
        // console.log(`--encoding = '${option.encoding}'`)
        await _transform.Transform.createModuleFromPath(_path.default.resolve(sourcePath), targetPath ? _path.default.resolve(targetPath) : undefined, {
          'encoding': option.encoding,
          'flag': option.flag,
          'utility': option.utility
        });
      } catch (error) {
        console.error(error);
        Process.exit(1);
      }
    });

    await _commander.default.parseAsync(Process.argv);
  } catch (error) {
    console.error(error);
  }
}

main();
//# sourceMappingURL=transform.cjs.map