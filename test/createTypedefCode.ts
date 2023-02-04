import * as assert from 'assert'
import * as path from 'path'
import * as os from 'os'
import * as ts from 'typescript'
import {promises as fs} from 'fs'
import {createTypedefCode} from '../src/createTypedefCode'
import {mergeAllConfigs} from '../src/mergeAllConfigs'

const snapshotDir = path.resolve(__dirname, '__snapshots__')

describe('createTypedefCode(config)', () => {
  let actual: string
  let config: any
  // This doesn't seem to work, needs investigation
  const shouldUpdateSnapshots = process.argv.includes('-u')

  before(async () => {
    await fs.mkdir(snapshotDir, {recursive: true})
  })

  context('when using mergeAllConfigs', () => {
    const snapshotFile = 'createTypedefCode-mergeAllConfigs.ts.snap'

    before(() => {
      const process = {
        argv: [],
        cwd: () => path.resolve(__dirname, 'stub-module'),
        env: {
          DEPLOYMENT: 'www.example.com',
          NODE_ENV: 'production',
          USER: 'root',
          MAX_RETRIES: '999'
        }
      }
      config = mergeAllConfigs(process)
    })

    beforeEach(() => {
      actual = createTypedefCode(config)
    })

    it('should match the expected snapshot', () => {
      return assertMatchesSnapshot(actual, snapshotFile, shouldUpdateSnapshots)
    })

    it('should generate valid typescript', () => {
      const diagnostics = getDiagnostics(actual)
      assert.deepEqual(diagnostics, [])
    })
  }) // !context('when using mergeAllConfigs')

  context('when config is empty', () => {
    it('still creates valid typescript', () => {
      const actual = createTypedefCode({})
      const diagnostics = getDiagnostics(actual)
      assert.deepEqual(diagnostics, [])
    })
  })
})

const getDiagnostics = (source: string) => 
  ts.transpileModule(source, {
          compilerOptions: {
            module: ts.ModuleKind.CommonJS,
            strict: true
          }
        }).diagnostics ?? []
/**
 * Simple snapshot testing.
 * 
 * @param actual Returned text from tested function
 * @param snapshotFile name of snapshot file. Not a path.
 * @param update updates the snapshot if `actual` doesn't match
 * 
 * @returns 
 */
const assertMatchesSnapshot = async (
  actual: string,
  snapshotFile: string,
  update = false
): Promise<void> => {
  const snapshotPath = path.resolve(snapshotDir, snapshotFile)
  const snapshot = await fs
    .readFile(snapshotPath, 'utf8')
    .catch((err: NodeJS.ErrnoException) => {
      // file does not exist, which is fine
      if (err.code === 'ENOENT') {
        return undefined
      } else {
        throw err
      }
    })

  // snapshot exists, compare
  if (snapshot) {
    try {
      assert.strictEqual(actual, snapshot)
    } catch (err) {
      if (!(err instanceof assert.AssertionError)) throw err

      // snapshot does not match but we're in update mode, update snapshot
      if (update) {
        await fs.writeFile(snapshotPath, actual)
        return
      } else {
        throw err
      }
    }
  } else {
    // snapshot does not exist, create snapshot
    await fs.writeFile(snapshotPath, actual)
    return
  }
}
