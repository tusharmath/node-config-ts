/**
 * Created by tushar on 10/01/18.
 */
import {replaceWithEnvVar} from '../src/replaceWithEnvVar'
import * as assert from 'assert'
import * as dotenv from 'dotenv'

describe('replaceWithEnvVar', () => {
  it('should take variables from dotenv file', () => {
    const parsed = dotenv.config({path: 'test/.env'}).parsed
    assert(parsed != null, 'parsed is null or undefined')
    const process = {
      env: parsed as dotenv.DotenvParseOutput
    }

    const baseConfig = {
      a: 'a',
      b: '@@SECRET'
    }
    const actual = replaceWithEnvVar(baseConfig, process)
    const expected = {...baseConfig, b: 'TEST_SECRET'}
    assert.deepEqual(actual, expected)
  })

  it('should merge base config with available env variables', () => {
    const process = {
      env: {
        PORT: '5050'
      }
    }
    const baseConfig = {
      a: 'a',
      b: '@@PORT'
    }
    const actual = replaceWithEnvVar(baseConfig, process)
    const expected = {...baseConfig, b: '5050'}
    assert.deepEqual(actual, expected)
  })

  it('should merge with deeply nested configs also', () => {
    const process = {
      env: {
        PORT: '5050'
      }
    }
    const baseConfig = {
      a: {
        b: {
          c: '@@PORT'
        }
      }
    }
    const actual = replaceWithEnvVar(baseConfig, process)
    const expected = {a: {b: {c: '5050'}}}
    assert.deepEqual(actual, expected)
  })
})
