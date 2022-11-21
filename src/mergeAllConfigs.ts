const debug = require('debug')('config:mergeall'); // eslint-disable-line @typescript-eslint/no-var-requires

import R = require('ramda');
import { loadCLIConfigs } from './loadCliConfigs';
import { loadFileConfigs } from './loadFileConfigs';
import { replaceWithEnvVar } from './replaceWithEnvVar';
import { mergeFileConfigs } from './mergeFileConfigs';
import { overwriteWithCustomEnvVars } from './overwriteWithCustomEnvVars';

/**
 * Loads all the configs from files and cli and merges them.
 */
export const mergeAllConfigs = (process: NodeJS.Process) => {
  const loadedFileConfigs = loadFileConfigs(process);
  debug('loadedFileConfigs', loadedFileConfigs);

  const mergedFileConfigs = mergeFileConfigs(loadedFileConfigs);
  debug('mergedFileConfigs', mergedFileConfigs);

  const replaced = replaceWithEnvVar(mergedFileConfigs, process);
  debug('replaced', replaced);

  const customEnv = overwriteWithCustomEnvVars(process);
  debug('customEnv', customEnv);

  const cliConfigs = loadCLIConfigs(process);
  debug('cliConfigs', cliConfigs);

  const merged = R.reduce(R.mergeDeepRight, replaced, [customEnv, cliConfigs]);
  return merged;
};
