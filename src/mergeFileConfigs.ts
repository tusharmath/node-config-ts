import {mergeDeepRight} from './mergeDeepRight';

/**
 * Merges the configs in the following order —
 * defaultConfig < envConfig < deploymentConfig < userConfig < cliConfig
 * @param {ConfigSources} configs
 * @return {any}
 */
export const mergeFileConfigs = (configs: {[key: string]: any}) => {
  const configsOrder = [
    configs.defaultConfig,
    configs.envConfig,
    configs.deploymentConfig,
    configs.userConfig,
  ];

  return configsOrder.reduce(mergeDeepRight, {})
}
