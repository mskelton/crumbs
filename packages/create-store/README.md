# @crumb/create-store

> React context/reducer based state container.

## Description

This package is used to create a context/reducer based state container that can be used for managing React state. It uses React Context to allow components to consume state changes regardless of their location in the render tree.

While you can create stores that contain any type of state, it is recommended to create small, logically separated stores to allow components to consume only the state they need. This will help improve performance by reducing unnecessary re-rendering and it will also improve the maintainability of your application.

## Installation

```sh
# Yarn
yarn add @crumb/create-store

# npm
npm install @crumb/create-store
```

## Basic Usage

The first step to using this crumb is creating your custom reducer and store. The recommended method for using this crumb is to place your types, reducer, and initialized store in a file and export the resulting store provider and custom hook. Components which consume from the store can then easily import the custom hook from the file you create.

All consumers of the store should be descendants of the provider, which can be easily accomplished by simply placing the provider at the top level of your application. Multiple components can consume the store using the custom hook provided by the `createStore` method.

In the following code block, we show a simple example of a reducer that only uses the `type` key from the `action` object. While you may have stores that follow this pattern, you will often need to pass other values to the reducer. These values should be placed in the `action` object as sibling keys of the `type` key.

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
} = createStore<State, Action>(0, 'CountStoreProvider', reducer)

export { CountProvider, useCount }
```

You will notice the use of the `InvalidReducerAction` class at the end of the reducer in the previous block. This is a custom error class provided by this package for use inside your reducers to throw an error message when an action type is invalid. While you are not required to use this in your reducers, we recommend using it to provide simple and consistent error messaging for invalid reducer actions.

After initializing your store, call the custom hook inside the component that will consume from the store. The custom hook will return an array of two values: the current state in the store and the dispatch function used to dispatch reducer actions.

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
