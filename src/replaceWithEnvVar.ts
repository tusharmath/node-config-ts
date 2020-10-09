/**
 * Created by tushar on 10/01/18.
 */

import * as R from 'ramda'

const regex: RegExp = /@@((.*?@@)|(.*))/g
const getVarNames = R.pipe(
  R.match(regex),
  R.map(
    R.applySpec({
      name: R.replace(/@@/g, ''),
      match: R.identity
    })
  )
)

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
    const matchedVars = R.is(String, value) ? getVarNames(value) : []
    if (matchedVars.length)
      return R.reduce(
        (acc, e) =>
          R.replace(e.match as string, process.env[e.name] || '', acc),
        value,
        matchedVars
      )
    return value
  })
  return itar(baseConfig)
}
