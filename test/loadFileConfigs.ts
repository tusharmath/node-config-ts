/**
 * Created by tushar on 30/12/17.
 */

import * as assert from 'assert'
import * as path from 'path'
import {loadFileConfigs} from '../src/loadFileConfigs'
import * as defaultConfig from './stub-module/config/default.json'
import * as deploymentConfig from './stub-module/config/deployment/www.example.com.json'
import * as envConfig from './stub-module/config/env/production.json'
import * as userConfig from './stub-module/config/user/root.json'

describe('load-file-configs', () => {
  const basePath = path.resolve(__dirname, 'stub-module')
  describe('loadFileConfigs', () => {
    it('should load the configs that are available', () => {
      const configPaths = {
        defaultConfig: path.resolve(basePath, 'config/default.json'),
        envConfig: path.resolve(basePath, 'config/env/production.json'),
        deploymentConfig: path.resolve(
          basePath,
          'config/deployment/www.example.com.json'
        ),
        userConfig: path.resolve(basePath, 'config/user/root.json')
      }
      const actual = loadFileConfigs(configPaths)
      const expected = {
        defaultConfig,
        deploymentConfig,
        envConfig,
        userConfig
      }
      assert.deepEqual(actual, expected)
    })
    it('should load default configs when not available', () => {
      const configPaths = {
        defaultConfig: path.resolve(basePath, 'dummy'),
        envConfig: path.resolve(basePath, 'dummy'),
        deploymentConfig: path.resolve(basePath, 'dummy'),
        userConfig: path.resolve(basePath, 'dummy')
      }
      const actual = loadFileConfigs(configPaths)
      const expected = {
        defaultConfig: {},
        envConfig: {},
        deploymentConfig: {},
        userConfig: {}
      }
      assert.deepEqual(actual, expected)
    })
  })
})
