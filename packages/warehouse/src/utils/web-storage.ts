export const webStorage = {
  get: <T>(storage: Storage, key: string): T | null => {
    const value = storage.getItem(key)
    return value ? JSON.parse(value) : null
  },
  put: (storage: Storage, key: string, value: unknown) => {
    storage.setItem(key, JSON.stringify(value))
  },
  remove: (storage: Storage, key: string) => {
    storage.removeItem(key)
  },
}
