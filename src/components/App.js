import React                   from 'react';
import {connect}               from 'react-redux';
import {Switch, Case, Default} from 'react-switch-path';
import Inside                  from './Inside';
import Dashboard               from './Dashboard';
import UserProfile             from './UserProfile';

const App = (props) => {
  return (
    <Switch object={props.routes.root}>
      <Default component={Inside}>
        <Case path='dashboard' component={Dashboard}/>
        <Case path='user_profile' component={UserProfile}/>
      </Default>
    </Switch>
  );
};

export default connect(
  ({routes}) => ({routes}),
  null,
  null,
  {pure: true}
)(App);
