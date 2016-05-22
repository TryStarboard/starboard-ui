import React, {Component} from 'react';
import {connect}          from 'react-redux';
import classnames         from 'classnames';
import {Grid, AutoSizer}  from 'react-virtualized';
import {getAllRepos}      from '../actions';
import Repo               from './Repo';
import FilterBar          from './FilterBar';

class ReposListContent extends Component {
  render() {
    return (
      <AutoSizer>
        {({height, width}) => {
          const columnCount = Math.floor(width / 290);
          const rowCount = Math.ceil(this.props.repos.length / columnCount);

          const cellRenderer = ({columnIndex, rowIndex}) => {
            const index = rowIndex * columnCount + columnIndex;
            if (index >= this.props.repos.length) {
              return null;
            }
            const repoId = this.props.repos[index];
            return <Repo id={repoId} key={repoId}/>;
          };

          return (
            <Grid
              columnWidth={290}
              columnCount={columnCount}
              rowHeight={200}
              rowCount={rowCount}
              width={width}
              height={height}
              cellRenderer={cellRenderer}
            />
          );
        }}
      </AutoSizer>
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
