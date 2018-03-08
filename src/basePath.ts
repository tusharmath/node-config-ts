import * as path from "path";
import minimist = require("minimist");

export const basePath = (process: any) => {
  const {_: [configDir]} = minimist(process.argv)
  return path.resolve(process.cwd(), configDir || 'config')
}