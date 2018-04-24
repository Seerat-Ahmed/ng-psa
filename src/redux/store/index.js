import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { routerReducer as router, RouterState } from 'react-router-redux';
import logger from 'redux-logger';

import initialState from '../InitialState';
import rootReducer from '../reducers/';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (state) => {

  const composeEnhancers = (
    process.env.NODE_ENV === 'development' &&
    window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) || compose;

  // compose enhancers
  const enhancer = composeEnhancers(
    applyMiddleware(logger, sagaMiddleware)
  );

  const createdStore = createStore(
    rootReducer,
    enhancer
  );

  sagaMiddleware.run(rootSaga);
  return createdStore;
};

// pass an optional param to rehydrate state on app start
const store = configureStore(initialState);

// export store singleton instance
export default store;
