import {mergeFileConfigsForPath} from './mergeFileConfigsForPath'
import {checkIfDefaultJson} from './checkIfDefaultJson'
import {NonConfigEnv} from './configPaths'
import {getAllConfigPath} from './getAllConfigPaths'

/**
 * Create merged object of nested configs
 */
export const mergeAllConfigs: <T extends NonConfigEnv>(
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
