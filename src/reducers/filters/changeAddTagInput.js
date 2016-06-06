import u from 'updeep';
import {append, reject, findIndex, propEq} from 'ramda';
import {TEXT_FILTER} from '../../const/FILTER_TYPES';

export default function changeAddTagInput(state, payload) {
  if (payload) {
    const filterIndex = findIndex(propEq('type', TEXT_FILTER), state);

    if (filterIndex === -1) {
      return append({type: TEXT_FILTER, text: payload}, state);
    } else {
      return u({
        [filterIndex]: {
          text: payload
        }
      }, state);
    }
  } else {
    return reject(propEq('type', TEXT_FILTER), state);
  }
}
