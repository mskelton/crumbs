import { createWarehouse } from '../src'
import { baseStorageTest } from './utils/base-storage-test'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('local storage', () => {
  baseStorageTest('localStorage')

  it('calls the localStorage API', () => {
    const warehouse = createWarehouse('localStorage')
    warehouse.put('foo', 'bar')
    warehouse.get('foo')
    warehouse.remove('foo')

    expect(localStorage.getItem).toHaveBeenCalled()
    expect(localStorage.setItem).toHaveBeenCalled()
    expect(localStorage.removeItem).toHaveBeenCalled()
  })
})
