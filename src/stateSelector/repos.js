import {createSelector} from 'reselect';
import {prop, pipe, map, values, filter, contains, sortBy, reverse, allPass,
  any, test} from 'ramda';
import {TAG_FILTER} from '../const/FILTER_TYPES';

function escapeStringForRegex(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export default createSelector(
  prop('filters'),
  prop('reposById'),
  prop('tagsById'),
  (filters, reposById, tagsById) => {
    const isPassAllFilter = allPass(filters.map((filterObj) => {
      if (filterObj.type === TAG_FILTER) {
        return pipe(prop('tags'), contains(filterObj.tagId));

      } else {
        return ({full_name, description, tags}) => {
          const regex = new RegExp(escapeStringForRegex(filterObj.text), 'i');

          return regex.test(full_name) ||
            (description && regex.test(description)) ||
            any(pipe(
              (tagId) => tagsById[tagId],
              prop('text'),
              test(regex)
            ), tags);
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
