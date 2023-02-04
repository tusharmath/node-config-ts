/**
 * Created by tushar on 10/01/18.
 */

const getVarName = (value: string) => value.replace('@@', '')
const hasEnvVar = (value: string) => /^@@.*$/.test(value)

type NodeENV = {
  env: {
    [key: string]: string | undefined
  }
}
export const replaceWithEnvVar = <T, P extends NodeENV>(
  baseConfig: T,
  process: P = { env: {} } as P
): T => {
  const iterate = (value: any) => {
    if (typeof value === 'object') {
      return Object.entries(value).reduce((acc, [key, innerValue]) => {
        acc[key] = iterate(innerValue)
        return acc
      }, {} as Record<string, any>)
    }
    if (typeof value === 'string' && hasEnvVar(value)) {
      return process.env[getVarName(value)]
    }
    return value
  }

  return iterate(baseConfig)
}
