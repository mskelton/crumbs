import { createWarehouse } from '../src'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('creating a warehouse', () => {
  describe('when no prefix is specified', () => {
    it('does not add a prefix to keys', () => {
      const warehouse = createWarehouse('sessionStorage')
      warehouse.put('foo', 'bar')

      expect(warehouse.get('foo')).toBe('bar')
      expect(sessionStorage.getItem).toHaveBeenLastCalledWith('foo')
    })
  })

  describe('when a prefix is specified', () => {
    it('adds a prefix to keys', () => {
      const warehouse = createWarehouse('sessionStorage', {
        prefix: 'test-',
      })
      warehouse.put('foo', 'bar')

      expect(warehouse.get('foo')).toBe('bar')
      expect(sessionStorage.getItem).toHaveBeenLastCalledWith('test-foo')
    })
  })
})
