/**
 * Created by tushar on 30/12/17.
 */
import {mergeAllConfigs} from './src/mergeAllConfigs'

// Try to load .env file. This will fail if dotenv is not installed. Note that
// require() is used instead of import() because import() is asynchronous and we
// need to load the config before the app starts. Also, ES6 import statements
// can't be wrapped in a try/catch block.
try {
    require('dotenv').config()
} catch (err) {
    // ignore
}

export const config = mergeAllConfigs(process)
