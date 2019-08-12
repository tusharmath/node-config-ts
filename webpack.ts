import {config} from './index'
import {DefinePlugin, Configuration} from 'webpack'
import * as R from 'ramda'

const setConfigResolver: (obj: Configuration) => Configuration = R.assocPath(
  ['resolve', 'alias', 'node-config-ts'],
  'node-config-ts/iso'
)
const setGlobalConfigPlugin = R.over(
  R.lensProp('plugins'),
  R.append(
    new DefinePlugin({
      __CONFIG__: JSON.stringify(config)
    })
  )
)

export const NodeConfigTSPlugin: {
  (config: Configuration): Configuration
} = R.compose(
  setConfigResolver,
  setGlobalConfigPlugin
)
