/**
 * Created by tushar on 30/12/17.
 */

import {loadAllConfigs} from './src/loadAllConfigs'

export const config = loadAllConfigs(process) as Config
