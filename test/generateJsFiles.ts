import {defaultJsFileContent, getJsFileBuffer} from '../src/generateJsFiles'
import * as assert from 'assert'

describe('generateJSFiles', () => {
  describe('getJsFileBuffer', () => {
    it('should return js file buffer', () => {
      const actual = getJsFileBuffer('some_path')
      const expected = `${defaultJsFileContent} mainConfig['some_path']`
      assert.strictEqual(actual, expected)
    })
  })
})
