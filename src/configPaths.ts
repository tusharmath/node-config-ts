/**
 * Created by tushar on 30/12/17.
 */

import * as path from 'path'

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
    BOOTSTRAP?: string
  }
}

/**
 * Returns the paths for all the config files — {default, env, deployment, user} etc.
 * @param process {Process}- Used to know which file to load. For eg. if env=production, the env config will be env/production.json.
 * @param baseDir {String}-
 */
export const configPaths = <T extends NonConfigEnv>(
  process: T,
  baseDir: string
): ConfigTypes => {
  const baseConfigPath = path.join(process.cwd(), baseDir)

  const defaultConfig = path.resolve(baseConfigPath, `${DEFAULT_FILENAME}.json`)
  const envConfig = path.resolve(
    baseConfigPath,
    `env/${process.env['NODE_ENV'] || DEFAULT_FILENAME}.json`
  )
  const deploymentConfig = path.resolve(
    baseConfigPath,
    `deployment/${process.env['DEPLOYMENT'] || DEFAULT_FILENAME}.json`
  )
  const userConfig = path.resolve(
    baseConfigPath,
    `user/${process.env['USER'] || DEFAULT_FILENAME}.json`
  )
  return {defaultConfig, envConfig, deploymentConfig, userConfig}
}
