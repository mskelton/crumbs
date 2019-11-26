import { BaseWarehouse } from './base'
import { webStorage } from '../utils/web-storage'

export class LocalStorageWarehouse extends BaseWarehouse {
  get<T>(key: string) {
    return webStorage.get<T>(localStorage, this.getKey(key))
  }

  put(key: string, value: unknown) {
    webStorage.put(localStorage, this.getKey(key), value)
  }

  remove(key: string) {
    webStorage.remove(localStorage, this.getKey(key))
  }
}
