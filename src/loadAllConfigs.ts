/**
 * Created by tushar on 30/12/17.
 */
import R = require('ramda')
import {loadCLIConfigs} from './loadCliConfigs'
import {loadFileConfigs} from './loadFileConfigs'
import {mergeConfigs} from './mergeConfigs'

/**
 * Loads all the configs from files and cli and merges them.
 */
export const loadAllConfigs = R.compose(
  mergeConfigs,
  R.converge(R.merge, [loadFileConfigs, loadCLIConfigs])
)
