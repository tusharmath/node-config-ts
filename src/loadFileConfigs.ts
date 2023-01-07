///<reference path="../global.d.ts"/>

/**
 * Created by tushar on 30/12/17.
 */
import * as fs from 'fs'
import * as R from 'ramda'
import * as JSON5 from 'json5'
import {configPaths, ConfigTypes, NonConfigEnv} from './configPaths'

const readAndParse = R.pipe((file: string) => fs.readFileSync(file, 'utf8'), JSON5.parse)

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
    R.ifElse(fs.existsSync, readAndParse, R.always({}))
  )
  return itar(configPaths(process))
}
