import { act, fireEvent, getNodeText, render } from '@testing-library/react'
import React, { useEffect, useRef } from 'react'
import { createStore, InvalidReducerAction } from '../src'

jest.useFakeTimers()

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
  it('re-renders the component when state changes', () => {})
})

describe('useDispatchOnly', () => {
  it("doesn't re-render when state changes", () => {
    const { Provider, useHook } = createStore(
      'Initial value',
      'TestProvider',
      (_, action) => action.value
    )

    function StateComponent() {
      const [state] = useHook()
      return <span data-testid="value">{state}</span>
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
    expect(getNodeText(getByTestId('value'))).toBe('Initial value')
    expect(getNodeText(getByTestId('counter'))).toBe('1')

    act(() => {
      jest.runAllTimers()
    })

    // The state value in the state component should change but the render
    // counter in the dispatch only component should not change
    expect(getNodeText(getByTestId('value'))).toBe('New value')
    expect(getNodeText(getByTestId('counter'))).toBe('1')
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
