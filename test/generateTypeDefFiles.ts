import {getTsFileBuffer} from '../src/generateTypeDefFiles'
import * as assert from 'assert'

describe('generateTypeDefFiles', () => {
  describe('getTsFileBuffer', () => {
    it('should return ts file buffer with config type', () => {
      const config = {
        str: 'string',
        num: 9
      }
      const actual = getTsFileBuffer(config)
      const expected =
        '/* tslint:disable */\n/* eslint-disable */\ninterface Config {\n  str: string;\n  num: number;\n}\nexport declare const config: Config'
      assert.deepEqual(actual, expected)
    })
    it('should return ts file buffer with empty interface', () => {
      const config = {}
      const actual = getTsFileBuffer(config)
      const expected =
        '/* tslint:disable */\n/* eslint-disable */\ninterface Config {\n}\nexport declare const config: Config'
      assert.deepEqual(actual, expected)
    })
  })
})
