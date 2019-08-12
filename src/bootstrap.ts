/**
 * Created by tushar on 30/12/17.
 */

import {generateJsFiles} from './generateJsFiles'
import {generateTypeDefFiles} from './generateTypeDefFiles'

process.env['BOOTSTRAP'] = 'true'

generateTypeDefFiles()
generateJsFiles()
