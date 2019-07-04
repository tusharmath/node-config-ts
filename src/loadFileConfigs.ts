///<reference path="../global.d.ts"/>

/**
 * Created by tushar on 30/12/17.
 */
import * as fs from 'fs'
import * as R from 'ramda'
import {configPaths, ConfigTypes, NonConfigEnv} from './configPaths'

export type Configurations<T> = {[key in keyof T]: any}

/**
 * Loads the configs provided in the {ConfigPaths}
 * If no config is found then an empty config is returned.
 * @param process {Process}
 * @param path {string}
 * @return {defaultConfig, envConfig, deploymentConfig, userConfig}
 */
export const loadFileConfigs = <T extends NonConfigEnv>(
  process: T,
  path: string
): Configurations<ConfigTypes> => {
  const itar: any = R.mapObjIndexed(
    R.ifElse(fs.existsSync, require, R.always({}))
  )
  return itar(configPaths(process, path))
}
