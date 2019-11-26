import { webStorage } from '../utils/web-storage'
import { BaseWarehouse } from './base'

export class SessionStorageWarehouse extends BaseWarehouse {
  get<T>(key: string) {
    return webStorage.get<T>(sessionStorage, this.getKey(key))
  }

  put(key: string, value: unknown) {
    webStorage.put(sessionStorage, this.getKey(key), value)
  }

  remove(key: string) {
    webStorage.remove(sessionStorage, this.getKey(key))
  }
}
