import React, {Component} from 'react';
import {connect}          from 'react-redux';
import classnames         from 'classnames';
import {getAllRepos}      from '../actions';
import Repo               from './Repo';
import FilterBar          from './FilterBar';

class ReposListContent extends Component {
  render() {
    return (
      <div className='dashboard__repos-list-inner'>
        {this.props.repos.map((id) => <Repo id={id} key={id}/>)}
      </div>
    );
  }
}

class ReposList extends Component {
  componentDidMount() {
    getAllRepos();
  }

  render() {
    return (
      <div className='dashboard__repos'>
        <FilterBar filters={this.props.filters}/>
        <div className={classnames('dashboard__repos-list', {
          'dashboard__repos-list--no-filter': this.props.filters.length === 0,
        })}>
          <ReposListContent repos={this.props.repos}/>
        </div>
      </div>
    );
  }
}

export default connect(
  ({repos, filters}) => ({repos, filters}),
  null,
  null,
  {pure: true}
)(ReposList);
