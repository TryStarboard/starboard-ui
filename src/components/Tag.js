import React, {Component} from 'react';
import {DragSource} from 'react-dnd';
import {observe} from 'redux-react-observable';
import {beginDragTag, endDragTag, selectTag} from '../actions';

class Tag extends Component {
  render() {
    const {
      id,
      isDragging,
      connectDragSource,
      tag: {text, foreground_color, background_color, isSelected} = {}
    } = this.props;

    const style = {
      backgroundColor: background_color,
      color: foreground_color,
      opacity: isDragging ? 0.5 : 1,
      transform: isSelected ? 'scale(0.8)' : null,
    };

    return connectDragSource(
      <div className='tag' style={style} onClick={() => selectTag(id)}>
        {text}
      </div>
    );
  }
}

export default observe(
  ({id}) => ({tag: ['tagsById', id]}),
  DragSource(
    'TAG',
    {
      beginDrag(props) {
        beginDragTag();
        return {tagId: props.id};
      },
      endDrag() {
        endDragTag();
      },
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(Tag)
);
