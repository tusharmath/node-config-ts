/**
 * Created by tushar on 30/12/17.
 */

import * as fs from 'fs'
import * as path from 'path'
import {config} from '../index'
import {baseConfigPath} from './baseConfigPath'
import {createTypedefCode} from './createTypedefCode'

// const JsonToTS = require('json-to-ts')

const file = `Config.d.ts`
const ts = createTypedefCode(config)

fs.writeFileSync(path.resolve(process.cwd(), baseConfigPath(process), file), ts)
