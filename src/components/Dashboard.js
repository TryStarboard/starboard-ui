import React, {Component} from 'react'
import Sidebar from './Sidebar'
import TagsSideBar from './TagsSideBar'
import ReposList from './ReposList'
import RepoTagDragLayer from './RepoTagDragLayer'

export default class Dashboard extends Component {
  render() {
    return (
      <div className='app__inside'>
        <Sidebar/>
        <TagsSideBar/>
        <ReposList/>
        <RepoTagDragLayer/>
      </div>
    )
  }
}
