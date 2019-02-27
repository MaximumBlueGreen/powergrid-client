import { fromJS } from 'immutable';
import { times } from 'lodash';
import { ENTITIES_LOADED } from 'entities/constants';
const initialState = fromJS({
  puzzle_id_1: {
    id: 'puzzle_id_1',
    squares: times(225, String),
    size: {
      height: 15,
      width: 15,
    },
  },
});

export default function(state = initialState, action) {
  switch (action.type) {
    case ENTITIES_LOADED:
      return state.merge(action.entities.puzzles);
    default:
      return state;
  }
}
