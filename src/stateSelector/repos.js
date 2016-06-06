import {createSelector} from 'reselect';
import {prop, pipe, map, values, filter, contains, sortBy, reverse, allPass, any} from 'ramda';
import {TAG_FILTER} from '../const/FILTER_TYPES';

export default createSelector(
  prop('filters'),
  prop('reposById'),
  (filters, reposById) => {
    const isPassAllFilter = allPass(filters.map((filterObj) => {
      if (filterObj.type === TAG_FILTER) {
        return pipe(prop('tags'), contains(filterObj.tagId));
      } else {
        return ({full_name, description, tags}) => {
          return full_name.indexOf(filterObj.text) > -1 ||
            (description && description.indexOf(filterObj.text) > -1) ||
            any(contains(filterObj.text), tags);
        };
      }
    }));

    return pipe(
      values,
      filter(isPassAllFilter),
      sortBy(prop('starred_at')),
      reverse,
      map(prop('id'))
    )(reposById);
  }
);
