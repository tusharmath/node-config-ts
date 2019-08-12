import * as path from 'path'
import * as assert from 'assert'
import {mergeFileConfigsForPath} from '../src/mergeFileConfigsForPath'

describe('mergeConfigsForPath', () => {
  const subPath = 'module-1/config'
  it('should merge config for given path', () => {
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
    const actual = mergeFileConfigsForPath(process, subPath)
    const expected = {
      type: 'user',
      maxRetries: 999,
      module1Props: 'mod1-example'
    }
    assert.deepEqual(actual, expected)
  })
  it('should add configs from cli', () => {
    const process = {
      argv: ['--port', '3000', '--type', 'cli-type', '--propA', 'xyz'],
      cwd: () => path.resolve(__dirname, 'stub-module'),
      env: {
        DEPLOYMENT: 'www.example.com',
        NODE_ENV: 'production',
        USER: 'root',
        MAX_RETRIES: 999
      }
    }
    const actual = mergeFileConfigsForPath(process, subPath)
    const expected = {
      type: 'cli-type',
      maxRetries: 999,
      module1Props: 'mod1-example',
      port: '3000',
      propA: 'xyz'
    }
    assert.deepEqual(actual, expected)
  })
  it('should add configs from cli if BOOTSTRAP is true', () => {
    const process = {
      argv: ['--port', '3000', '--type', 'cli-type', '--propA', 'xyz'],
      cwd: () => path.resolve(__dirname, 'stub-module'),
      env: {
        DEPLOYMENT: 'www.example.com',
        NODE_ENV: 'production',
        USER: 'root',
        MAX_RETRIES: 999,
        BOOTSTRAP: 'true'
      }
    }
    const actual = mergeFileConfigsForPath(process, subPath)
    const expected = {
      type: 'user',
      maxRetries: 999,
      module1Props: 'mod1-example'
    }
    assert.deepEqual(actual, expected)
  })
})
