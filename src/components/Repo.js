import React, {Component} from 'react'
import {connect} from 'react-redux'
import {DropTarget} from 'react-dnd'
import classnames from 'classnames'
import {equals} from 'ramda'
import {applyTagToRepo} from '../actions'
import RepoTag from './RepoTag'

class Repo extends Component {
  shouldComponentUpdate({isOver, repo}) {
    return isOver !== this.props.isOver || !equals(repo, this.props.repo)
  }

  render() {
    const {
      id: repoId,
      isOver,
      connectDropTarget,
      repo: {full_name, description, html_url: htmlUrl, tags} = {}
    } = this.props

    const [, authorName, repoName] = /(.+)\/(.+)/.exec(full_name)

    let tagsSection = null
    if (tags.length) {
      tagsSection = (
        <ul className="repo__tags">
          {tags.map((tag) => <RepoTag tag={tag} repoId={repoId} key={tag.id}/>)}
        </ul>
      )
    }

    return connectDropTarget(
      <div className={classnames('repo', {'repo--is-tag-over': isOver})}>
        <div className="repo__full-name">
          <a className="repo__name-link" target="_blank" href={htmlUrl}>
            <span className="repo__repo-name">{repoName}</span>
            <span className="repo__author-name"> / {authorName}</span>
          </a>
        </div>
        {tagsSection}
        <div className="repo__desc">{description}</div>
      </div>
    )
  }
}

export default connect(
  (initialState, {id}) => ({reposById}) => ({repo: reposById[id]}),
  null,
  null,
  {pure: true}
)(DropTarget(
  'TAG',
  {
    canDrop(props, monitor) {
      const {tagId} = monitor.getItem()
      return !props.repo.tags.find(({id}) => id === tagId)
    },
    drop(props, monitor) {
      const {tagId} = monitor.getItem()
      applyTagToRepo(tagId, props.id)
    }
  },
  (connector, monitor) => ({
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.canDrop() && monitor.isOver()
  })
)(Repo))
