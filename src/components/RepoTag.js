import React, {Component} from 'react';
import {DragSource}       from 'react-dnd';
import classnames         from 'classnames';
import {observe}          from 'redux-react-observable';
import {removeRepoTag}    from '../actions';

const {pow, sqrt} = Math;

class RepoTag extends Component {
  render() {
    const {
      connectDragSource,
      isDragging,
      tag: {background_color, foreground_color, text} = {},
    } = this.props;

    const style = {
      backgroundColor: background_color,
      color: foreground_color,
    };

    return connectDragSource(
      <li
        className={classnames('repo__tag', {'repo__tag--dragging': isDragging})}
        style={style}>
        {text}
      </li>
    );
  }
}

export default observe(
  ({tagId}) => ({tag: ['tagsById', tagId]}),
  DragSource(
    'REPO_TAG',
    {
      beginDrag({tagId, repoId}) {
        return {tag_id: tagId, repo_id: repoId};
      },
      endDrag(props, monitor) {
        const {x, y} = monitor.getDifferenceFromInitialOffset();
        const shouldRemoveTag = sqrt(pow(x, 2) + pow(y, 2)) > 200;
        if (shouldRemoveTag) {
          removeRepoTag(monitor.getItem());
        }
      },
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  )(RepoTag)
);
