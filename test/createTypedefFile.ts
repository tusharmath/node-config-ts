import {createTypeDefFile} from '../src/createTypedefFile'
import * as assert from 'assert'

const data = `/* tslint:disable */\ninterface Config {\n  require: string;\n  ui: string;\n  reporter: string;\n  grep: string;\n}`

describe('createTypedefFile', () => {
  it('should create typedefs in the config dir', () => {
    const process = {
      argv: [],
      cwd: () => '/www/apphub.com'
    }
    const actual = createTypeDefFile(process)
    const expected = {data, filePath: '/www/apphub.com/config/Config.d.ts'}
    assert.deepEqual(actual, expected)
  })

  it('should create typedefs in the custom-config dir', () => {
    const process = {
      argv: ['custom-config'],
      cwd: () => '/www/apphub.com'
    }
    const actual = createTypeDefFile(process)
    const expected = {data, filePath: '/www/apphub.com/custom-config/Config.d.ts'}
    assert.deepEqual(actual, expected)
  })
})