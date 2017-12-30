/**
 * Created by tushar on 30/12/17.
 */

import * as path from 'path'

const DEFAULT_FILENAME = 'default'

export const configPaths = (process: any) => {
  const defaultConfig = path.resolve(
    process.cwd(),
    `config/${DEFAULT_FILENAME}.json`
  )
  const envConfig = path.resolve(
    process.cwd(),
    `config/env/${process.env['NODE_ENV'] || DEFAULT_FILENAME}.json`
  )
  const deploymentConfig = path.resolve(
    process.cwd(),
    `config/deployment/${process.env['DEPLOYMENT'] || DEFAULT_FILENAME}.json`
  )
  const userConfig = path.resolve(
    process.cwd(),
    `config/user/${process.env['USER'] || DEFAULT_FILENAME}.json`
  )
  return {defaultConfig, envConfig, deploymentConfig, userConfig}
}
