import * as assert from 'assert'
import {checkIfBootstrap} from '../src/checkIfBootstrap'

describe('checkIfBootstrap', () => {
  it('should return true if BOOTSTRAP is true', () => {
    const process = {
      cwd: () => '',
      env: {
        BOOTSTRAP: 'true'
      }
    }
    assert.strictEqual(checkIfBootstrap(process), true)
  })
  it('should return false if BOOTSTRAP is not set', () => {
    const process = {
      cwd: () => '/',
      env: {}
    }
    assert.strictEqual(checkIfBootstrap(process), false)
  })
  it('should return false if BOOTSTRAP is set not "true"', () => {
    const process = {
      cwd: () => '',
      env: {
        BOOTSTRAP: 'false'
      }
    }
    assert.strictEqual(checkIfBootstrap(process), false)
  })
})
