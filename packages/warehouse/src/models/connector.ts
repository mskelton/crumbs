import { PutOptions } from './options'

export interface Connector {
  get: <T>(key: string) => T | null
  put: (key: string, value: unknown, options: PutOptions) => void
  remove: (key: string) => void
}
