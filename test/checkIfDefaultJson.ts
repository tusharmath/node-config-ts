import * as path from 'path'
import {checkIfDefaultJson} from '../src/checkIfDefaultJson'
import * as assert from 'assert'

describe('checkIfDefaultJson', () => {
  it('should return true if folder has default.json', () => {
    const process = {
      cwd: () => path.resolve(__dirname, 'stub-module'),
      env: {}
    }
    const actual = checkIfDefaultJson(process, 'config')
    assert.strictEqual(actual, true)
  })
  it('should return false if folder does not exist', () => {
    const process = {
      cwd: () => path.resolve(__dirname, 'stub-module'),
      env: {}
    }
    const actual = checkIfDefaultJson(process, 'some-name')
    assert.strictEqual(actual, false)
  })
  it('should return false if folder does not have default.json', () => {
    const process = {
      cwd: () => path.resolve(__dirname, 'stub-module'),
      env: {}
    }
    const actual = checkIfDefaultJson(process, 'module-2/config')
    assert.strictEqual(actual, false)
  })
})
