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

export function loginButtonClickedAction(values) {
  return {
    type: LOGIN_BUTTON_CLICKED_ACTION,
    values,
  };
}

export function validatedAction(token) {
  return {
    type: SUCCESSFUL_USER_LOGIN_ACTION,
    token,
  };
}

export function invalidatedAction(err) {
  return {
    type: UNSUCCESSFUL_USER_LOGIN_ACTION,
    error: err,
  };
}
