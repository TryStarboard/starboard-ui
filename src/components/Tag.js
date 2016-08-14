import React, {Component} from 'react'
import {DragSource} from 'react-dnd'
import {beginDragTag, endDragTag, selectTag} from '../actions'

class Tag extends Component {
  render() {
    const {
      isDragging,
      connectDragSource,
      tag: {id, text, foreground_color, background_color} = {}
    } = this.props

    const style = {
      backgroundColor: background_color,
      color: foreground_color,
      opacity: isDragging ? 0.5 : 1
    }

    return connectDragSource(
      <div className='tag' style={style} onClick={() => selectTag(id)}>
        {text}
      </div>
    )
  }
}

export default DragSource(
  'TAG',
  {
    beginDrag(props) {
      beginDragTag()
      return {tagId: props.tag.id}
    },
    endDrag() {
      endDragTag()
    }
  },
  (connector, monitor) => ({
    connectDragSource: connector.dragSource(),
    isDragging: monitor.isDragging()
  })
)(Tag)
