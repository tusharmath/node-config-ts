import * as glob from 'glob'
import {baseConfigPath} from './baseConfigPath'
import {mergeFileConfigsForPath} from './mergeFileConfigsForPath'
import {checkIfDefaultJson} from './checkIfDefaultJson'
import {NonConfigEnv} from './configPaths'

const baseConfigPathName = baseConfigPath(process)

/**
 * Get paths of config folder
 */
export const getAllConfigPath: <T extends NonConfigEnv>(
  process: T
) => Array<string> = process =>
  glob.sync(`**/${baseConfigPathName}`, {
    ignore: ['node_modules/**'],
    cwd: process.cwd()
  })

/**
 * Create merged object of nested configs
 */
export const createMergedConfig: <T extends NonConfigEnv>(
  process: T
) => {[k: string]: Config} = process => {
  const configPaths = getAllConfigPath(process)
  const mergedConfig: {[k: string]: Config} = {}
  configPaths.forEach(p => {
    if (checkIfDefaultJson(process, p)) {
      mergedConfig[p] = mergeFileConfigsForPath(process, p)
    }
  })
  return mergedConfig
}
