/**
 * Created by tushar on 30/12/17.
 */

import * as fs from 'fs'
import * as path from 'path'
import * as glob from 'glob';
import {mergeFileConfigsForPath} from './mergeFileConfigsForPath'
import {baseConfigPath} from './baseConfigPath'

const JsonToTS = require('json-to-ts')

const typeFile = `index.d.ts`
const jsFile = 'index.js'
const defaultFileContent = ['/* tslint:disable */', '/* eslint-disable */']
const defaultJsContent = 'export const config ='

const getJsFileBuffer = (config: Config) => defaultJsContent
  .concat(JSON.stringify(config))

const getTsFileBuffer = (config: Config) => defaultFileContent
  .concat(JsonToTS(config, {rootName: 'Config'}))
  .concat('export declare const config: Config')
  .join('\n')

const baseConfigPathName = baseConfigPath(process)

const generateTypeDefs = () => {
  const configPaths = glob.sync(`**/*/${baseConfigPathName}`, {ignore:  [
      'node_modules/**',
    ]})
  configPaths.forEach((p) => {
    const config = mergeFileConfigsForPath(process, p)
    if(fs.existsSync(path.resolve(process.cwd(), p, baseConfigPathName))){
      fs.writeFileSync(path.resolve(process.cwd(), p, typeFile), getTsFileBuffer(config))
      fs.writeFileSync(path.resolve(process.cwd(), p, jsFile), getJsFileBuffer(config))
    }
  })
}

generateTypeDefs()
