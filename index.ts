/**
 * Created by tushar on 30/12/17.
 */
import {mergeAllConfigs, NestedConfig} from './src/mergeAllConfigs'

export const config: NestedConfig = mergeAllConfigs(process)
