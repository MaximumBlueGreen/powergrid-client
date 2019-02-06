/*
 *
 * LoginPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOGIN_BUTTON_CLICKED_ACTION,
  SUCCESSFUL_USER_LOGIN_ACTION,
  UNSUCCESSFUL_USER_LOGIN_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loginButtonClickedAction(username) {
  return {
    type: LOGIN_BUTTON_CLICKED_ACTION,
    loginInfo: username,
  };
}

export function validatedAction() {
  return {
    type: SUCCESSFUL_USER_LOGIN_ACTION,
  };
}

export function invalidatedAction(err) {
  return {
    type: UNSUCCESSFUL_USER_LOGIN_ACTION,
    error: err,
  };
}
