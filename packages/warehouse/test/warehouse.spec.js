import { Warehouse } from '../src'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('creating a warehouse', () => {
  it("doesn't add a prefix to keys when no prefix is provided", () => {
    const warehouse = new Warehouse({ type: 'sessionStorage' })
    warehouse.put('foo', 'bar')

    expect(warehouse.get('foo')).toBe('bar')
    expect(sessionStorage.getItem).toHaveBeenLastCalledWith('foo')
  })

  it('adds a prefix to keys when specified in the constructor', () => {
    const warehouse = new Warehouse({ prefix: 'test-', type: 'sessionStorage' })
    warehouse.put('foo', 'bar')

    expect(warehouse.get('foo')).toBe('bar')
    expect(sessionStorage.getItem).toHaveBeenLastCalledWith('test-foo')
  })
})
