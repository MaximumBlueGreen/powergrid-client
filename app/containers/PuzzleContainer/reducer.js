/*
 *
 * PuzzleContainer reducer
 *
 */

import { fromJS } from 'immutable';

import { ENTITIES_LOADED } from 'entities/constants';
import { PUZZLE_SAVED, PUZZLE_SAVED_SUCCESS, PUZZLE_LOADED } from './constants';

export const initialState = fromJS({
  puzzleId: undefined,
  lastSynced: Date.now(),
  isSyncing: false,
  loading: true,
});

function puzzleContainerReducer(state = initialState, action) {
  switch (action.type) {
    case ENTITIES_LOADED: {
      if (action.entities.puzzles) {
        return state
          .update(
            'puzzleId',
            puzzleId => action.puzzleId || puzzleId || action.result[0],
          )
          .set('loading', false);
      }
      return state;
    }
    case PUZZLE_LOADED:
      return state.set('loading', true);
    case PUZZLE_SAVED:
      return state.set('isSyncing', true);
    case PUZZLE_SAVED_SUCCESS:
      return state.set('isSyncing', false).set('lastSynced', Date.now());
    default:
      return state;
  }
}

export default puzzleContainerReducer;
