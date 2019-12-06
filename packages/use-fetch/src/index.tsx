import { useState } from 'react'
import { useAsyncEffect } from 'use-async-effect'
import { Exception } from './exception'

type State<T> = {
  data: T | null
  error: Exception | null
  loading: boolean
}

export function useFetch<T>(fn: () => Promise<T>) {
  const [state, setState] = useState<State<T>>({
    data: null,
    error: null,
    loading: true,
  })

  useAsyncEffect(async isMounted => {
    try {
      const data = await fn()

      if (isMounted) {
        setState({ data, error: null, loading: false })
      }
    } catch (error) {
      if (isMounted) {
        setState({ data: null, error, loading: false })
      }
    }
  }, [])

  return state
}
