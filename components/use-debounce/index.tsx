import { useState, useEffect } from 'react'

export function useDebounce<T>(current: T, delay: number) {
  const [value, setValue] = useState(current)

  useEffect(() => {
    const id = setTimeout(() => setValue(current), delay)
    return () => clearTimeout(id)
  }, [current, delay])

  return value
}
