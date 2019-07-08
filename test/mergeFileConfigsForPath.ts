import * as path from 'path'
import * as assert from 'assert'
import {mergeFileConfigsForPath} from '../src/mergeFileConfigsForPath'

describe('mergeConfigsForPath', () => {
  it('should merge config for given path', () => {
    const subPath = 'module-1/config'
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
      port: 9000,
      maxRetries: 999,
      module1Props: 'mod1'
    }
    assert.deepEqual(actual, expected)
  })
})