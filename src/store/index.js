import { legacy_createStore as createStore } from 'redux'
import counterReducer from './counterReducer'

// Same as tutorial's `Redux.createStore(counterReducer)`;
// `legacy_` alias only hides the "use Redux Toolkit" deprecation hint.
const store = createStore(counterReducer)

export default store
