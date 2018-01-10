/**
 * Created by tushar on 30/12/17.
 */
import R = require('ramda')
import {loadCLIConfigs} from './loadCliConfigs'
import {loadFileConfigs} from './loadFileConfigs'
import {applyEnvVariables} from './applyEnvVariables'

/**
 * Loads all the configs from files and cli and merges them.
 */
export const loadAllConfigs = (process: any) => {
  const fileConfigs = loadFileConfigs(process)
  const fileConfig = R.reduce(R.mergeDeepRight, fileConfigs.defaultConfig, [
    fileConfigs.envConfig,
    fileConfigs.deploymentConfig,
    fileConfigs.userConfig
  ])

  const cliConfig = loadCLIConfigs(process).cliConfig
  return R.mergeDeepRight(applyEnvVariables(fileConfig, process), cliConfig)
}
