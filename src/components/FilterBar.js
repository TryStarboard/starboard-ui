import React, {Component} from 'react';
import Filter             from './Filter';

export default class FilterBar extends Component {
  render() {
    return (
      <div className='dashboard__filters filters'>
        {this.props.filters.map((tag) => <Filter tag={tag} key={tag.id}/>)}
      </div>
    );
  }
}
