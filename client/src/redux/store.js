import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';

import thunkMiddleware from 'redux-thunk';

import userReducer from './reducers/userReducer';
import postReducer from './reducers/postReducer';

const rootReducer = combineReducers ({
  currentUser: userReducer,
  posts: postReducer,
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
