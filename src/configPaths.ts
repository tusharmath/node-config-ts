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
    NODE_CONFIG_TS_DIR?: string
  }
}

/**
 * Returns the paths for all the config files — {default, env, deployment, user} etc.
 * @param process - Used to know which file to load. For eg. if env=production, the env config will be env/production.json.
 * @param baseDir - // TODO
 */
export const configPaths = <T extends NonConfigEnv>(
  process: T,
  baseDir?: string
): ConfigTypes => {
  const baseDIR = baseConfigPath(process)
  const subDir = path.parse(baseDir || '').dir
  const defaultConfig = path.resolve(
    process.cwd(),
    subDir,
    `${baseDIR}/${DEFAULT_FILENAME}.json`
  )
  const envConfig = path.resolve(
    process.cwd(),
    subDir,
    `${baseDIR}/env/${process.env['NODE_ENV'] || DEFAULT_FILENAME}.json`
  )
  const deploymentConfig = path.resolve(
    process.cwd(),
    subDir,
    `${baseDIR}/deployment/${process.env['DEPLOYMENT'] ||
      DEFAULT_FILENAME}.json`
  )
  const userConfig = path.resolve(
    process.cwd(),
    subDir,
    `${baseDIR}/user/${process.env['USER'] || DEFAULT_FILENAME}.json`
  )
  return {defaultConfig, envConfig, deploymentConfig, userConfig}
}
