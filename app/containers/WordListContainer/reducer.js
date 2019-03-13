/*
 *
 * WordListContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { ENTITIES_LOADED } from 'entities/constants';
import { FILTER_PATTERN_UPDATED } from './constants';

export const initialState = fromJS({
  entryIds: [],
  filterPattern: '',
});

function wordlistContainerReducer(state = initialState, action) {
  switch (action.type) {
    case ENTITIES_LOADED: {
      if (action.entities.entries) {
        const entryIds = Object.keys(action.entities.entries);
        return state.set('entryIds', fromJS(entryIds));
      }
      return state;
    }
    case FILTER_PATTERN_UPDATED:
      return state.set('filterPattern', action.pattern);
    default:
      return state;
  }
}

export default wordlistContainerReducer;
