export const webStorage = {
  get: <T>(storage: Storage, key: string): T | null => {
    const value = storage.getItem(key)
    return value ? JSON.parse(value) : null
  },
  put: (storage: Storage, key: string, value: unknown): void => {
    storage.setItem(key, JSON.stringify(value))
  },
  remove: <T>(storage: Storage, key: string): void => {
    storage.removeItem(key)
  },
}
