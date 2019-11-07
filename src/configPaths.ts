/**
 * Created by tushar on 30/12/17.
 */

import * as path from 'path'
import {baseConfigPath} from './baseConfigPath'

const DEFAULT_FILENAME = 'default'

export type ConfigTypes = {
  defaultConfig: string
  envConfig: string
  deploymentConfig: string
  userConfig: string
}

export type NonConfigEnv = {
  cwd(): string
  env: {
    NODE_ENV?: string
    DEPLOYMENT?: string
    USER?: string
    USERNAME?: string
    NODE_CONFIG_TS_DIR?: string
  }
}

export const configPaths = <T extends NonConfigEnv>(
  process: T
): ConfigTypes => {
  const baseDIR = baseConfigPath(process)
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
    `${baseDIR}/user/${process.env['USER'] ||
      process.env['USERNAME'] ||
      DEFAULT_FILENAME}.json`
  )
  return {defaultConfig, envConfig, deploymentConfig, userConfig}
}
