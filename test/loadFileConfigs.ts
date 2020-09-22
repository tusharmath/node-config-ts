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
  it('should load the configs that are available', () => {
    const process = {
      cwd: () => path.resolve(__dirname, 'stub-module'),
      env: {
        DEPLOYMENT: 'www.example.com',
        NODE_ENV: 'production',
        USER: 'root'
      }
    }
    const actual = loadFileConfigs(process)
    const expected = {
      defaultConfig,
      deploymentConfig,
      envConfig,
      userConfig
    }
    assert.deepEqual(actual, expected)
  })

  it('should load default configs when not available', () => {
    const process = {
      cwd: () => path.resolve(__dirname, 'stub-module'),
      env: {
        DEPLOYMENT: 'www.example.com',
        NODE_ENV: 'development',
        USER: 'root'
      }
    }
    const actual = loadFileConfigs(process)
    const expected = {
      defaultConfig,
      deploymentConfig,
      envConfig: {},
      userConfig
    }
    assert.deepEqual(actual, expected)
  })

  describe('alternative env varialble', () => {
    it('should load the configs that are available', () => {
      const process = {
        cwd: () => path.resolve(__dirname, 'stub-module'),
        env: {
          DEPLOYMENT: 'www.example.com',
          NODE_CONFIG_TS_ENV: 'production',
          USER: 'root'
        }
      }
      const actual = loadFileConfigs(process)
      const expected = {
        defaultConfig,
        deploymentConfig,
        envConfig,
        userConfig
      }
      assert.deepEqual(actual, expected)
    })

    it('should load default configs when not available', () => {
      const process = {
        cwd: () => path.resolve(__dirname, 'stub-module'),
        env: {
          DEPLOYMENT: 'www.example.com',
          NODE_CONFIG_TS_ENV: 'development',
          USER: 'root'
        }
      }
      const actual = loadFileConfigs(process)
      const expected = {
        defaultConfig,
        deploymentConfig,
        envConfig: {},
        userConfig
      }
      assert.deepEqual(actual, expected)
    })
  })
})
