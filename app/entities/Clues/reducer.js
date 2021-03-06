import { fromJS } from 'immutable';
import { ENTITIES_LOADED } from 'entities/constants';
import { CLUE_UPDATED } from 'entities/Clues/constants';
const initialState = fromJS({});

export default function(state = initialState, action) {
  switch (action.type) {
    case CLUE_UPDATED:
      return state.set(
        `${action.puzzleId}-${action.number}-${
          action.across ? 'Across' : 'Down'
        }`,
        fromJS({
          id: `${action.puzzleId}-${action.number}-${
            action.across ? 'Across' : 'Down'
          }`,
          text: action.text,
        }),
      );
    case ENTITIES_LOADED:
      return state.merge(action.entities.clues);
    default:
      return state;
  }
}
