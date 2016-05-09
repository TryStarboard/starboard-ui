import React, {Component} from 'react';
import {Switch, Case, Default} from 'react-switch-path';
import {observe} from 'redux-react-observable';
import Inside from './Inside';
import Dashboard from './Dashboard';
import UserProfile from './UserProfile';

export default observe(
  () => ({routes: ['routes']}),
  class App extends Component {
    render() {
      return (
        <Switch object={this.props.routes.root}>
          <Default component={Inside}>
            <Case path='dashboard' component={Dashboard}/>
            <Case path='user_profile' component={UserProfile}/>
          </Default>
        </Switch>
      );
    }
  }
);
