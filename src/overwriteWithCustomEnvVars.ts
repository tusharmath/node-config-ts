const debug = require('debug')('config:overwrite'); // eslint-disable-line @typescript-eslint/no-var-requires

import * as R from 'ramda';
import * as fs from 'fs';
import path from 'path';

import { configPaths } from './configPaths';

type NestedValue = { [k: string]: string | NestedValue };

export const overwriteWithCustomEnvVars = (process: NodeJS.Process) => {
  const { defaultConfig } = configPaths(process);
  const pathObj = path.parse(defaultConfig);
  debug('pathObj', pathObj);
  const customEnvironmentVariablesPath = `${pathObj.dir}/custom-environment-variables${pathObj.ext}`;

  const doesFileExist = fs.existsSync(customEnvironmentVariablesPath);
  debug('customEnvironmentVariablesPath', customEnvironmentVariablesPath, doesFileExist);
  const foundVars: Array<{
    path: Array<string>;
    value: string;
  }> = [];
  if (doesFileExist === true) {
    const vars = require(customEnvironmentVariablesPath); // eslint-disable-line @typescript-eslint/no-var-requires
    debug(vars);

    const itar = (value: any, path: Array<string>) => {
      debug('itar', value, path);
      if (R.is(Object, value)) {
        Object.keys(value).forEach((key) => {
          itar(value[key], [...path, key]);
        });
        return;
      }

      if (R.is(String, value)) {
        const val = process.env[value];
        if (val != null) {
          debug('found', value, path, val);
          foundVars.push({ path, value: val });
          return;
        }
      }
      return;
    };

    itar(vars, []);
    debug('foundVars', foundVars);
  }

  const obj: NestedValue = {};
  foundVars.forEach((f) => {
    let ref: NestedValue = obj;
    f.path.forEach((p, index) => {
      if (index === f.path.length - 1) {
        ref[p] = f.value;
        return;
      }
      if (ref[p] == null) {
        ref[p] = {};
        ref = ref[p] as NestedValue;
      }
    });
  });
  debug('obj', obj);
  return obj;
};
