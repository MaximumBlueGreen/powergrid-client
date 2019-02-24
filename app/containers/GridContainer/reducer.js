/*
 *
 * GridContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { SQUARE_VALUE_UPDATED } from 'entities/Squares/constants';
import { ACROSS /* , DOWN */, SQUARE_FOCUSED } from './constants';

export const initialState = fromJS({
  focusedSquareIndex: 0,
  focusedDirection: ACROSS,
});

function gridContainerReducer(state = initialState, action) {
  switch (action.type) {
    case SQUARE_VALUE_UPDATED:
      return state.update('focusedSquareIndex', i => i + 1);
    case SQUARE_FOCUSED:
      return state.set('focusedSquareIndex', action.index);
    default:
      return state;
  }
}

export default gridContainerReducer;
