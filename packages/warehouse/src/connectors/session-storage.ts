import { Connector } from '../models/connector'
import { webStorage } from './web-storage'

export const sessionStorageConnector: Connector = {
  get: <T>(key: string): T | null => webStorage.get<T>(sessionStorage, key),
  put: (key: string, value: unknown): void => {
    webStorage.put(sessionStorage, key, value)
  },
  remove: (key: string): void => {
    webStorage.remove(sessionStorage, key)
  },
}
