/*
 *
 * GridContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { ENTITIES_LOADED } from 'entities/constants';
import {
  ACROSS,
  DOWN,
  SQUARE_FOCUSED,
  CLICK_MODE_FILL,
  CLICK_MODE_BLACK_SQUARE,
  CLICK_MODE_TOGGLED,
  SYMMETRY_MODE_NONE,
  SYMMETRY_MODE_DIAGONAL,
  SYMMETRY_MODE_TOGGLED,
  HIGHLIGHTED_SQUARE_IDS_SET,
  HIGHLIGHTED_SQUARE_IDS_ADD,
} from './constants';

export const initialState = fromJS({
  focusedSquareId: undefined,
  focusedDirection: ACROSS,
  clickMode: CLICK_MODE_FILL,
  symmetryMode: SYMMETRY_MODE_DIAGONAL,
  highlightedSquareIds: [],
});

function gridContainerReducer(state = initialState, action) {
  switch (action.type) {
    case SQUARE_FOCUSED: {
      const currentFocusedSquareId = state.get('focusedSquareId');
      const currentFocusedDirection = state.get('focusedDirection');
      return state
        .set(
          'focusedDirection',
          currentFocusedSquareId === action.squareId
            ? otherDirection(currentFocusedDirection)
            : currentFocusedDirection,
        )
        .set('focusedSquareId', action.squareId)
        .set('highlightedSquareIds', []);
    }
    case CLICK_MODE_TOGGLED:
      return state.set(
        'clickMode',
        state.get('clickMode') === CLICK_MODE_FILL
          ? CLICK_MODE_BLACK_SQUARE
          : CLICK_MODE_FILL,
      );
    case SYMMETRY_MODE_TOGGLED:
      return state.set(
        'symmetryMode',
        state.get('symmetryMode') === SYMMETRY_MODE_NONE
          ? SYMMETRY_MODE_DIAGONAL
          : SYMMETRY_MODE_NONE,
      ); /* TODO refactor */
    case HIGHLIGHTED_SQUARE_IDS_SET:
      return state.set('highlightedSquareIds', action.squareIds);
    case HIGHLIGHTED_SQUARE_IDS_ADD:
      return state.update('highlightedSquareIds', squareIds => [
        ...squareIds,
        ...action.squareIds,
      ]);
    case ENTITIES_LOADED:
      return state.set('focusedDirection', ACROSS);
    default:
      return state;
  }
}

function otherDirection(direction) {
  return direction === ACROSS ? DOWN : ACROSS;
}

export default gridContainerReducer;
