// reducers.js

import { combineReducers } from 'redux';
import moviesReducer from './moviesReducer'; // Import the movies reducer

// Combine multiple reducers (you can add more reducers as your app grows)
const rootReducer = combineReducers({
  movieCategory: moviesReducer,
});

export default rootReducer;
