/**
 * Created by tushar on 30/12/17.
 */

import * as path from 'path'

const DEFAULT_FILENAME = 'default'
const DEFAULT_BASE_DIR = 'config'

type ConfigType = {
  defaultConfig: string
  envConfig: string
  deploymentConfig: string
  userConfig: string
}

export const configPaths = (process: any): ConfigType => {
  const baseDIR = process.env['NODE_CONFIG_DIR'] || DEFAULT_BASE_DIR
  const defaultConfig = path.resolve(
    process.cwd(),
    `${baseDIR}/${DEFAULT_FILENAME}.json`
  )
  const envConfig = path.resolve(
    process.cwd(),
    `${baseDIR}/env/${process.env['NODE_ENV'] || DEFAULT_FILENAME}.json`
  )
  const deploymentConfig = path.resolve(
    process.cwd(),
    `${baseDIR}/deployment/${process.env['DEPLOYMENT'] ||
      DEFAULT_FILENAME}.json`
  )
  const userConfig = path.resolve(
    process.cwd(),
    `${baseDIR}/user/${process.env['USER'] || DEFAULT_FILENAME}.json`
  )
  return {defaultConfig, envConfig, deploymentConfig, userConfig}
}
