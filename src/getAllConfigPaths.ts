import {NonConfigEnv} from './configPaths'
import * as glob from 'glob'
import minimist = require('minimist')
import {ProcessArgv} from './loadCliConfigs'

const DEFAULT_BASE_DIR = 'config'

export const getIncludePattern: <T extends ProcessArgv>(
  process: T
) => string = process => minimist(process.argv)['pattern'] || DEFAULT_BASE_DIR

export const getIgnorePatterns: <T extends ProcessArgv>(
  process: T
) => Array<string> = process => {
  const ignoreArgs = minimist(process.argv)['ignorePatterns'] || []
  return Array.isArray(ignoreArgs)
    ? ignoreArgs
    : ignoreArgs.split(' ').map((x: string) => x.trim())
}

/**
 * Get array of paths for all config folder
 * @param process {process}
 * @returns paths {[string]}
 */
export const getAllConfigPath: <T extends NonConfigEnv & ProcessArgv>(
  process: T
) => Array<string> = process => {
  const includePattern = getIncludePattern(process)
  return glob.sync(`**/${includePattern}`, {
    ignore: getIgnorePatterns(process).map((x: string) => x + '/**'),
    cwd: process.cwd()
  })
}
