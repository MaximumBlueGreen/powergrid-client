import { fromJS } from 'immutable';
import { ENTITIES_LOADED } from 'entities/constants';
import { CLUE_UPDATED } from 'entities/Clues/constants';
import { PUZZLE_TITLE_UPDATED, PUZZLE_NOTES_EDITED } from './constants';
const initialState = fromJS({});

export default function(state = initialState, action) {
  switch (action.type) {
    case PUZZLE_TITLE_UPDATED:
      return state.setIn([action.id, 'title'], action.title);
    case PUZZLE_NOTES_EDITED:
      return state.setIn([action.id, 'notes'], action.notes);
    case CLUE_UPDATED:
      return state.setIn(
        [
          action.puzzleId,
          'clues',
          action.across ? 'across' : 'down',
          action.number,
        ],
        `${action.puzzleId}-${action.number}-${
          action.across ? 'Across' : 'Down'
        }`,
      );
    case ENTITIES_LOADED:
      return state.merge(action.entities.puzzles);
    default:
      return state;
  }
}
