import React, {Component}      from 'react';
import {connect}               from 'react-redux';
import {DragDropContext}       from 'react-dnd';
import HTML5Backend            from 'react-dnd-html5-backend';
import {getCurrentUser}        from '../actions';
import Sidebar                 from './Sidebar';
import UserProfile             from './UserProfile';
import TagsSideBar             from './TagsSideBar';
import ReposList               from './ReposList';
import RepoTagDragLayer        from './RepoTagDragLayer';

class App extends Component {
  componentDidMount() {
    getCurrentUser();
  }

  render() {
    const {routes} = this.props;

    if (routes.root.dashboard) {
      return (
        <div className='app__inside'>
          <Sidebar/>
          <TagsSideBar/>
          <ReposList/>
          <RepoTagDragLayer/>
        </div>
      );
    } else if (routes.root.user_profile) {
      return (
        <div className='app__inside'>
          <Sidebar/>
          <UserProfile/>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default connect(
  ({routes}) => ({routes}),
  null,
  null,
  {pure: true}
)(DragDropContext(HTML5Backend)(App));
