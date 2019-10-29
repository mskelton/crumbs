import { Warehouse } from '../../src'

export function expectValue(key, value, type) {
  const warehouse = new Warehouse({ type })
  warehouse.put(key, value)
  expect(warehouse.get(key)).toEqual(value)
}
