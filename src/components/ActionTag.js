import React, {Component} from 'react';
import {addTag} from '../actions';

export default class ActionTag extends Component {
  render() {
    const {text} = this.props;

    return (
      <div className='tag tag--action' onClick={addTag}>
        Click to add a tag: {text}
      </div>
    );
  }
}
