import React from 'react';
import {TAG_FILTER} from '../reducers/filters/CONST';
import {removeFilter} from '../actions';

const Filter = ({filter, index}) => {
  if (filter.type === TAG_FILTER) {
    const {background_color, foreground_color, text} = filter.tag;

    const style = {
      backgroundColor: background_color,
      color: foreground_color,
    };

    return (
      <div className='filters__tag' style={style} onClick={() => removeFilter(index)}>
        Tag: {text}
      </div>
    );
  } else {
    return (
      <div className='filters__tag' onClick={() => removeFilter(index)}>
        Text: {filter.text}
      </div>
    );
  }
};

export {Filter as default};
