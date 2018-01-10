/**
 * Created by tushar on 30/12/17.
 */

import minimist = require('minimist')
import * as R from 'ramda'

/**
 * Loads config from the command line
 * @param process
 * @return {{cliConfig: any}}
 */
export const loadCLIConfigs = (process: any) => {
  const cliConfig = R.omit(['_'], minimist(process.argv))
  return {cliConfig}
}
