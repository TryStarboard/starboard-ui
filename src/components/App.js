import React, {Component} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import store from '../store';
import {getCurrentUser} from '../actions';

import Dashboard from './Dashboard';
import UserProfileRoute from './UserProfileRoute';

const history = syncHistoryWithStore(browserHistory, store);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path='/' onEnter={() => getCurrentUser()}>
            <Route path='/dashboard' component={Dashboard}/>
            <Route path='/user-profile' component={UserProfileRoute}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
