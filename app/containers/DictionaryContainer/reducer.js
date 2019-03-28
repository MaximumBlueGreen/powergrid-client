/*
 *
 * DictionaryContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { VALID_SEARCH_ACTION, INVALID_SEARCH_ACTION } from './constants';

export const initialState = fromJS({ resultList: [] });

function dictionaryContainerReducer(state = initialState, action) {
  switch (action.type) {
    case VALID_SEARCH_ACTION:
      console.log(state.set('resultList', fromJS(action.resultList)).toJS());
      return state.set('resultList', fromJS(action.resultList));
    case INVALID_SEARCH_ACTION:
      return state;
    default:
      return state;
  }
}

export default dictionaryContainerReducer;
