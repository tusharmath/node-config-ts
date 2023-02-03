/**
 * Created by tushar on 30/12/17.
 */

import minimist = require('minimist')

type ProcessArgv = {
  argv: string[]
}

/**
 * Loads config from the command line
 * @param process
 * @return {{cliConfig: any}}
 */
export const loadCLIConfigs = <T extends ProcessArgv>(process: T) => {
  // omit _ from the parsed args
  const { _: _, ...rest } = minimist(process.argv)
  return rest;
}
