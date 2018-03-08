/**
 * Created by tushar on 30/12/17.
 */

import * as path from 'path'
import {basePath} from './basePath'
import {mergeAllConfigs} from './mergeAllConfigs'

const JsonToTS = require('json-to-ts')

const FILE_NAME = 'Config.d.ts'
export const createTypeDefFile = (process: any) => {
  const filePath = path.resolve(basePath(process), FILE_NAME)
  const data = ['\n/* tslint:disable */']
    .concat(JsonToTS(mergeAllConfigs(process), {rootName: 'Config'}))
    .join('\n')
  return {filePath, data}
}
