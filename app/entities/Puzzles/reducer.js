import { fromJS } from 'immutable';
import { ENTITIES_LOADED } from 'entities/constants';
const initialState = fromJS({});

export default function(state = initialState, action) {
  switch (action.type) {
    case ENTITIES_LOADED:
      return state.merge(action.entities.puzzles);
    default:
      return state;
  }
}
