// Action types: 'domain/eventName'
export const INCREMENTED = 'counter/incremented'
export const DECREMENTED = 'counter/decremented'
export const RESET = 'counter/reset'

// Action creators
export const increment = (amount) => ({ type: INCREMENTED, payload: amount })
export const decrement = (amount) => ({ type: DECREMENTED, payload: amount })
export const reset = () => ({ type: RESET })

// Selector
export const selectCount = (state) => state.value

const initialState = { value: 0 }

// Pure reducer: only uses state + action, returns a new object (immutable update)
export default function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENTED:
      return { ...state, value: state.value + action.payload }
    case DECREMENTED:
      return { ...state, value: state.value - action.payload }
    case RESET:
      return { ...state, value: 0 }
    default:
      return state
  }
}
