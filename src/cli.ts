import {createTypeDefFile} from './createTypedefFile'
import * as fs from 'fs'

export = (process: any) => {
  const {filePath, data} = createTypeDefFile(process)
  return fs.writeFileSync(filePath, data)
}