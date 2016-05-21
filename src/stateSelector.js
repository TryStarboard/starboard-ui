import {prop, values, map, pipe, merge, sortBy, reverse, toPairs, fromPairs, contains, filter, all, not, __} from 'ramda';
import {createSelector}     from 'reselect';
import u                    from 'updeep';
import {DEFAULT_TAG_COLORS} from './const/DEFAULT_TAG_COLORS';

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
    return pipe(
      values,
      filter(pipe(
        prop('tags'),
        (tags) => all(contains(__, tags), filters)
      )),
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
      map((tagId) => tagsById[tagId])
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
