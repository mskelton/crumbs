import { createWarehouse } from '../../src'

export function expectValue(key, value, type) {
  const warehouse = createWarehouse(type)
  warehouse.put(key, value)
  expect(warehouse.get(key)).toEqual(value)
}
