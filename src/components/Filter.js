import React from 'react';
import {removeFilter} from '../actions';

const Filter = (props) => {
  const {
    tag: {id, background_color, foreground_color, text} = {},
  } = this.props;

  const style = {
    backgroundColor: background_color,
    color: foreground_color,
  };

  return (
    <div className='filters__tag' style={style} onClick={() => removeFilter(id)}>{text}</div>
  );
};

export {Filter as default};
