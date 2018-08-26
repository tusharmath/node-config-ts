import { config } from './index'
import { DefinePlugin } from 'webpack'

export const NodeConfigTSPlugin = () => new DefinePlugin({
  __CONFIG__: JSON.stringify(config)
})
