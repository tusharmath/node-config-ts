/**
 * Created by tushar on 30/12/17.
 */

declare const __CONFIG__: Config

export const config: Config =
  typeof __CONFIG__ === 'undefined'
    ? require('./src/mergeAllConfigs').mergeAllConfigs(process)
    : __CONFIG__
