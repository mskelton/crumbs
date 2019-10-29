import { getConnector } from './connectors'
import { Connector } from './models/connector'
import { PutOptions, WarehouseOptions } from './models/options'

export class Warehouse {
  private options: WarehouseOptions
  private connector: Connector

  constructor(options: WarehouseOptions) {
    this.options = options
    this.connector = getConnector(options.type)
  }

  get<T>(key: string): T | null {
    return this.connector.get<T>(this.getKey(key))
  }

  put(key: string, value: unknown, options: PutOptions = {}): void {
    return this.connector.put(this.getKey(key), value, options)
  }

  remove(key: string): void {
    this.connector.remove(this.getKey(key))
  }

  private getKey(key: string) {
    return (this.options.prefix || '') + key
  }
}
