import { fromJS } from 'immutable';
import { ENTITIES_LOADED } from 'entities/constants';
import { ENTRY_UPDATED } from 'entities/Entries/constants';
/* TODO use default word list */
const initialState = fromJS({});

export default function(state = initialState, action) {
  switch (action.type) {
    case ENTRY_UPDATED:
      return state.mergeIn([action.id], action.entry);
    case ENTITIES_LOADED:
      return state.merge(action.entities.entries);
    default:
      return state;
  }
}
