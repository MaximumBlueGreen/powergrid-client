/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOGIN_BUTTON_CLICKED_ACTION,
  SUCCESSFUL_USER_LOGIN_ACTION,
  UNSUCCESSFUL_USER_LOGIN_ACTION,
} from './constants';

export const initialState = fromJS({ username: '', password: '' });

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOGIN_BUTTON_CLICKED_ACTION:
      // console.log(`resucer login clicked action: ${action.loginInfo.username}`);
      return fromJS({
        username: `${action.loginInfo.username}`,
        password: `${action.loginInfo.password}`,
      });
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
