import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import createSagaMiddleware, { END } from 'redux-saga';
import logger from 'redux-logger';
import Root from './root';
import './index.less';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, logger),
);
store.runSaga = sagaMiddleware.run;
store.close = () => store.dispatch(END);

store.runSaga(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('app')
);

export default store;
