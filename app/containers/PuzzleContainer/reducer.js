/*
 *
 * PuzzleContainer reducer
 *
 */

import { fromJS } from 'immutable';

import { ENTITIES_LOADED } from 'entities/constants';
import { PUZZLE_SELECTED } from './constants';

export const initialState = fromJS({
  activePuzzleId: 'puzzle_id_1',
  puzzleIds: ['puzzle_id_1'],
});

function puzzleContainerReducer(state = initialState, action) {
  switch (action.type) {
    case ENTITIES_LOADED:
      return state.update('puzzleIds', puzzleIds => [
        ...puzzleIds,
        ...Object.keys(action.entities.puzzles),
      ]);
    case PUZZLE_SELECTED:
      return state.set('activePuzzleId', action.id);
    default:
      return state;
  }
}

export default puzzleContainerReducer;
