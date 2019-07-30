import {NonConfigEnv} from './configPaths'

export const checkIfBootstrap: <T extends NonConfigEnv>(
  process: T
) => boolean = process => process.env['BOOTSTRAP'] === 'true'
