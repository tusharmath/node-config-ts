/**
 * Created by tushar on 30/12/17.
 */

import * as fs from 'fs'
import * as path from 'path'
import {config} from '../index'
import {baseConfigPath} from './baseConfigPath'

const JsonToTS = require('json-to-ts')

const file = `Config.d.ts`
const ts = ['/* tslint:disable */', '/* eslint-disable */']
  .concat(JsonToTS(config, {rootName: 'Config'}))
  .join('\n')

// Ensure the file generated finishes with a newline
fs.writeFileSync(
  path.resolve(process.cwd(), baseConfigPath(process), file),
  `${ts}\n`
)
