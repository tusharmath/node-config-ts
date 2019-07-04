/**
 * Created by tushar on 30/12/17.
 */
import R = require('ramda')
import {loadCLIConfigs} from './loadCliConfigs'
import {loadFileConfigs} from './loadFileConfigs'
import {replaceWithEnvVar} from './replaceWithEnvVar'
import {mergeFileConfigs} from './mergeFileConfigs'
import {NonConfigEnv} from './configPaths'

export const getFileConfigsForPath: <T extends NonConfigEnv>(process: T, path: string) => any = R.compose(
  mergeFileConfigs,
  loadFileConfigs
)
/**
 * Loads all the configs from files and cli and merges them.
 */
export const mergeAllConfigs = R.converge(R.mergeDeepRight, [
  R.converge(replaceWithEnvVar, [
    getFileConfigsForPath,
    R.identity
  ]),
  loadCLIConfigs
])
