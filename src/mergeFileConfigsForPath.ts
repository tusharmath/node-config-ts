/**
 * Created by tushar on 30/12/17.
 */
import R = require('ramda')
import {mergeFileConfigs} from './mergeFileConfigs'
import {configPaths, NonConfigEnv} from './configPaths'
import {readConfigFiles} from './loadFileConfigs'
import {replaceWithEnvVar} from './replaceWithEnvVar'


export const mergeFileConfigsForPath: <T extends NonConfigEnv>(process: T, path: string) => any = R.converge(replaceWithEnvVar, [ R.compose(
  mergeFileConfigs,
  readConfigFiles,
  configPaths
), R.identity])
