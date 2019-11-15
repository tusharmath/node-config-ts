/**
 * Created by tushar on 10/01/18.
 */

import * as R from 'ramda'

const getVarName = R.replace('@@', '')
export const hasEnvVar = R.test(/^@@.*$/)

type NodeENV = {
  env: {
    [key: string]: string
  }
}
export const replaceWithEnvVar = <T, P extends NodeENV>(
  baseConfig: T,
  process: P
): T => {
  const itar: any = R.map((value: any) => {
    if (R.is(Object, value)) return itar(value)
    if (R.is(String, value) && hasEnvVar(value))
      return process.env[getVarName(value)]
    return value
  })
  return itar(baseConfig)
}
