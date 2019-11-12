import { act, getNodeText, render } from '@testing-library/react'
import React from 'react'
import { useDebounce } from '../src'

jest.useFakeTimers()

const TIMEOUT = 1000

function Component(props) {
  const value = useDebounce(props.text, TIMEOUT)
  return <span data-testid="value">{value}</span>
}

describe('useDebounce', () => {
  it('renders the initial value in first render', () => {
    const { getByTestId } = render(<Component text="Hello world" />)
    expect(getNodeText(getByTestId('value'))).toBe('Hello world')
  })

  it('waits for the timeout before re-rendering', () => {
    const { getByTestId, rerender } = render(<Component text="Hello" />)

    // Check initial value
    expect(getNodeText(getByTestId('value'))).toBe('Hello')

    act(() => {
      // This won't update until after the timeout
      rerender(<Component text="Hello world" />)
    })

    // Run timers up to the timeout
    act(() => {
      jest.runTimersToTime(TIMEOUT - 1)
    })

    // Value hasn't changed yet
    expect(getNodeText(getByTestId('value'))).toBe('Hello')

    // Finish the timeout
    act(() => {
      jest.runTimersToTime(1)
    })

    // After the timeout, the new value is applied
    expect(getNodeText(getByTestId('value'))).toBe('Hello world')
  })

  describe('when the timer finishes', () => {
    it('updates the value', () => {
      const { getByTestId, rerender } = render(<Component text="Hello" />)

      // Check initial value
      expect(getNodeText(getByTestId('value'))).toBe('Hello')

      act(() => {
        rerender(<Component text="Hello world" />)
      })

      // Timeout shouldn't have called yet
      expect(getNodeText(getByTestId('value'))).toBe('Hello')

      act(() => {
        jest.runAllTimers()
      })

      // After runAllTimer text should be updated
      expect(getNodeText(getByTestId('value'))).toBe('Hello world')
    })

    it('applies the latest value', () => {
      const { getByTestId, rerender } = render(<Component text="Hello" />)

      // Check initial value
      expect(getNodeText(getByTestId('value'))).toBe('Hello')

      act(() => {
        // This value shouldn't be applied, as we'll set up another one
        rerender(<Component text="Wrong value" />)
      })

      // Timeout shouldn't have called yet
      expect(getNodeText(getByTestId('value'))).toBe('Hello')

      act(() => {
        // This value should be applied, as it is the last value passed in
        rerender(<Component text="Hello world" />)
        jest.runAllTimers()
      })

      // After runAllTimer text should be updated
      expect(getNodeText(getByTestId('value'))).toBe('Hello world')
    })
  })
})
