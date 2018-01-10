/**
 * Created by tushar on 10/01/18.
 */

import * as R from 'ramda'

const getVarName = R.replace('@@', '')
const hasEnvVar = R.test(/^@@.*$/)
export const applyEnvVariables = <T>(baseConfig: T, process: any) => {
  const itar = R.map((value: any) => {
    if (R.is(Object, value)) return itar(value)
    if (R.is(String, value) && hasEnvVar(value))
      return process.env[getVarName(value)]
    return value
  })
  return itar(baseConfig)
}
