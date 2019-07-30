import {mergeFileConfigsForPath} from './mergeFileConfigsForPath'
import {checkIfDefaultJson} from './checkIfDefaultJson'
import {NonConfigEnv} from './configPaths'
import {getAllConfigPath} from './getAllConfigPaths'
import {ProcessArgv} from './loadCliConfigs'

export type NestedConfig = {[k: string]: Config}
/**
 * Create merged object of nested configs
 * @param process {Process}
 * @returns {NestedConfig}
 */
export const mergeAllConfigs: <T extends NonConfigEnv & ProcessArgv>(
  process: T
) => NestedConfig = process => {
  const configPaths = getAllConfigPath(process)
  const mergedConfig: NestedConfig = {}
  configPaths.forEach(p => {
    if (checkIfDefaultJson(process, p)) {
      mergedConfig[p] = mergeFileConfigsForPath(process, p)
    }
  })
  return mergedConfig
}
