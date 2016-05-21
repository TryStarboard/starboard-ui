import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import './style/index.scss';
import store from './store';
import App from './components/App';

render(
  React.createElement(Provider, {store},
    React.createElement(App)),
  document.getElementById('app'));
