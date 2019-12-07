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

function generateBeforeFetchTests(props) {
  let queryByTestId

  function expectLoading() {
    it('renders loading state', () => {
      expect(queryByTestId('loading')).not.toBeNull()
    })

    it('does not render data', () => {
      expect(queryByTestId('data')).toBeNull()
    })

    it('does not render error', () => {
      expect(queryByTestId('error')).toBeNull()
    })
  }

  describe('on initial render', () => {
    beforeEach(() => {
      queryByTestId = render(<Component {...props} />).queryByTestId
    })

    expectLoading.call(this)
  })

  describe('before fetch finishes', () => {
    beforeEach(() => {
      queryByTestId = render(<Component {...props} />).queryByTestId

      // Run timers to 1ms before the fetch finishes
      act(() => {
        jest.runTimersToTime(TIMEOUT - 1)
      })
    })

    expectLoading.call(this)
  })
}

describe('successful fetch', () => {
  const data = 'Fetched data'

  generateBeforeFetchTests({ data })

  describe('after fetch finishes', () => {
    let getByTestId, queryByTestId

    beforeEach(async () => {
      const result = render(<Component data={data} />)

      getByTestId = result.getByTestId
      queryByTestId = result.queryByTestId

      // Finish the fetch
      await act(async () => {
        jest.runTimersToTime(TIMEOUT)
      })
    })

    it('renders data', () => {
      expect(getNodeText(getByTestId('data'))).toBe(data)
    })

    it('does not render loading state', () => {
      expect(queryByTestId('loading')).toBeNull()
    })

    it('does not render error', () => {
      expect(queryByTestId('error')).toBeNull()
    })
  })
})

describe('fetch error', () => {
  const error = 'Failed to fetch'

  generateBeforeFetchTests({ error })

  describe('after fetch finishes', () => {
    let getByTestId, queryByTestId

    beforeEach(async () => {
      const result = render(<Component error={error} />)

      getByTestId = result.getByTestId
      queryByTestId = result.queryByTestId

      // Finish the fetch
      await act(async () => {
        jest.runTimersToTime(TIMEOUT)
      })
    })

    it('renders error', () => {
      expect(getNodeText(getByTestId('error'))).toBe(error)
    })

    it('does not render loading state', () => {
      expect(queryByTestId('loading')).toBeNull()
    })

    it('does not render data', () => {
      expect(queryByTestId('data')).toBeNull()
    })
  })
})
