/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SUCCESSFUL_USER_LOGIN_ACTION,
  UNSUCCESSFUL_USER_LOGIN_ACTION,
  SUCCESSFUL_USER_CREATION_ACTION,
  UNSUCCESSFUL_USER_CREATION_ACTION,
  CHANGE_MODE_ACTION,
  LOGIN_MODE,
  REGISTRATION_MODE,
} from './constants';

export const initialState = fromJS({
  mode: LOGIN_MODE,
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case SUCCESSFUL_USER_LOGIN_ACTION:
      return state;
    case UNSUCCESSFUL_USER_LOGIN_ACTION:
      return state;
    case SUCCESSFUL_USER_CREATION_ACTION:
      return state;
    case UNSUCCESSFUL_USER_CREATION_ACTION:
      return state;
    case CHANGE_MODE_ACTION:
      return state.set(
        'mode',
        state.get('mode') === LOGIN_MODE ? REGISTRATION_MODE : LOGIN_MODE,
      );
    default:
      return state;
  }
}

export default loginPageReducer;
