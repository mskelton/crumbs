import Cookies from 'js-cookie'
import { BaseWarehouse } from './base'

export interface PutCookieOptions {
  expireDays?: number
}

export class CookieWarehouse extends BaseWarehouse {
  get<T>(key: string): T | null {
    const value = Cookies.get(this.getKey(key))
    return value ? JSON.parse(value) : null
  }

  put(key: string, value: unknown, options: PutCookieOptions = {}) {
    Cookies.set(this.getKey(key), JSON.stringify(value), {
      expires: options.expireDays,
    })
  }

  remove(key: string) {
    Cookies.remove(this.getKey(key))
  }
}
