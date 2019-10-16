import React, {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  Reducer,
  Dispatch,
} from 'react'

interface ProviderProps {
  children: ReactNode
}

export class InvalidReducerAction extends Error {
  constructor(actionType: string) {
    super(`Invalid action type: ${actionType}.`)

    this.name = 'InvalidReducerAction'
  }
}

export function createStore<State, Action>(
  initialState: State,
  providerDisplayName: string,
  reducer: (state: State, action: Action) => State
) {
  const StateContext = createContext(initialState)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const DispatchContext = createContext<Dispatch<Action>>(null!)

  function Provider({ children }: ProviderProps) {
    const [state, dispatch] = useReducer<Reducer<State, Action>>(
      reducer,
      initialState
    )

    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </StateContext.Provider>
    )
  }

  Provider.displayName = providerDisplayName

  function useHook(): [State, Dispatch<Action>] {
    const state = useContext(StateContext)
    const dispatch = useContext(DispatchContext)

    return [state, dispatch]
  }

  useHook.useDispatchOnly = function useDispatchOnly() {
    return useContext(DispatchContext)
  }

  return { Provider, useHook }
}
