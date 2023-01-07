/**
 * Created by tushar on 30/12/17.
 */

import * as assert from 'assert'
import * as path from 'path'
import * as fs from 'fs'
import * as JSON5 from 'json5'
import {loadFileConfigs} from '../src/loadFileConfigs'

describe('load-file-configs', () => {

  const [defaultConfig, deploymentConfig, envConfig, userConfig] = [
    'default',
    'deployment/www.example.com',
    'env/production',
    'user/root'
  ].map(file => `./stub-module/config/${file}.json`)
  .map(file => path.resolve(__dirname, file))
  .map(file => fs.readFileSync(file, 'utf8'))
  .map(config => JSON5.parse(config))

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
