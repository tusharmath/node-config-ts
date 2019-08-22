/**
 * Created by tushar on 30/12/17.
 */
import R = require('ramda')
import {loadCLIConfigs} from './loadCliConfigs'
import {loadFileConfigs} from './loadFileConfigs'
import {hasEnvVar} from './replaceWithEnvVar'
import {mergeFileConfigs} from './mergeFileConfigs'

/**
 * Replaces keys that have env var values with optional keys for json-to-ts
 */
export const mergeAllConfigs: (o: object) => [string, any][] = R.compose(
  R.map(([k, v]) => {
    if (R.is(Object, v)) {
      return [k, R.fromPairs<any>(mergeAllConfigs(v))]
    } else if (hasEnvVar(v)) {
      return [`${k}--?`, v]
    }
    return [k, v]
  }),
  (o: object) => R.toPairs<any>(o)
)

/**
 * Loads all the configs from files and cli and merges them.
 */

export const mergeAllConfigsPreserveOptional = (p: any) =>
  R.fromPairs(
    mergeAllConfigs(
      R.converge(R.mergeDeepRight, [
        R.converge(R.identity, [
          R.compose(
            mergeFileConfigs,
            loadFileConfigs
          ),
          R.identity
        ]),
        loadCLIConfigs
      ])(p)
    )
  )
