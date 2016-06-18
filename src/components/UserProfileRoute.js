import React, {Component} from 'react';
import Sidebar              from './Sidebar';
import UserProfile             from './UserProfile';

export default class UserProfileRoute extends Component {
  render() {
    return (
      <div className='app__inside'>
        <Sidebar/>
        <UserProfile/>
      </div>
    );
  }
}
