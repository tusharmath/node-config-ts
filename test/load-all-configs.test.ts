import * as assert from 'assert'
import * as path from 'path'
import {loadAllConfigs} from '../src/load-all-configs'

describe('load-all-configs', () => {
  it('should load configs from all the places', () => {
    const process = {
      argv: [],
      cwd: () => path.resolve(__dirname, 'stub-module'),
      env: {
        DEPLOYMENT: 'www.example.com',
        NODE_ENV: 'production',
        USER: 'root'
      }
    }
    const actual = loadAllConfigs(process)
    const expected = {
      type: 'user',
      port: 9000
    }
    assert.deepEqual(actual, expected)
  })
  it('should override with cli configs', () => {
    const process = {
      argv: ['--port', '3000', '--wonder', 'woman'],
      cwd: () => path.resolve(__dirname, 'stub-module'),
      env: {
        DEPLOYMENT: 'www.example.com',
        NODE_ENV: 'production',
        USER: 'root'
      }
    }
    const actual = loadAllConfigs(process)
    const expected = {
      type: 'user',
      port: 3000,
      wonder: 'woman'
    }
    assert.deepEqual(actual, expected)
  })
})
