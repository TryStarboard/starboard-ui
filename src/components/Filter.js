import React, {Component} from 'react';
import {observe}          from 'redux-react-observable';
import {removeFilter}     from '../actions';

export default observe(
  ({tagId}) => ({tag: ['tagsById', tagId]}),
  class FilterBar extends Component {
    render() {
      const {
        tagId: id,
        tag: {background_color, foreground_color, text} = {},
      } = this.props;

      const style = {
        backgroundColor: background_color,
        color: foreground_color,
      };

      return (
        <div className='filters__tag' style={style} onClick={() => removeFilter(id)}>{text}</div>
      );
    }
  }
);
