/**
 * Created by tushar on 30/12/17.
 */
import R = require('ramda')
import {loadCLIConfigs} from './load-cli-configs'
import {loadFileConfigs} from './load-file-configs'
import {mergeConfigs} from './merge-configs'

/**
 * Loads all the configs from files and cli and merges them.
 */
export const loadAllConfigs = R.compose(
  mergeConfigs,
  R.converge(R.merge, [loadFileConfigs, loadCLIConfigs])
)
