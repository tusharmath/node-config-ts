/**
 * Created by tushar on 30/12/17.
 */
import moduleExists = require('module-exists')
import * as R from 'ramda'
import {configPaths} from './config-paths'

/**
 * Loads the configs provided in the {ConfigPaths}
 * If no config is found then an empty config is returned.
 * @param process {Process}
 * @return {defaultConfig, envConfig, deploymentConfig}
 */
export const loadFileConfigs = R.compose(
  R.mapObjIndexed(R.ifElse(moduleExists, require, R.always({}))),
  configPaths
)
