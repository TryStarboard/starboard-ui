import React, {Component} from 'react'
import classnames from 'classnames'
import {connect} from 'react-redux'
import {getAllTags, changeAddTagInput} from '../actions'
import Tag from './Tag'
import ActionTag from './ActionTag'
import DeleteZone from './DeleteZone'

class TagsSideBar extends Component {
  componentDidMount() {
    getAllTags()
  }

  render() {
    const {isDraggingTag, errorMsg, inputValue} = this.props

    let inputContent

    if (isDraggingTag) {
      inputContent = (
        <div>
          <DeleteZone/>
          <div className='dashboard__tags-input-helper-text'>
            Drag here to delete
          </div>
        </div>
      )
    } else {
      inputContent = (
        <form onSubmit={(event) => event.preventDefault()} autoComplete='off'>
          <input
            type='text'
            name='tag_text'
            className='dashboard__tags-input'
            placeholder='Type to search...'
            value={inputValue}
            onChange={changeAddTagInput}/>
          <div className={classnames('dashboard__tags-input-helper-text', {
            'dashboard__tags-input-helper-text--error': errorMsg
          })}>
            {errorMsg || 'Type anything to search among repos'}
          </div>
        </form>
      )
    }

    return (
      <div className='dashboard__tags app__tags'>
        <div className='dashboard__tags-input-wrapper'>
          {inputContent}
        </div>
        <div className='dashboard__tags-tag-list'>
          {(() => {
            return inputValue ? <ActionTag text={inputValue}/> : null
          })()}
          {this.props.tags.map((tag) => <Tag tag={tag} key={tag.id}/>)}
        </div>
        <div className="dashboard__tags-tip-box">
          <div className="dashboard__tags-tip-box-arrow"></div>
          Drag & drop a tag over a repo to assign tags to repos
        </div>
      </div>
    )
  }
}

export default connect(
  ({tags, ui}) => ({
    tags,
    errorMsg: ui.addTagErrorMsg,
    isDraggingTag: ui.isDraggingTag,
    inputValue: ui.tagInputValue
  }),
  null,
  null,
  {pure: true}
)(TagsSideBar)
