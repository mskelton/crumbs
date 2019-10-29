import { Connector } from '../models/connector'
import { webStorage } from './web-storage'

export const localStorageConnector: Connector = {
  get: <T>(key: string): T | null => webStorage.get<T>(localStorage, key),
  put: (key: string, value: unknown): void => {
    webStorage.put(localStorage, key, value)
  },
  remove: (key: string): void => {
    webStorage.remove(localStorage, key)
  },
}
