import {config} from '../index'
import * as fs from 'fs'
import * as path from 'path'

const JsonToTS = require('json-to-ts')
const typeFile = `index.d.ts`
const defaultTypeFileContent = ['/* tslint:disable */', '/* eslint-disable */']

export const getTsFileBuffer = (config: Config) =>
  defaultTypeFileContent
    .concat(JsonToTS(config, {rootName: 'Config'}))
    .concat('export declare const config: Config')
    .join('\n')
/**
 * Generate typeDefs files
 */
export const generateTypeDefFiles = () => {
  Object.keys(config).forEach(p => {
    fs.writeFileSync(
      path.resolve(process.cwd(), p, typeFile),
      getTsFileBuffer(config[p])
    )
  })
}
