import { fromJS } from 'immutable';
import { ENTITIES_LOADED } from 'entities/constants';
import { CLUE_UPDATED } from 'entities/Clues/constants';
import { PUZZLE_DELETED } from 'containers/DeletePuzzleModal/constants';
import {
  PUZZLE_TITLE_UPDATED,
  PUZZLE_NOTES_EDITED,
  PUZZLE_SYMMETRY_SET,
} from './constants';
const initialState = fromJS({});

export default function(state = initialState, action) {
  switch (action.type) {
    case PUZZLE_TITLE_UPDATED:
      return state.setIn([action.id, 'title'], action.title);
    case PUZZLE_NOTES_EDITED:
      return state.setIn([action.id, 'notes'], action.notes);
    case PUZZLE_SYMMETRY_SET:
      return state.setIn([action.id, 'symmetry'], action.symmetry);
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
    case PUZZLE_DELETED:
      return state.delete(action.id);
    default:
      return state;
  }
}
