/**
 * Created by tushar on 30/12/17.
 */

import * as fs from 'fs'
import * as path from 'path'
import {typedConfig} from '../index'
import {baseConfigPath} from './baseConfigPath'

const JsonToTS = require('json-to-ts')

const file = `Config.d.ts`
const ts = ['/* tslint:disable */', '/* eslint-disable */']
  .concat(JsonToTS(typedConfig, {rootName: 'Config'}))
  .join('\n')

fs.writeFileSync(path.resolve(process.cwd(), baseConfigPath(process), file), ts)
