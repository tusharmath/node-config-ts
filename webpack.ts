import {config} from './index'
import {DefinePlugin, Configuration} from 'webpack'
import * as R from 'ramda'

const setConfigResolver = R.assocPath<string, Configuration>(
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

export const NodeConfigTSPlugin = R.compose<
  Configuration,
  Configuration,
  Configuration
>(
  setConfigResolver,
  setGlobalConfigPlugin
)
