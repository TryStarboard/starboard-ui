import React, {Component} from 'react';
import Filter             from './Filter';

export default class FilterBar extends Component {
  render() {
    return (
      <div className='dashboard__filters filters'>
        {this.props.filters.map((filter, index) => {
          return <Filter filter={filter} index={index} key={index}/>;
        })}
      </div>
    );
  }
}
