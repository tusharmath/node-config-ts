import {mergeAllConfigs} from '../src/mergeAllConfigs'
import * as assert from 'assert'
import * as path from 'path'

describe('createMergedConfig', () => {
  it('should return nested config', () => {
    const process = {
      argv: [],
      cwd: () => path.resolve(__dirname, 'stub-module'),
      env: {
        NODE_ENV: undefined,
        MAX_RETRIES: 999
      }
    }
    const actual = mergeAllConfigs(process)
    const expected = {
      config: {
        type: 'default',
        port: 9000,
        maxRetries: 999
      },
      'module-1/config': {
        type: 'default-module-1',
        maxRetries: 999,
        module1Props: 'mod1'
      }
    }
    assert.deepEqual(actual, expected)
  })
  it('should return nested config for given deployment, env and user', () => {
    const process = {
      argv: [],
      cwd: () => path.resolve(__dirname, 'stub-module'),
      env: {
        DEPLOYMENT: 'www.example.com',
        NODE_ENV: 'production',
        USER: 'root',
        MAX_RETRIES: 999
      }
    }
    const actual = mergeAllConfigs(process)
    const expected = {
      config: {
        type: 'user',
        port: 9000,
        maxRetries: 999
      },
      'module-1/config': {
        type: 'user',
        maxRetries: 999,
        module1Props: 'mod1-example'
      }
    }
    assert.deepEqual(actual, expected)
  })
  it('should return nested config with cli option', () => {
    const process = {
      argv: ['--port', '3000', '--type', 'cli-type'],
      cwd: () => path.resolve(__dirname, 'stub-module'),
      env: {
        NODE_ENV: undefined,
        MAX_RETRIES: 999
      }
    }
    const actual = mergeAllConfigs(process)
    const expected = {
      config: {
        type: 'cli-type',
        port: 3000,
        maxRetries: 999
      },
      'module-1/config': {
        type: 'cli-type',
        maxRetries: 999,
        module1Props: 'mod1',
        port: 3000
      }
    }
    assert.deepEqual(actual, expected)
  })
})
