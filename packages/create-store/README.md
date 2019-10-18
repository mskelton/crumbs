# @crumb/create-store

> React context/reducer based state container.

## Description

This package is used

## Installation

```sh
# Yarn
yarn add @crumb/create-store

# npm
npm install @crumb/create-store
```

## Usage

The first step to using this crumb is creating your custom reducer and store. The recommended method for using this crumb is to place your types, reducer, and initialized store in a file and export the store provider and custom hook. Components which consume from the store can then easily import the custom hook from the file you create.

All consumers of the store should be descendants of the provider, which can be easily accomplished by simply placing the provider at the top level of your application. Multiple components can consume the store using the custom hook provided by the `createStores` method.

```ts
// count-store.ts
import { createStore, InvalidReducerAction } from '@crumb/create-store'

type State = number

interface Action {
  type: 'INCREMENT' | ...
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1

    ...
  }

  throw new InvalidReducerAction(action.type)
}

const {
  Provider: CountProvider,
  useHook: useCount
} = createStore<State, Action>('', 'CountStoreProvider', reducer)
```

Then, call the custom hook inside the component that consumes from the store. The custom hook will return an array of two values: the current state in the store and the dispatch function used to dispatch reducer actions.

```js
// component.js
import { useCount } from './create-store'

function Component() {
  const [state, dispatch] = useCount()
  ...
}
```

## `useDispatchOnly`

The custom hook returned by the `createStore` function returns both the state and the dispatch function. However, in cases where you need to dispatch actions without caring about the current state, you can improve performance by using the `useDispatchOnly` custom hook. This will only return the dispatch function and will not trigger re-renders when the state changes.

```js
// component.js
import { useCount } from './create-store'

function Component() {
  const dispatch = useCount.useDispatchOnly()
  ...
}
```
