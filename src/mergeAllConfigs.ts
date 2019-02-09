/**
 * Created by tushar on 30/12/17.
 */
import R = require('ramda')
import {loadCLIConfigs} from './loadCliConfigs'
import {loadFileConfigs} from './loadFileConfigs'
import {replaceWithEnvVar} from './replaceWithEnvVar'
import {mergeFileConfigs} from './mergeFileConfigs'

/**
 * Loads all the configs from files and cli and merges them.
 */
export const mergeAllConfigs = R.converge(R.mergeDeepRight, [
  R.converge(replaceWithEnvVar, [
    R.compose(
      mergeFileConfigs,
      loadFileConfigs
    ),
    R.identity
  ]),
  loadCLIConfigs
])
