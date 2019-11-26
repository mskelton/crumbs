import Cookies from 'js-cookie'
import { createWarehouse } from '../src'
import { baseStorageTest } from './utils/base-storage-test'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('cookies', () => {
  baseStorageTest('cookie')

  it('calls the underlying cookie library', () => {
    jest.spyOn(Cookies, 'get')
    jest.spyOn(Cookies, 'set')
    jest.spyOn(Cookies, 'remove')

    const warehouse = createWarehouse('cookie')
    warehouse.put('foo', 'bar')
    warehouse.get('foo')
    warehouse.remove('foo')

    expect(Cookies.get).toHaveBeenCalled()
    expect(Cookies.set).toHaveBeenCalled()
    expect(Cookies.remove).toHaveBeenCalled()
  })

  it('sets expiration on cookies', () => {
    jest.spyOn(Cookies, 'set')

    const warehouse = createWarehouse('cookie')
    warehouse.put('foo', 'bar', { expireDays: 1 })

    expect(Cookies.set).toHaveBeenCalledWith('foo', '"bar"', { expires: 1 })
  })
})
