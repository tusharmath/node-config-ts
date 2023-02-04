import {config} from './index'
import {DefinePlugin, Configuration} from 'webpack'

const setConfigResolver = (webpackConfig: Configuration) => {
  webpackConfig.resolve = webpackConfig.resolve || {}
  webpackConfig.resolve.alias = webpackConfig.resolve.alias || {}

  const alias = webpackConfig.resolve.alias as {[key: string]: string};
  alias['node-config-ts'] = 'node-config-ts/iso'

  return webpackConfig
}

const setGlobalConfigPlugin = (webpackConfig: Configuration) => {
  webpackConfig.plugins = webpackConfig.plugins || []
  webpackConfig.plugins.push(
    new DefinePlugin({
      __CONFIG__: JSON.stringify(config),
    })
  )

  return webpackConfig
}

export const NodeConfigTSPlugin = (config: Configuration) =>
  setGlobalConfigPlugin(setConfigResolver(config))
