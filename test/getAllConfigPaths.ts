import {getIgnorePatterns, getIncludePattern} from '../src/getAllConfigPaths'
import * as assert from 'assert'

describe('getAllConfigPaths', () => {
  describe('getIncludePattern', () => {
    it('should extract include pattern', () => {
      const process = {
        argv: ['--pattern', 'pattern1', '--exclude', 'something']
      }
      const actual = getIncludePattern(process)
      assert.strictEqual(actual, 'pattern1')
    })

    it('should return default pattern', () => {
      const process = {
        argv: ['--exclude', 'node_modules, someFolder']
      }
      const actual = getIncludePattern(process)
      assert.strictEqual(actual, 'config')
    })
  })
  describe('getExcludePatterns', () => {
    it('should extract exclude patterns for space separated arguments', () => {
      const process = {
        argv: [
          '--pattern',
          'pattern1',
          '--ignorePatterns',
          'node_modules ignored'
        ]
      }
      const actual = getIgnorePatterns(process)
      const expected = ['node_modules', 'ignored']
      assert.deepEqual(actual, expected)
    })
    it('should extract exclude patterns for multiple declarations', () => {
      const process = {
        argv: [
          '--pattern',
          'pattern1',
          '--ignorePatterns',
          'node_modules',
          '--ignorePatterns',
          'ignored'
        ]
      }
      const actual = getIgnorePatterns(process)
      const expected = ['node_modules', 'ignored']
      assert.deepEqual(actual, expected)
    })
    it('should return empty array if arg not present', () => {
      const process = {
        argv: ['--pattern', 'pattern1']
      }
      const actual = getIgnorePatterns(process)
      const expected: Array<string> = []
      assert.deepEqual(actual, expected)
    })
  })
})
