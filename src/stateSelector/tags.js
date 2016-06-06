import {createSelector}          from 'reselect';
import {prop, pipe, map, values, filter, contains, __, not, sortBy, reverse} from 'ramda';
import {assignDefaultColorToTag} from './Utils';

export default createSelector(
  prop('filters'),
  prop('tagsById'),
  (filters, tagsById) => {
    return pipe(
      values,
      filter(pipe(
        prop('id'),
        contains(__, filters),
        not
      )),
      sortBy(prop('id')),
      reverse,
      map(assignDefaultColorToTag)
    )(tagsById);
  }
);
