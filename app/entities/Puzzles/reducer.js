import { fromJS } from 'immutable';
import { ENTITIES_LOADED } from 'entities/constants';
import { PUZZLE_TITLE_UPDATED } from './constants';
const initialState = fromJS({});

export default function(state = initialState, action) {
  switch (action.type) {
    case PUZZLE_TITLE_UPDATED:
      return state.setIn([action.id, 'title'], action.title);
    case ENTITIES_LOADED:
      return state.merge(action.entities.puzzles);
    default:
      return state;
  }
}
