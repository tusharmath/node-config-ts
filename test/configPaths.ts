/**
 * Created by tushar on 30/12/17.
 */
import * as assert from 'assert'
import {configPaths} from '../src/configPaths'

describe('config-paths', () => {
  const subPath = 'test/stub-module/config'
  describe('default', () => {
    it('should return default config path', () => {
      const process = {
        env: {},
        cwd: () => '/app/www.bravo.com/server'
      }
      const actual = configPaths(process, subPath).defaultConfig
      const expected =
        '/app/www.bravo.com/server/test/stub-module/config/default.json'
      assert.deepEqual(actual, expected)
    })
  })

  describe('ENV:NODE_ENV', () => {
    it('should return actual config path', () => {
      const process = {
        env: {NODE_ENV: 'production'},
        cwd: () => '/app/www.bravo.com/server'
      }
      const actual = configPaths(process, subPath).envConfig
      const expected =
        '/app/www.bravo.com/server/test/stub-module/config/env/production.json'

      assert.deepEqual(actual, expected)
    })
    it('should return default config path when NODE_ENV is not specified', () => {
      const process = {
        env: {},
        cwd: () => '/app/www.bravo.com/server'
      }
      const actual = configPaths(process, subPath).envConfig
      const expected =
        '/app/www.bravo.com/server/test/stub-module/config/env/default.json'

      assert.deepEqual(actual, expected)
    })
  })

  describe('DEPLOYMENT', () => {
    it('should return actual config path', () => {
      const process = {
        env: {DEPLOYMENT: 'www.example.com'},
        cwd: () => '/app/www.bravo.com/server'
      }
      const actual = configPaths(process, subPath).deploymentConfig
      const expected =
        '/app/www.bravo.com/server/test/stub-module/config/deployment/www.example.com.json'

      assert.deepEqual(actual, expected)
    })
    it('should return default config path', () => {
      const process = {
        env: {},
        cwd: () => '/app/www.bravo.com/server'
      }
      const actual = configPaths(process, subPath).deploymentConfig
      const expected =
        '/app/www.bravo.com/server/test/stub-module/config/deployment/default.json'

      assert.deepEqual(actual, expected)
    })
  })

  describe('USER', () => {
    it('should return actual config path', () => {
      const process = {
        env: {USER: 'root'},
        cwd: () => '/app/www.bravo.com/server'
      }
      const actual = configPaths(process, subPath).userConfig
      const expected =
        '/app/www.bravo.com/server/test/stub-module/config/user/root.json'

      assert.deepEqual(actual, expected)
    })

    it('should return default config path for given folder', () => {
      const process = {
        env: {},
        cwd: () => '/app/www.bravo.com/server'
      }
      const actual = configPaths(process, subPath).deploymentConfig
      const expected =
        '/app/www.bravo.com/server/test/stub-module/config/deployment/default.json'

      assert.deepEqual(actual, expected)
    })
  })
})
