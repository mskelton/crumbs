import { createWarehouse } from '../src'
import { baseStorageTest } from './utils/base-storage-test'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('session storage', () => {
  baseStorageTest('sessionStorage')

  it('calls the sessionStorage API', () => {
    const warehouse = createWarehouse('sessionStorage')
    warehouse.put('foo', 'bar')
    warehouse.get('foo')
    warehouse.remove('foo')

    expect(sessionStorage.getItem).toHaveBeenCalled()
    expect(sessionStorage.setItem).toHaveBeenCalled()
    expect(sessionStorage.removeItem).toHaveBeenCalled()
  })
})
