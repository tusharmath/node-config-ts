import {NonConfigEnv} from './configPaths'
import * as glob from 'glob'
import {baseConfigPath} from './baseConfigPath'

const baseConfigPathName = baseConfigPath(process)

/**
 * Get array of paths for all config folder
 * @param process {process}
 * @returns paths {[string]}
 */
export const getAllConfigPath: <T extends NonConfigEnv>(
  process: T
) => Array<string> = process =>
  glob.sync(`**/${baseConfigPathName}`, {
    ignore: ['node_modules/**'],
    cwd: process.cwd()
  })
