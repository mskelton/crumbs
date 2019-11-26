import { WarehouseOptions, WarehouseType } from './models'
import {
  CookieWarehouse,
  LocalStorageWarehouse,
  SessionStorageWarehouse,
} from './stores'

export function createWarehouse(
  type: 'cookie',
  options?: WarehouseOptions
): CookieWarehouse

export function createWarehouse(
  type: 'localStorage',
  options?: WarehouseOptions
): LocalStorageWarehouse

export function createWarehouse(
  type: 'sessionStorage',
  options?: WarehouseOptions
): SessionStorageWarehouse

export function createWarehouse(
  type: WarehouseType,
  options?: WarehouseOptions
) {
  switch (type) {
    case 'cookie':
      return new CookieWarehouse(options)

    case 'localStorage':
      return new LocalStorageWarehouse(options)

    case 'sessionStorage':
      return new SessionStorageWarehouse(options)
  }
}
