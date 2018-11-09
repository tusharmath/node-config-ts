/**
 * Created by tushar on 09/11/18.
 */

import * as assert from 'assert'
import {baseConfigPath} from '../src/baseConfigPath'

describe('baseConfigPath', () => {
  it('should read from env variable', () => {
    const process = {
      env: {NODE_ENV: 'production', NODE_CONFIG_TS_DIR: './main/config'}
    }
    const actual = baseConfigPath(process)
    const expected = './main/config'
    assert.strictEqual(actual, expected)
  })

  it('should read default path', () => {
    const process = {
      env: {NODE_ENV: 'production'}
    }
    const actual = baseConfigPath(process)
    const expected = 'config'
    assert.strictEqual(actual, expected)
  })
})
