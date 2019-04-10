/*
 *
 * CluesContainer reducer
 *
 */

import { fromJS } from 'immutable';
export const initialState = fromJS({});

function cluesContainerReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default cluesContainerReducer;
