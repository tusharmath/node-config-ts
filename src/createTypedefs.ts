/**
 * Created by tushar on 30/12/17.
 */

import * as fs from 'fs'
import * as path from 'path'
import {config} from '../index'
import {baseConfigPath} from './baseConfigPath'
import * as prettier from 'prettier'

const JsonToTS = require('json-to-ts')

const file = `Config.d.ts`
const ts = prettier.format(
  [
    '/* tslint:disable */',
    '/* eslint-disable */',
    'declare module "node-config-ts" {'
  ]
    .concat(JsonToTS(config, {rootName: 'IConfig'}))
    .concat([
      'export const config: Config',
      'export type Config = IConfig',
      '}'
    ])
    .join('\n'),
  {
    parser: 'typescript',
    semi: false
  }
)

fs.writeFileSync(path.resolve(process.cwd(), baseConfigPath(process), file), ts)
