/*
 *
 * GridContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { times, zipObject } from 'lodash';
import { ACROSS /* DOWN */, SQUARE_BLACK_TOGGLED } from './constants';

const ids = times(225, n => n.toString());
const squares = times(225, () => ({ value: '', isBlack: false }));

export const initialState = fromJS({
  squares: { byId: zipObject(ids, squares), allIds: ids },
  focusedSquareId: 0,
  direction: ACROSS,
  dimensions: { height: 15, width: 15 },
});

function gridContainerReducer(state = initialState, action) {
  switch (action.type) {
    case SQUARE_BLACK_TOGGLED:
      return state.updateIn(
        ['squares', 'byId', action.squareId, 'isBlack'],
        isBlack => !isBlack,
      );
    default:
      return state;
  }
}

export default gridContainerReducer;
