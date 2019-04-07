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
} from './constants';

export const initialState = fromJS({
  focusedSquareIndex: 0,
  focusedDirection: ACROSS,
  clickMode: CLICK_MODE_FILL,
  symmetryMode: SYMMETRY_MODE_DIAGONAL,
});

function gridContainerReducer(state = initialState, action) {
  switch (action.type) {
    case SQUARE_FOCUSED: {
      const currentFocusedSquareIndex = state.get('focusedSquareIndex');
      const currentFocusedDirection = state.get('focusedDirection');
      return state
        .set(
          'focusedDirection',
          currentFocusedSquareIndex === action.index
            ? otherDirection(currentFocusedDirection)
            : currentFocusedDirection,
        )
        .set('focusedSquareIndex', action.index);
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
    case ENTITIES_LOADED:
      return state.set('focusedSquareIndex', 0).set('focusedDirection', ACROSS);
    default:
      return state;
  }
}

function otherDirection(direction) {
  return direction === ACROSS ? DOWN : ACROSS;
}

export default gridContainerReducer;
