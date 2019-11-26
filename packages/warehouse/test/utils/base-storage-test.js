import { createWarehouse } from '../../src'
import { expectValue } from './expect-value'

export function baseStorageTest(type) {
  describe('stores', () => {
    // Primitive values
    it('string values', () => expectValue('foo', 'bar', type))
    it('numeric values', () => expectValue('foo', 123, type))
    it('boolean values', () => expectValue('foo', true, type))

    // Non-primitive values
    it('arrays', () => expectValue('foo', ['foo', 'bar', 123], type))
    it('objects', () => expectValue('foo', { baz: 123, foo: 'bar' }, type))
  })

  it('updates items', () => {
    const warehouse = createWarehouse(type)
    const key = 'foo'

    // Put the item in the warehouse and verify it exists
    warehouse.put(key, 'bar')
    expect(warehouse.get(key)).toBe('bar')

    // Update the value and verify it was updated
    warehouse.put(key, 'baz')
    expect(warehouse.get(key)).toBe('baz')
  })

  it('removes items', () => {
    const warehouse = createWarehouse(type)
    const key = 'foo'
    const value = 'bar'

    // Put the item in the warehouse and verify it exists
    warehouse.put(key, value)
    expect(warehouse.get(key)).toBe(value)

    // Remove the item from the warehouse and verify it no longer exists
    warehouse.remove(key)
    expect(warehouse.get(key)).toBeNull()
  })

  describe("when getting an item that doesn't exist", () => {
    it('returns null', () => {
      expect(createWarehouse(type).get('not-found')).toBeNull()
    })
  })

  describe("when removing an item that doesn't exist", () => {
    it('fails silently', () => {
      const warehouse = createWarehouse(type)

      expect(warehouse.get('not-found')).toBeNull()
      expect(() => warehouse.remove('not-found')).not.toThrow()
    })
  })
}
