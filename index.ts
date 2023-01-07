/**
 * Created by tushar on 30/12/17.
 */
import * as dotenv from 'dotenv'
import {mergeAllConfigs} from './src/mergeAllConfigs'

dotenv.config()
export const config = mergeAllConfigs(process)
