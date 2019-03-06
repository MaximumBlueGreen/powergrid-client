/*
 *
 * WordListContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {} from './constants';
import { ENTITIES_LOADED } from 'entities/constants';

export const initialState = fromJS({
  entryIds: [],
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
    default:
      return state;
  }
}

export default wordlistContainerReducer;
