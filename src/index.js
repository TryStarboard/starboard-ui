import React from 'react';
import {render} from 'react-dom';
import 'react-virtualized/styles.css';
import './style/index.scss';
import App from './components/App';

render(React.createElement(App), document.getElementById('app'));
