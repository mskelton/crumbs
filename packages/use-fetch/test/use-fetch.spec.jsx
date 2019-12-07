import { act, getNodeText, render } from '@testing-library/react'
import React from 'react'
import { useFetch } from '../src'

jest.useFakeTimers()

const TIMEOUT = 1000

function fetchData(data, error) {
  return new Promise((resolve, reject) => {
    return setTimeout(() => (error ? reject(error) : resolve(data)), TIMEOUT)
  })
}

function Component(props) {
  const { data, error, loading } = useFetch(() =>
    fetchData(props.data, props.error)
  )

  return (
    <>
      {loading && <span data-testid="loading" />}
      {error && <span data-testid="error">{error}</span>}
      {data && <span data-testid="data">{data}</span>}
    </>
  )
}

describe('on initial render', () => {
  let queryByTestId

  beforeAll(() => {
    const result = render(<Component />)
    queryByTestId = result.queryByTestId
  })

  it('renders loading state', () => {
    expect(queryByTestId('loading')).not.toBeNull()
  })

  it('does not render data', () => {
    expect(queryByTestId('data')).toBeNull()
  })

  it('does not render error', () => {
    expect(queryByTestId('error')).toBeNull()
  })
})

describe('fetch success', () => {
  const data = 'Fetched data'

  describe('before fetch finishes', () => {
    it('renders loading state', () => {
      const { queryByTestId } = render(<Component data={data} />)

      // Run timers to 1ms before the fetch finishes
      act(() => {
        jest.runTimersToTime(TIMEOUT - 1)
      })

      // Still renders loading state
      expect(queryByTestId('loading')).not.toBeNull()
      expect(queryByTestId('data')).toBeNull()
      expect(queryByTestId('error')).toBeNull()
    })
  })

  describe('after fetch finishes', () => {
    it('renders data and hides loading/error', async () => {
      const { getByTestId, queryByTestId } = render(<Component data={data} />)

      // Finish the fetch
      await act(async () => {
        jest.runTimersToTime(TIMEOUT)
      })

      // Renders the error state
      expect(queryByTestId('loading')).toBeNull()
      expect(getNodeText(getByTestId('data'))).toBe(data)
      expect(queryByTestId('error')).toBeNull()
    })
  })
})

describe('fetch error', () => {
  const error = 'Failed to fetch'

  describe('before fetch finishes', () => {
    it('renders loading state', () => {
      const { queryByTestId } = render(<Component error={error} />)

      // Run timers to 1ms before the fetch finishes
      act(() => {
        jest.runTimersToTime(TIMEOUT - 1)
      })

      // Still renders loading state
      expect(queryByTestId('loading')).not.toBeNull()
      expect(queryByTestId('data')).toBeNull()
      expect(queryByTestId('error')).toBeNull()
    })
  })

  describe('after fetch finishes', () => {
    it('renders error and hides loading/data', async () => {
      const { getByTestId, queryByTestId } = render(<Component error={error} />)

      // Finish the fetch
      await act(async () => {
        jest.runTimersToTime(TIMEOUT)
      })

      // Renders the error state
      expect(queryByTestId('loading')).toBeNull()
      expect(queryByTestId('data')).toBeNull()
      expect(getNodeText(getByTestId('error'))).toBe(error)
    })
  })
})
