/**
 * Created by tushar on 30/12/17.
 */

import * as path from 'path'

const DEFAULT_FILENAME = 'default'

export const configPaths = (process: any) => {
  const configDir = process.env['NODE_CONFIG_DIR'] || ""
  const defaultConfig = path.resolve(
    process.cwd(),
    configDir,
    `config/${DEFAULT_FILENAME}.json`
  )
  const envConfig = path.resolve(  
    process.cwd(),
    configDir,
    `config/env/${process.env['NODE_ENV'] || DEFAULT_FILENAME}.json`
  )
  const deploymentConfig = path.resolve(
    process.cwd(),
    configDir,
    `config/deployment/${process.env['DEPLOYMENT'] || DEFAULT_FILENAME}.json`
  )
  const userConfig = path.resolve(
    process.cwd(),
    configDir,
    `config/user/${process.env['USER'] || DEFAULT_FILENAME}.json`
  )
  return {defaultConfig, envConfig, deploymentConfig, userConfig}
}
