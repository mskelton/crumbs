import { WarehouseOptions } from '../models/options'

export class BaseWarehouse {
  private options: WarehouseOptions

  constructor(options: WarehouseOptions = {}) {
    this.options = options
  }

  protected getKey(key: string) {
    return (this.options.prefix || '') + key
  }
}
