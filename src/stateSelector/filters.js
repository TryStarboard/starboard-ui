import {createSelector} from 'reselect'
import {prop, pipe, map} from 'ramda'
import {assignDefaultColorToTag} from './Utils'
import {TAG_FILTER} from '../const/FILTER_TYPES'

export default createSelector(
  prop('filters'),
  prop('tagsById'),
  (filters, tagsById) => {
    return pipe(
      map((filterObj) => {
        if (filterObj.type === TAG_FILTER) {
          return {
            ...filterObj,
            tag: assignDefaultColorToTag(tagsById[filterObj.tagId])
          }
        } else {
          return filterObj
        }
      })
    )(filters)
  }
)
