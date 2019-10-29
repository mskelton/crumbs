import { Connector } from '../models/connector'
import { WarehouseType } from '../models/options'
import { cookieConnector } from './cookie'
import { localStorageConnector } from './local-storage'
import { sessionStorageConnector } from './session-storage'

export function getConnector(type: WarehouseType): Connector {
  switch (type) {
    case 'sessionStorage':
      return sessionStorageConnector

    case 'localStorage':
      return localStorageConnector

    case 'cookie':
      return cookieConnector
  }
}
