import * as R from 'ramda'

export type ConfigSources = {
  defaultConfig: any
  envConfig: any
  deploymentConfig: any
  userConfig: any
  cliConfig: any
}
/**
 * Merges the configs in the following order —
 * defaultConfig < envConfig < deploymentConfig < userConfig < cliConfig
 * @param {ConfigSources} configs
 * @return {any}
 */

export const mergeConfigs = (configs: ConfigSources) => {
  return R.reduce(R.mergeDeepRight, configs.defaultConfig, [
    configs.envConfig,
    configs.deploymentConfig,
    configs.userConfig,
    configs.cliConfig
  ])
}
