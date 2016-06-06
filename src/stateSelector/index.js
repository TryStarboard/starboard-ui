import {prop, toPairs, fromPairs} from 'ramda';
import filters   from './filters';
import reposById from './reposById';
import repos     from './repos';
import tags      from './tags';

function createStateTransformer(transforms) {
  const transformPairs = toPairs(transforms);
  return (state) => {
    const newStatePairs = transformPairs.map(([ key, transform ]) => [ key, transform(state) ]);
    return fromPairs(newStatePairs);
  };
}

export default createStateTransformer({
  filters,
  reposById,
  repos,
  routes: prop('routes'),
  tags,
  ui: prop('ui'),
  user: prop('user'),
});
