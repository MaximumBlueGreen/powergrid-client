/*
 *
 * WordListContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {} from './constants';

export const initialState = fromJS({});

function wordlistContainerReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default wordlistContainerReducer;
