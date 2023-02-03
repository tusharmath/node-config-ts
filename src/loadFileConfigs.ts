///<reference path="../global.d.ts"/>

/**
 * Created by tushar on 30/12/17.
 */
import * as fs from 'fs'
import * as JSON5 from 'json5'
import {configPaths, ConfigTypes, NonConfigEnv} from './configPaths'

const readAndParse = (file: string) => JSON5.parse(fs.readFileSync(file, 'utf8'))

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
  const paths = configPaths(process)

  const configs: Record<string, any> = {}

  Object.entries(paths).forEach(([key, path]) => {
    configs[key] = {};
    if (fs.existsSync(path)) {
      configs[key] = readAndParse(path)
    }
  })

  return configs as Configurations<ConfigTypes>
}
