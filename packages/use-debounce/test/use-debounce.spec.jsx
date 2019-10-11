import { getNodeText, render } from '@testing-library/react'
import React from 'react'
import { useDebounce } from '../src'

jest.useFakeTimers()

describe('useDebounce', () => {
  it('put initialized value in first render', () => {
    function Component () {
      const value = useDebounce('Hello world', 1000)
      return <span data-testid="value">{value}</span>
    }

    const { getByTestId } = render(<Component />)
    expect(getNodeText(getByTestId('value'))).toBe('Hello world')
  })
})
