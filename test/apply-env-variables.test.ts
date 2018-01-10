/**
 * Created by tushar on 10/01/18.
 */
import {applyEnvVariables} from '../src/apply-env-variables'
import * as assert from 'assert'

describe('applyEnvVariables', () => {
  it('should merge base config with available env variables', () => {
    const process = {
      env: {
        PORT: 5050
      }
    }
    const baseConfig = {
      a: 'a',
      b: '@@PORT'
    }
    const actual = applyEnvVariables(baseConfig, process)
    const expected = {...baseConfig, b: '5050'}
    assert.deepEqual(actual, expected)
  })

  it('should merge with deeply nested configs also', () => {
    const process = {
      env: {
        PORT: 5050
      }
    }
    const baseConfig = {
      a: {
        b: {
          c: '@@PORT'
        }
      }
    }
    const actual = applyEnvVariables(baseConfig, process)
    const expected = {a: {b: {c: '5050'}}}
    assert.deepEqual(actual, expected)
  })
})
