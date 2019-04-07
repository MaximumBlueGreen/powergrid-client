/*
 *
 * PuzzleContainer reducer
 *
 */

import { fromJS } from 'immutable';

import { ENTITIES_LOADED } from 'entities/constants';
import {
  PUZZLE_SAVED,
  PUZZLE_SAVED_SUCCESS,
  PUZZLES_LOADED,
  TAB_CHANGED,
} from './constants';

export const initialState = fromJS({
  puzzleId: undefined,
  lastSynced: Date.now(),
  isSyncing: false,
  loading: true,
  tabValue: 'WordList',
});

function puzzleContainerReducer(state = initialState, action) {
  switch (action.type) {
    case ENTITIES_LOADED: {
      if (action.entities.puzzles) {
        return state.set('puzzleId', action.result[0]).set('loading', false);
      }
      return state.set('loading', false);
    }
    case PUZZLES_LOADED:
      return state.set('loading', true);
    case PUZZLE_SAVED:
      return state.set('isSyncing', true);
    case PUZZLE_SAVED_SUCCESS:
      return state.set('isSyncing', false).set('lastSynced', Date.now());
    case TAB_CHANGED:
      return state.set('tabValue', action.tabValue);
    default:
      return state;
  }
}

export default puzzleContainerReducer;
