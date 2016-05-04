import React from 'react';
import {render} from 'react-dom';
import Bluebird from 'bluebird';
import './style/index.scss';
import App from './components/App';

window.Promise = Bluebird;

render(React.createElement(App), document.getElementById('app'));
