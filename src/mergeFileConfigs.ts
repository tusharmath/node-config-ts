const mergeDeepRight = (a: any, b: any): any => {
  if (a === undefined) return b
  if (b === undefined) return a
  if (typeof a === 'object' && typeof b === 'object') {
    return Object.keys({...a, ...b}).reduce((acc, key) => {
      return {...acc, [key]: mergeDeepRight(a[key], b[key])}
    }, {})
  }
  return b
}

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
