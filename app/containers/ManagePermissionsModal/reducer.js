/*
 *
 * GridContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { MODAL_CLOSED, MODAL_OPENED } from './constants';

export const initialState = fromJS({
  open: false,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case MODAL_CLOSED:
      return state.set('open', false);
    case MODAL_OPENED:
      return state.set('open', true).set('puzzleId', action.puzzleId);
    default:
      return state;
  }
}

export default reducer;
