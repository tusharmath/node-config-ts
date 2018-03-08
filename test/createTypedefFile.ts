import {createTypeDefFile} from '../src/createTypedefFile'
import * as assert from 'assert'
import * as path from 'path'

describe('createTypedefFile', () => {
  const stubPath = path.resolve(__dirname, 'stub-module')
  it('should create typedefs in the config dir', () => {
    const expectedData = `
/* tslint:disable */
interface Config {
  type: string;
  port: number;
  maxRetries: number;
}`
    const process = {
      argv: [],
      cwd: () => stubPath,
      env: {
        MAX_RETRIES: 45
      }
    }
    const actual = createTypeDefFile(process)
    const expectedFilePath = `${stubPath}/config/Config.d.ts`
    assert.strictEqual(actual.filePath, expectedFilePath)
    assert.strictEqual(actual.data, expectedData)
  })

  it('should create typedefs in the custom-config dir', () => {
    const expectedData = `
/* tslint:disable */
interface Config {
  hello: string;
}`
    const process = {
      argv: ['config-random'],
      cwd: () => stubPath,
      env: {
        MAX_RETRIES: 45
      }
    }
    const actual = createTypeDefFile(process)
    const expectedFilePath = `${stubPath}/config-random/Config.d.ts`
    assert.strictEqual(actual.filePath, expectedFilePath)
    assert.strictEqual(actual.data, expectedData)
  })
})
