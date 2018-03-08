/**
 * Created by tushar on 30/12/17.
 */

import * as path from 'path'
import {basePath} from './basePath'

const DEFAULT_FILENAME = 'default'

export const configPaths = (process: any) => {
  const _basePath = basePath(process)
  const defaultConfig = path.resolve(_basePath, `${DEFAULT_FILENAME}.json`)
  const envConfig = path.resolve(
    _basePath,
    `env/${process.env['NODE_ENV'] || DEFAULT_FILENAME}.json`
  )
  const deploymentConfig = path.resolve(
    _basePath,
    `deployment/${process.env['DEPLOYMENT'] || DEFAULT_FILENAME}.json`
  )
  const userConfig = path.resolve(
    _basePath,
    `user/${process.env['USER'] || DEFAULT_FILENAME}.json`
  )
  return {defaultConfig, envConfig, deploymentConfig, userConfig}
}
