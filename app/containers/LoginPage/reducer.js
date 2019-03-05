/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SUCCESSFUL_USER_LOGIN_ACTION,
  UNSUCCESSFUL_USER_LOGIN_ACTION,
} from './constants';

export const initialState = fromJS({});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case SUCCESSFUL_USER_LOGIN_ACTION:
      return state;
    case UNSUCCESSFUL_USER_LOGIN_ACTION:
      return state;
    default:
      return state;
  }
}

export default loginPageReducer;
