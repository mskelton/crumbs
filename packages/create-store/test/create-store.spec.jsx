import { act, fireEvent, getNodeText, render } from '@testing-library/react'
import React, { useEffect, useRef } from 'react'
import { createStore, InvalidReducerAction } from '../src'

jest.useFakeTimers()

// Cleanup console.error mocks
const { error: originalError } = console

afterEach(() => {
  console.error = originalError
})

function createTestStore() {
  return createStore(
    'Initial value',
    'TestProvider',
    (_, action) => action.value
  )
}

const PROVIDER_ERROR =
  'Store consumer initalized outside of TestProvider. ' +
  'Please wrap your consumer in TestProvider.'

describe('createStore', () => {
  const types = {
    decrement: 'DECREMENT',
    increment: 'INCREMENT',
    reset: 'RESET',
  }

  function countReducer(state, action) {
    switch (action.type) {
      case types.increment:
        return state + 1

      case types.decrement:
        return state - 1

      case types.reset:
        return 0

      default:
        throw new InvalidReducerAction(action.type)
    }
  }

  it('updates state using reducer actions', () => {
    const { Provider, useHook } = createStore(0, 'CountProvider', countReducer)

    function Button({ type }) {
      const dispatch = useHook.useDispatchOnly()
      return <button data-testid={type} onClick={() => dispatch({ type })} />
    }

    function Component() {
      const [state] = useHook()

      return (
        <>
          <Button type={types.increment} />
          <Button type={types.decrement} />
          <Button type={types.reset} />

          <span data-testid="state">{state}</span>
        </>
      )
    }

    const { getByTestId } = render(
      <Provider>
        <Component />
      </Provider>
    )

    // Test initial state value
    expect(getNodeText(getByTestId('state'))).toBe('0')

    // Increment the state
    act(() => {
      fireEvent.click(getByTestId(types.increment))
      fireEvent.click(getByTestId(types.increment))
      fireEvent.click(getByTestId(types.increment))
    })

    // Value should increment
    expect(getNodeText(getByTestId('state'))).toBe('3')

    // Decrement the state
    act(() => {
      fireEvent.click(getByTestId(types.decrement))
      fireEvent.click(getByTestId(types.decrement))
    })

    // Value should decrement
    expect(getNodeText(getByTestId('state'))).toBe('1')

    // Reset the state
    act(() => {
      fireEvent.click(getByTestId(types.reset))
    })

    // Value should be reset
    expect(getNodeText(getByTestId('state'))).toBe('0')
  })
})

describe('useHook', () => {
  describe('when state change', () => {
    it('re-renders the component', () => {
      const { Provider, useHook } = createTestStore()

      function Component() {
        const [state, dispatch] = useHook()

        useEffect(() => {
          const id = setTimeout(() => dispatch({ value: 'New value' }), 1000)
          return () => clearTimeout(id)
        }, [dispatch])

        return <span data-testid="state">{state}</span>
      }

      const { getByTestId } = render(
        <Provider>
          <Component />
        </Provider>
      )

      // Test initial value
      expect(getNodeText(getByTestId('state'))).toBe('Initial value')

      act(() => {
        jest.runAllTimers()
      })

      // The state value changes to the new value
      expect(getNodeText(getByTestId('state'))).toBe('New value')
    })
  })

  describe('when used outside of the Provider', () => {
    it('throws an error', () => {
      console.error = jest.fn()
      const { useHook } = createTestStore()

      function Component() {
        useHook()
        return <span />
      }

      expect(() => render(<Component />)).toThrow(PROVIDER_ERROR)
    })
  })
})

describe('useDispatchOnly', () => {
  describe('when state changes', () => {
    it('does not re-render', () => {
      const { Provider, useHook } = createTestStore()

      function StateComponent() {
        const [state] = useHook()
        return <span data-testid="state">{state}</span>
      }

      function DispatchComponent() {
        const dispatch = useHook.useDispatchOnly()
        const renderCounter = useRef(0)

        // Increment the counter ref to keep track of how many times the
        // component has rendered
        renderCounter.current++

        useEffect(() => {
          const id = setTimeout(() => dispatch({ value: 'New value' }), 1000)
          return () => clearTimeout(id)
        }, [dispatch])

        return <p data-testid="counter">{renderCounter.current}</p>
      }

      const { getByTestId } = render(
        <Provider>
          <StateComponent />
          <DispatchComponent />
        </Provider>
      )

      // Test initial value and render count
      expect(getNodeText(getByTestId('state'))).toBe('Initial value')
      expect(getNodeText(getByTestId('counter'))).toBe('1')

      act(() => {
        jest.runAllTimers()
      })

      // The state value in the state component should change but the render
      // counter in the dispatch only component should not change
      expect(getNodeText(getByTestId('state'))).toBe('New value')
      expect(getNodeText(getByTestId('counter'))).toBe('1')
    })
  })

  describe('when used outside of the Provider', () => {
    it('throws an error ', () => {
      console.error = jest.fn()
      const { useHook } = createTestStore()

      function Component() {
        useHook.useDispatchOnly()
        return <span />
      }

      expect(() => render(<Component />)).toThrow(PROVIDER_ERROR)
    })
  })
})

describe('InvalidReducerAction', () => {
  it('creates a custom error instance', () => {
    const exception = new InvalidReducerAction('INVALID')

    expect(exception).toBeInstanceOf(Error)
    expect(exception).toBeInstanceOf(InvalidReducerAction)
    expect(exception.name).toBe('InvalidReducerAction')
    expect(exception.message).toBe('Invalid action type: INVALID.')
  })
})
