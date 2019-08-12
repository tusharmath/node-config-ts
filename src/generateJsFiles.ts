import {config} from '../index'
import * as fs from 'fs'
import * as path from 'path'

const jsFile = 'index.js'

export const defaultJsFileContent =
  "import {config as mainConfig} from 'node-config-ts' \n export const config ="

export const getJsFileBuffer = (p: string) =>
  defaultJsFileContent.concat(` mainConfig['${p}']`)

/**
 * Generate JS Files in each config folder
 */
export const generateJsFiles = () => {
  Object.keys(config).forEach(p => {
    fs.writeFileSync(path.resolve(process.cwd(), p, jsFile), getJsFileBuffer(p))
  })
}
