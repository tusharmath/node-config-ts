/**
 * Created by jdean on 08/22/2019
 */
import * as path from 'path'
import {mergeAllConfigsPreserveOptional} from '../src/mergeAllConfigsPreserveOptional'
import * as assert from 'assert'

describe('replaceWithEnvVar', () => {
  it('should replace env variables values with new keys', () => {
    const baseConfig = {
      argv: [],
      cwd: () => path.resolve(__dirname, 'stub-module'),
      env: {}
    }
    const actual = mergeAllConfigsPreserveOptional(baseConfig)
    const expected = {
      type: 'default',
      port: 9000,
      'maxRetries--?': '@@MAX_RETRIES'
    }
    assert.deepEqual(actual, expected)
  })
})
