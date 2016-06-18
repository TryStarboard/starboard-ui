/*eslint no-process-env:0*/
/*global process, require*/

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk             from 'redux-thunk';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import {browserHistory} from 'react-router';
import stateSelector     from './stateSelector';
import filters           from './reducers/filters';
import reposById         from './reducers/reposById';
import tagsById          from './reducers/tagsById';
import ui                from './reducers/ui';
import user              from './reducers/user';

// Reducer
// --------------------

const reducers = combineReducers({
  filters,
  reposById,
  tagsById,
  ui,
  user,
  routing: routerReducer,
});

// Enhancer
// --------------------

const middlewares = [
  promiseMiddleware(),
  thunk,
  routerMiddleware(browserHistory),
];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(require('redux-logger')());
}

function applyTransformState(transform) {
  return (_createStore) => (reducer, initialState, enhancer) => {
    const store = _createStore(reducer, initialState, enhancer);
    return {
      ...store,
      getState: () => transform(store.getState())
    };
  };
}

// Store
// --------------------

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(...middlewares),
    applyTransformState(stateSelector)
  )
);

// if (process.env.NODE_ENV !== 'production') {
//   const reduxDevtool =
//     typeof window.devToolsExtension !== 'undefined' ?
//       window.devToolsExtension() : identity;
//   createStoreWithMiddleware = compose(middleware, reduxDevtool)(createStore);
// } else {
//   createStoreWithMiddleware = compose(middleware)(createStore);
// }

export {store as default};
