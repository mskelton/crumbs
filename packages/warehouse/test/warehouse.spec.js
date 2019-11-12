import { Warehouse } from '../src'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('creating a warehouse', () => {
  describe('when no prefix is specified', () => {
    it('does not add a prefix to keys', () => {
      const warehouse = new Warehouse({ type: 'sessionStorage' })
      warehouse.put('foo', 'bar')

      expect(warehouse.get('foo')).toBe('bar')
      expect(sessionStorage.getItem).toHaveBeenLastCalledWith('foo')
    })
  })

  describe('when a prefix is specified', () => {
    it('adds a prefix to keys', () => {
      const warehouse = new Warehouse({
        prefix: 'test-',
        type: 'sessionStorage',
      })
      warehouse.put('foo', 'bar')

      expect(warehouse.get('foo')).toBe('bar')
      expect(sessionStorage.getItem).toHaveBeenLastCalledWith('test-foo')
    })
  })
})
