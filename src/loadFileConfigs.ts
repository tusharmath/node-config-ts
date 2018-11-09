///<reference path="../global.d.ts"/>

/**
 * Created by tushar on 30/12/17.
 */
import moduleExists = require('module-exists')
import * as R from 'ramda'
import {configPaths, NonConfigEnv, ConfigTypes} from './configPaths'

export type Configurations<T> = {[key in keyof T]: any}

/**
 * Loads the configs provided in the {ConfigPaths}
 * If no config is found then an empty config is returned.
 * @param process {Process}
 * @return {defaultConfig, envConfig, deploymentConfig, userConfig}
 */
export const loadFileConfigs = <T extends NonConfigEnv>(
  process: T
): Configurations<ConfigTypes> => {
  const itar: any = R.mapObjIndexed(
    R.ifElse(moduleExists, require, R.always({}))
  )
  return itar(configPaths(process))
}
