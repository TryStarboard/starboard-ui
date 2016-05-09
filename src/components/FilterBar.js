import React, {Component} from 'react';
import {observe}          from 'redux-react-observable';
import Filter             from './Filter';

export default observe(
  () => ({filters: ['filters']}),
  class FilterBar extends Component {
    render() {
      return (
        <div className='dashboard__filters filters'>
          {this.props.filters.map((tagId) => <Filter tagId={tagId} key={tagId}/>)}
        </div>
      );
    }
  }
);
