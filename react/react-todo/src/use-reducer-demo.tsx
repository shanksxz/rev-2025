import { useReducer } from "react";

interface State {
  count: number;
}

interface Action {
  type: 'increment' | 'decrement';
}

function reducer(state: State, action: Action) {
  // make copy of that state
  // make changes
  // apply these changes to original state and return
  const { type } = action;
  switch (type) {
    case "increment":
      return { ...state, count: state.count + 1 }
    case "decrement":
      return { ...state, count: state.count - 1 }
    default:
      return state;
  }
}

export default function Demo() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <div>
      <div>Count: {state.count}</div>
      <button onClick={() => dispatch({ type: 'decrement' })}>decrement</button>
      <button onClick={() => dispatch({ type: 'increment' })}>increment</button>
    </div>
  )
}
