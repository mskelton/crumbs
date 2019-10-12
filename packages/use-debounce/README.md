# @sage/use-debounce

> React hook to debounce state updates.

## Description

This package is a custom React hook that can be used for debouncing state updates. This is useful when state changes cause large re-renders such as a search box for a long list of items.

Other similar packages exist for debouncing values, such as [Nik Mostovoy's use-debounce][use-debounce] package, but this package aims to be a very lightweight plugin to easily get up and running without adding lots of extra code bloat.

## Installation

```sh
# Yarn
yarn add @sage/use-debounce

# npm
npm install @sage/use-debounce
```

## Usage

```js
import React, { useState } from 'react'
import { useDebounce } from 'use-debounce'

function Input() {
  const [text, setText] = useState('Hello')
  const value = useDebounce(text, 1000)

  return (
    <div>
      <input
        defaultValue={'Hello'}
        onChange={event => setText(event.target.value)}
      />

      <p>Actual value: {text}</p>
      <p>Debounce value: {value}</p>
    </div>
  )
}
```

[use-debounce]: https://github.com/xnimorz/use-debounce
