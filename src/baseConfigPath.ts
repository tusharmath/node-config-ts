/**
 * Default config directory
 */
const DEFAULT_BASE_DIR = 'config'

type NonConfigTSEnv = {
  env: {
    NODE_CONFIG_TS_DIR?: string
  }
}

/**
 * Returns the base path for loading the configurations.
 */
export const baseConfigPath = <T extends NonConfigTSEnv>(
  process: T
): string => {
  return process.env['NODE_CONFIG_TS_DIR'] || DEFAULT_BASE_DIR
}
