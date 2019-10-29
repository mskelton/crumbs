import Cookies from 'js-cookie'
import { Connector } from '../models/connector'
import { PutOptions } from '../models/options'

export const cookieConnector: Connector = {
  get: <T>(key: string): T | null => {
    const value = Cookies.get(key)
    return value ? JSON.parse(value) : null
  },
  put: (key: string, value: unknown, options: PutOptions): void => {
    Cookies.set(key, JSON.stringify(value), {
      expires: options.expireDays,
    })
  },
  remove: (key: string): void => {
    Cookies.remove(key)
  },
}
