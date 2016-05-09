import React from 'react';
import {render} from 'react-dom';
import Bluebird from 'bluebird';
import {StoreObserverProvider} from 'redux-react-observable';
import './style/index.scss';
import store from './store';
import App from './components/App';

window.Promise = Bluebird;

render(
  <StoreObserverProvider store={store}>
    <App/>
  </StoreObserverProvider>,
  document.getElementById('app')
);
