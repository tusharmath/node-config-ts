/**
 * Created by tushar on 30/12/17.
 */

import * as path from 'path'
import {config} from '../index'
import {basePath} from './basePath'

const JsonToTS = require('json-to-ts')

const FILE_NAME = 'Config.d.ts'
export const createTypeDefFile = (process: any) => {
  const filePath = path.resolve(basePath(process), FILE_NAME)
  const data = ['/* tslint:disable */']
    .concat(JsonToTS(config, {rootName: 'Config'}))
    .join('\n')
  return {filePath, data}
}
