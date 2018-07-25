import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';

import thunkMiddleware from 'redux-thunk';

import userReducer from './reducers/userReducer';
import postReducer from './reducers/postReducer';
import otherUserReducer from './reducers/otherUserReducer'
import suggestionsReducer from './reducers/suggestionsReducer';

const rootReducer = combineReducers ({
  otherUser: otherUserReducer,
  currentUser: userReducer,
  posts: postReducer,
  suggestions: suggestionsReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware (
    thunkMiddleware
  )
);

store.subscribe(() => {
  console.log(store.getState());
});

export default store;
