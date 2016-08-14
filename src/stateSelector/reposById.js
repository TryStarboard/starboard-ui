import {createSelector} from 'reselect'
import {prop, map} from 'ramda'
import u from 'updeep'
import {assignDefaultColorToTag} from './Utils'

export default createSelector(
  prop('reposById'),
  prop('tagsById'),
  (reposById, tagsById) => {
    return map(
      u({
        tags: map((tagId) => {
          const tag = tagsById[tagId]
          return tag ? assignDefaultColorToTag(tag) : {}
        })
      }),
      reposById
    )
  }
)
