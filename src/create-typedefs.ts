/**
 * Created by tushar on 30/12/17.
 */

import * as fs from 'fs'
import * as path from 'path'
import {config} from '../index'
const JsonToTS = require('json-to-ts')

const ts = JsonToTS(config, {rootName: 'Config'}).join('\n')
fs.writeFileSync(path.resolve(process.cwd(), 'config/Config.d.ts'), ts)
