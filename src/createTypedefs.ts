const debug = require('debug')('config:typedefs'); // eslint-disable-line @typescript-eslint/no-var-requires

import fs from 'fs';
import path from 'path';
import { format } from 'prettier';
import JsonToTS from 'json-to-ts';

import { config } from '../index';
import { baseConfigPath } from './baseConfigPath';

const file = process.env['OUTPUT_FILENAME'] ?? `Config.d.ts`;
const folder = process.env['OUTPUT_FOLDER'] ?? path.resolve(process.cwd(), baseConfigPath(process));

const jsToTsOutput = JsonToTS(config, { rootName: 'IConfig' });
debug('jsToTsOutput', jsToTsOutput);

const ts = format(
  ['/* tslint:disable */', '/* eslint-disable */', 'declare module "node-config-ts" {']
    .concat(jsToTsOutput)
    .concat(['export const config: Config', 'export type Config = IConfig', '}'])
    .join('\n'),
  {
    parser: 'typescript',
    semi: false,
  }
);

fs.writeFileSync(path.resolve(folder, file), ts);
