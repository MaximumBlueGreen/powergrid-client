/*
 *
 * PuzzleContainer reducer
 *
 */

import { fromJS } from 'immutable';

import { ENTITIES_LOADED } from 'entities/constants';
import { PUZZLE_SELECTED } from './constants';

export const initialState = fromJS({
  activePuzzleId: undefined,
  puzzleIds: [],
});

function puzzleContainerReducer(state = initialState, action) {
  switch (action.type) {
    case ENTITIES_LOADED: {
      const puzzleIds = Object.keys(action.entities.puzzles || {});
      return state
        .set('puzzleIds', fromJS(puzzleIds))
        .set('activePuzzleId', puzzleIds[0]);
    }
    case PUZZLE_SELECTED:
      return state.set('activePuzzleId', action.id);
    default:
      return state;
  }
}

export default puzzleContainerReducer;
