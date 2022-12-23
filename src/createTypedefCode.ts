/**
 * Created by donisaac on 23/12/2022
 */

import * as prettier from 'prettier'

const JsonToTS = require('json-to-ts')

export const createTypedefCode = (config: any) => {
  const rootName = 'IConfig'
  const ts = prettier.format(
    [
      '/* tslint:disable */',
      '/* eslint-disable */',
      'declare module "node-config-ts" {'
    ]
      .concat(JsonToTS(config, {rootName}))
      .concat([
        'export const config: Config',
        `export type Config = ${rootName}`,
        '}'
      ])
      .join('\n'),
    {
      parser: 'typescript',
      semi: false
    }
  )

  return ts
}
