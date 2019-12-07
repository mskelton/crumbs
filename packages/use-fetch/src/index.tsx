import { useState } from 'react'
import { useAsyncEffect } from 'use-async-effect'
import { Exception } from './exception'

export function useFetch<T>(fn: () => Promise<T>) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Exception | null>(null)

  useAsyncEffect(isMounted => {
    fn()
      .then(data => isMounted() && setData(data))
      .catch(err => isMounted() && setError(err))
      .finally(() => isMounted() && setLoading(false))
  }, [])

  return { data, error, loading }
}
