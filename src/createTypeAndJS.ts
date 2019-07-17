/**
 * Created by tushar on 30/12/17.
 */

import * as fs from 'fs'
import * as path from 'path'
import {checkIfDefaultJson} from './checkIfDefaultJson'
import {createMergedConfig} from './createMergedConfig'

const JsonToTS = require('json-to-ts')

const typeFile = `index.d.ts`
const jsFile = 'index.js'
const defaultTypeFileContent = ['/* tslint:disable */', '/* eslint-disable */']
const defaultJsFileContent =
  "import {config as mainConfig} from 'node-config-ts' \n export const config ="

const getJsFileBuffer = (p: string) =>
  defaultJsFileContent.concat(` mainConfig['${p}']`)

const getTsFileBuffer = (config: Config) =>
  defaultTypeFileContent
    .concat(JsonToTS(config, {rootName: 'Config'}))
    .concat('export declare const config: Config')
    .join('\n')

/**
 * Write typedef and js for each path in nested config
 */
export const writeConfigFilesToSystem = () => {
  const config = createMergedConfig(process)
  Object.keys(config).forEach(p => {
    if (checkIfDefaultJson(process, p)) {
      fs.writeFileSync(
        path.resolve(process.cwd(), p, typeFile),
        getTsFileBuffer(config[p])
      )
      fs.writeFileSync(
        path.resolve(process.cwd(), p, jsFile),
        getJsFileBuffer(p)
      )
    }
  })
}

writeConfigFilesToSystem()
