import {
  prop, values, map, pipe, merge, sortBy, reverse, toPairs, fromPairs, contains,
  filter, not, allPass, any, __
} from 'ramda';
import {createSelector}     from 'reselect';
import u                    from 'updeep';
import {DEFAULT_TAG_COLORS} from './const/DEFAULT_TAG_COLORS';
import {TAG_FILTER}         from './reducers/filters/CONST';

// Helpers
//
function createStateTransformer(transforms) {
  const transformPairs = toPairs(transforms);
  return (state) => {
    const newStatePairs = transformPairs.map(([ key, transform ]) => [ key, transform(state) ]);
    return fromPairs(newStatePairs);
  };
}

const assignDefaultColorToTag = (tag) => {
  const colors = DEFAULT_TAG_COLORS[tag.text.toLowerCase()];
  if (!colors) {
    return tag;
  }
  return merge(tag, {
    background_color: colors.bg,
    foreground_color: colors.fg,
  });
};

const selectReposById = createSelector(
  prop('reposById'),
  prop('tagsById'),
  (reposById, tagsById) => {
    return map(
      u({
        tags: map((tagId) => {
          const tag = tagsById[tagId];
          return tag ? assignDefaultColorToTag(tag) : {};
        })
      }),
      reposById
    );
  }
);

const selectRepos = createSelector(
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

const selectTags = createSelector(
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

const selectFilters = createSelector(
  prop('filters'),
  prop('tagsById'),
  (filters, tagsById) => {
    return pipe(
      map((filterObj) => {
        if (filterObj.type === TAG_FILTER) {
          return {
            ...filterObj,
            tag: assignDefaultColorToTag(tagsById[filterObj.tagId]),
          };
        } else {
          return filterObj;
        }
      })
    )(filters);
  }
);

export default createStateTransformer({
  filters: selectFilters,
  reposById: selectReposById,
  repos: selectRepos,
  routes: prop('routes'),
  tags: selectTags,
  ui: prop('ui'),
  user: prop('user'),
});
