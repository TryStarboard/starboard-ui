import React, {Component} from 'react'
import classnames from 'classnames'
import {DropTarget} from 'react-dnd'
import {deleteTag} from '../actions'

class DeleteZone extends Component {
  render() {
    const {isOver, connectDropTarget} = this.props
    return connectDropTarget(
      <div className={classnames('dashboard__tags-input-delete-zone', {
        'dashboard__tags-input-delete-zone--over': isOver
      })}></div>
    )
  }
}

export default DropTarget(
  'TAG',
  {
    drop(props, monitor) {
      deleteTag(monitor.getItem())
    }
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  })
)(DeleteZone)
