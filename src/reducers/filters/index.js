import u from 'updeep';
import {append, without, reject, equals, find, remove} from 'ramda';
import {
  SELECT_TAG,
  DELETE_TAG,
  REMOVE_FILTER,
  CHNAGE_ADD_TAG_INPUT
} from '../../actions/creators';
import changeAddTagInput from './changeAddTagInput';
import {TAG_FILTER} from '../../const/FILTER_TYPES';

export default function (state = [], {type, payload}) {
  switch (type) {
  case SELECT_TAG:
    return u(
      u.ifElse(
        find(equals({type: TAG_FILTER, tagId: payload.tagId})),
        without([{type: TAG_FILTER, tagId: payload.tagId}]),
        append({type: TAG_FILTER, tagId: payload.tagId})
      ),
      state
    );
  case `${DELETE_TAG}_PENDING`:
    return reject(equals(payload.tagId), state);
  case REMOVE_FILTER:
    return remove(payload.filterIndex, 1, state);
  case CHNAGE_ADD_TAG_INPUT:
    return changeAddTagInput(state, payload);
  default:
    return state;
  }
}
