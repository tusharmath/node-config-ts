/**
 * Created by tushar on 30/12/17.
 */

import {mergeAllConfigs} from './src/mergeAllConfigs'
import {mergeAllConfigsPreserveOptional} from './src/mergeAllConfigsPreserveOptional'
export const config: Config = mergeAllConfigs(process)
export const typedConfig: Config = mergeAllConfigsPreserveOptional(process)
