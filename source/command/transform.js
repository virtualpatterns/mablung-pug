#!/usr/bin/env node

import '@virtualpatterns/mablung-source-map-support/install'
import Command from 'commander'
import Path from 'path'

import { Package } from '../library/package.js'
import { Transform } from '../library/transform.js'

const Process = process

async function main() {

  try {
        
    Command
      .version(Package.version)

    Command
      .command('create-module <source-path> [target-path]')
      .description('Create a module that returns nodes')
      .option('--encoding <encoding>', 'Encoding of the file', 'utf-8')
      .option('--flag <flag>', 'Flag used for to write the file, one of "w" or "wx"', 'wx')
      .option('--utility <module>', 'Module path of the utility class', '@virtualpatterns/mablung-pug/utility')
      .action(async (sourcePath, targetPath, option) => {

        try {

          // console.log(`sourcePath = '${Path.resolve(sourcePath)}'`)
          // console.log(`targetPath = ${targetPath ? `'${Path.resolve(sourcePath)}'` : '(undefined)'}`)
          // console.log(`--encoding = '${option.encoding}'`)

          await Transform.createModuleFromPath(Path.resolve(sourcePath), targetPath ? Path.resolve(targetPath) : undefined, {
            'encoding': option.encoding,
            'flag': option.flag,
            'utility': option.utility
          })

        } catch (error) {
          console.error(error)
          Process.exit(1)
        }

      })

    await Command.parseAsync(Process.argv)
        
  } catch (error) {
    console.error(error)
  }

}

main()
