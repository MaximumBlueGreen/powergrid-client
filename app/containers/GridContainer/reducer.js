/*
 *
 * GridContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  ACROSS,
  DOWN,
  SQUARE_FOCUSED,
  DIRECTION_FOCUSED,
  CLICK_MODE_FILL,
  CLICK_MODE_BLACK_SQUARE,
  CLICK_MODE_TOGGLED,
  HIGHLIGHTED_SQUARE_IDS_SET,
  HIGHLIGHTED_SQUARE_IDS_ADD,
} from './constants';

export const initialState = fromJS({
  focusedSquareId: undefined,
  focusedDirection: ACROSS,
  clickMode: CLICK_MODE_FILL,
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
    case DIRECTION_FOCUSED:
      return state.set('focusedDirection', action.direction);
    case CLICK_MODE_TOGGLED:
      return state.set(
        'clickMode',
        state.get('clickMode') === CLICK_MODE_FILL
          ? CLICK_MODE_BLACK_SQUARE
          : CLICK_MODE_FILL,
      );
    case HIGHLIGHTED_SQUARE_IDS_SET:
      return state.set('highlightedSquareIds', action.squareIds);
    case HIGHLIGHTED_SQUARE_IDS_ADD:
      return state.update('highlightedSquareIds', squareIds => [
        ...squareIds,
        ...action.squareIds,
      ]);
    default:
      return state;
  }
}

function otherDirection(direction) {
  return direction === ACROSS ? DOWN : ACROSS;
}

export default gridContainerReducer;
