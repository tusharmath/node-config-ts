const debug = require('debug')('config:loadfiles'); // eslint-disable-line @typescript-eslint/no-var-requires

import fs from 'fs';
import * as R from 'ramda';
import { configPaths, ConfigTypes } from './configPaths';

export type Configurations<T> = { [key in keyof T]: any };

/**
 * Loads the configs provided in the {ConfigPaths}
 * If no config is found then an empty config is returned.
 * @param process {Process}
 * @return {defaultConfig, envConfig, deploymentConfig, userConfig}
 */
export const loadFileConfigs = (process: NodeJS.Process): Configurations<ConfigTypes> => {
  const paths = configPaths(process);
  debug('paths', paths);

  const itar: any = R.mapObjIndexed(R.ifElse(fs.existsSync, require, R.always({})));
  return itar(paths);
};
