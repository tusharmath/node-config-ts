/**
 * Created by tushar on 30/12/17.
 */
import R = require('ramda')
import {mergeFileConfigs} from './mergeFileConfigs'
import {configPaths, NonConfigEnv} from './configPaths'
import {loadFileConfigs} from './loadFileConfigs'
import {replaceWithEnvVar} from './replaceWithEnvVar'
import {loadCLIConfigs} from './loadCliConfigs'
import {checkIfBootstrap} from './checkIfBootstrap'

export const mergeFileConfigsForPath: <T extends NonConfigEnv>(
  process: T,
  path: string
) => any = R.converge(R.mergeDeepRight, [
  R.converge(replaceWithEnvVar, [
    R.compose(
      mergeFileConfigs,
      loadFileConfigs,
      configPaths
    ),
    R.identity
  ]),
  R.ifElse(checkIfBootstrap, R.always({}), loadCLIConfigs)
])
