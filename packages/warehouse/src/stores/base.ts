import { WarehouseOptions } from '../models'

export abstract class BaseWarehouse {
  constructor(private options: WarehouseOptions = {}) {}

  protected getKey(key: string) {
    return (this.options.prefix || '') + key
  }
}
