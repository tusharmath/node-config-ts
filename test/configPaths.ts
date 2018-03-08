/**
 * Created by tushar on 30/12/17.
 */
import * as assert from 'assert'
import {configPaths} from '../src/configPaths'

describe('config-paths', () => {
  describe('default', () => {
    it('should return config path', () => {
      const process = {
        argv: [],
        env: {},
        cwd: () => '/app/www.bravo.com/server'
      }
      const actual = configPaths(process).defaultConfig
      const expected = '/app/www.bravo.com/server/config/default.json'

      assert.deepEqual(actual, expected)
    })
  })

  describe('NODE_ENV', () => {
    it('should return actual config path', () => {
      const process = {
        argv: [],
        env: {NODE_ENV: 'production'},
        cwd: () => '/app/www.bravo.com/server'
      }
      const actual = configPaths(process).envConfig
      const expected = '/app/www.bravo.com/server/config/env/production.json'

      assert.deepEqual(actual, expected)
    })
    it('should return default config path', () => {
      const process = {
        argv: [],
        env: {},
        cwd: () => '/app/www.bravo.com/server'
      }
      const actual = configPaths(process).envConfig
      const expected = '/app/www.bravo.com/server/config/env/default.json'

      assert.deepEqual(actual, expected)
    })
  })

  describe('DEPLOYMENT', () => {
    it('should return actual config path', () => {
      const process = {
        argv: [],
        env: {DEPLOYMENT: 'www.example.com'},
        cwd: () => '/app/www.bravo.com/server'
      }
      const actual = configPaths(process).deploymentConfig
      const expected =
        '/app/www.bravo.com/server/config/deployment/www.example.com.json'

      assert.deepEqual(actual, expected)
    })
    it('should return default config path', () => {
      const process = {
        argv: [],
        env: {},
        cwd: () => '/app/www.bravo.com/server'
      }
      const actual = configPaths(process).deploymentConfig
      const expected =
        '/app/www.bravo.com/server/config/deployment/default.json'

      assert.deepEqual(actual, expected)
    })
  })

  describe('USER', () => {
    it('should return actual config path', () => {
      const process = {
        argv: [],
        env: {USER: 'root'},
        cwd: () => '/app/www.bravo.com/server'
      }
      const actual = configPaths(process).userConfig
      const expected = '/app/www.bravo.com/server/config/user/root.json'

      assert.deepEqual(actual, expected)
    })
    it('should return default config path', () => {
      const process = {
        argv: [],
        env: {},
        cwd: () => '/app/www.bravo.com/server'
      }
      const actual = configPaths(process).userConfig
      const expected = '/app/www.bravo.com/server/config/user/default.json'

      assert.deepEqual(actual, expected)
    })
  })

  describe('custom directory', () => {
    it('should load files from custom directory if available', () => {
      const process = {
        argv: ['config-random'],
        env: {},
        cwd: () => '/app/www.bravo.com/server'
      }
      const actual = configPaths(process).defaultConfig
      const expected = '/app/www.bravo.com/server/config-random/default.json'

      assert.deepEqual(actual, expected)
    })
  })
})
