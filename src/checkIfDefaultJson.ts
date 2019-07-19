import * as fs from 'fs'
import * as path from 'path'
import {NonConfigEnv} from './configPaths'

/**
 * Check if given path has default.json
 */
export const checkIfDefaultJson = <T extends NonConfigEnv>(
  process: T,
  p: string
) => fs.existsSync(path.resolve(process.cwd(), `${p}/default.json`))
