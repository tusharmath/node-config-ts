import {basePath} from '../src/basePath'
import * as assert from 'assert'

describe('basePath', () => {
  it('should return config by default', () => {
    const process = {argv: [], cwd: () => '/app/www.bravo.com/server'}
    const actual = basePath(process)
    const expected = '/app/www.bravo.com/server/config'
    assert.strictEqual(actual, expected)
  })

  it('should return config directory if passed', () => {
    const process = {
      argv: ['config-cool'],
      cwd: () => '/app/www.bravo.com/server'
    }
    const actual = basePath(process)
    const expected = '/app/www.bravo.com/server/config-cool'
    assert.strictEqual(actual, expected)
  })
})
