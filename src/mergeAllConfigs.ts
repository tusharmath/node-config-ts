/**
 * Created by tushar on 30/12/17.
 */
import {loadCLIConfigs} from './loadCliConfigs'
import {loadFileConfigs} from './loadFileConfigs'
import {replaceWithEnvVar} from './replaceWithEnvVar'
import {mergeFileConfigs} from './mergeFileConfigs'
import {mergeDeepRight} from './mergeDeepRight';

interface Process {
  argv: string[],
  cwd: () => string,
  env: NodeJS.ProcessEnv
}

/**
 * Loads all the configs from files and cli and merges them.
 */
export const mergeAllConfigs = (process: Process) => {
  const fileConfigs = mergeFileConfigs(loadFileConfigs(process))
  const mergedWithEnvVar = replaceWithEnvVar(fileConfigs, process)
  const cliConfigs = loadCLIConfigs(process)

  return mergeDeepRight(mergedWithEnvVar, cliConfigs)
}
