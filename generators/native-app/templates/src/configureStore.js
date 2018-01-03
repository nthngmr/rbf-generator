import reducer from './reducers';

import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const middleware = [thunk, logger];

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

window.store = store;

export default store;
