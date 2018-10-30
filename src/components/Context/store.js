import {
  createStore,
  applyMiddleware
} from 'redux';

import rootReducer from './reducers/index';

const store = createStore(rootReducer);

// const store = createStore(combineReducers({
//   existing: existingReducer,
//   foo: fooReducer,
//   bar: barReducer,

//   // Make sure to specify the key as the second argument, so that RRF
//   // knows where the form and model reducers exist in the store!
//   myForms: combineForms({
//     user: initialUserState,
//   }, 'myForms'),
// }));

export default store;
