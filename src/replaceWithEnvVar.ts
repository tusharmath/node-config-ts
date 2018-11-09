/**
 * Created by tushar on 10/01/18.
 */

import * as R from 'ramda'

const getVarName = R.replace('@@', '')
const hasEnvVar = R.test(/^@@.*$/)
export const replaceWithEnvVar = <T>(
  baseConfig: T,
  process: NodeJS.Process
) => {
  const itar: any = R.map((value: any) => {
    if (R.is(Object, value)) return itar(value)
    if (R.is(String, value) && hasEnvVar(value))
      return process.env[getVarName(value)]
    return value
  })
  return itar(baseConfig)
}
