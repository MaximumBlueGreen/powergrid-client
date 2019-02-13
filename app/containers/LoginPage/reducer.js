/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  INPUT_FIELD_UPDATED_ACTION,
  SUCCESSFUL_USER_LOGIN_ACTION,
  UNSUCCESSFUL_USER_LOGIN_ACTION,
} from './constants';

export const initialState = fromJS({ username: '', password: '' });

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case INPUT_FIELD_UPDATED_ACTION:
      return state.set(action.fieldName, action.fieldValue);
    case SUCCESSFUL_USER_LOGIN_ACTION:
      return state;
    case UNSUCCESSFUL_USER_LOGIN_ACTION:
      console.log(action.error);
      return state;
    default:
      return state;
  }
}

export default loginPageReducer;
