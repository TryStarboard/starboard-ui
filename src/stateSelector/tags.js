import {prop, pipe, pluck, values, filter, contains, __, not, sortBy, reverse,
  propEq, map} from 'ramda';
import {createSelector}          from 'reselect';
import {TAG_FILTER}              from '../const/FILTER_TYPES';
import {assignDefaultColorToTag} from './Utils';

export default createSelector(
  prop('filters'),
  prop('tagsById'),
  (filters, tagsById) => {
    const selectedTagIds = pipe(
      filter(propEq('type', TAG_FILTER)),
      pluck('tagId')
    )(filters);

    return pipe(
      values,
      filter(pipe(
        prop('id'),
        contains(__, selectedTagIds),
        not
      )),
      sortBy(prop('updated_at')),
      reverse,
      map(assignDefaultColorToTag)
    )(tagsById);
  }
);
