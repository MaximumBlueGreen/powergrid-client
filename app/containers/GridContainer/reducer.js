/*
 *
 * GridContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { SQUARE_VALUE_UPDATED } from 'entities/Squares/constants';
import { PUZZLE_SELECTED } from 'containers/PuzzleContainer/constants';
import { ACROSS, DOWN, SQUARE_FOCUSED } from './constants';

export const initialState = fromJS({
  focusedSquareIndex: 0,
  focusedDirection: ACROSS,
});

function gridContainerReducer(state = initialState, action) {
  switch (action.type) {
    case SQUARE_VALUE_UPDATED:
      return state.update('focusedSquareIndex', i => i + 1);
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
    /* TODO refactor */
    case PUZZLE_SELECTED:
      return state.set('focusedSquareIndex', 0).set('focusedDirection', ACROSS);
    default:
      return state;
  }
}

function otherDirection(direction) {
  return direction === ACROSS ? DOWN : ACROSS;
}

export default gridContainerReducer;
