/*
 *
 * PuzzleContainer reducer
 *
 */

import { fromJS } from 'immutable';

import { ENTITIES_LOADED } from 'entities/constants';
import {
  PUZZLE_SELECTED,
  PUZZLES_SAVED,
  PUZZLES_SAVED_SUCCESS,
  PUZZLES_LOADED,
} from './constants';

export const initialState = fromJS({
  activePuzzleId: undefined,
  puzzleIds: [],
  lastSynced: Date.now(),
  isSyncing: false,
  loading: true,
});

function puzzleContainerReducer(state = initialState, action) {
  switch (action.type) {
    case ENTITIES_LOADED: {
      if (action.entities.puzzles) {
        const puzzleIds = action.result.map(String);
        return state.set('puzzleIds', fromJS(puzzleIds)).set('loading', false);
      }
      return state.set('loading', false);
    }
    case PUZZLES_LOADED:
      return state.set('loading', true);
    case PUZZLE_SELECTED:
      if (state.get('puzzleIds').includes(action.id)) {
        return state.set('activePuzzleId', action.id);
      }
      return state;
    case PUZZLES_SAVED:
      return state.set('isSyncing', true);
    case PUZZLES_SAVED_SUCCESS:
      return state.set('isSyncing', false).set('lastSynced', Date.now());
    default:
      return state;
  }
}

export default puzzleContainerReducer;
