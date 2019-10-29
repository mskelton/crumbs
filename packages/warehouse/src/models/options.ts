export type WarehouseType = 'cookie' | 'localStorage' | 'sessionStorage'

export interface WarehouseOptions {
  type: WarehouseType
  prefix?: string
}

export interface PutOptions {
  expireDays?: number
}
