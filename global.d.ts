/**
 * Created by tushar on 30/12/17.
 */

declare module 'module-exists' {
  function exists(path: string): boolean
  export = exists
}

declare module '*.json' {
  export {}
}

interface Config {}
