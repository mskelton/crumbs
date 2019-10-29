import { baseStorageTest } from './utils/base-storage-test'
import { Warehouse } from '../src'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('local storage', () => {
  baseStorageTest('localStorage')

  it('calls the localStorage API', () => {
    const warehouse = new Warehouse({ type: 'localStorage' })
    warehouse.put('foo', 'bar')
    warehouse.get('foo')
    warehouse.remove('foo')

    expect(localStorage.getItem).toHaveBeenCalled()
    expect(localStorage.setItem).toHaveBeenCalled()
    expect(localStorage.removeItem).toHaveBeenCalled()
  })
})
