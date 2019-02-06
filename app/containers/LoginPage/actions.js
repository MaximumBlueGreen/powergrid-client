/*
 *
 * LoginPage actions
 *
 */

import { DEFAULT_ACTION, LOGIN_BUTTON_CLICKED_ACTION } from './constants';

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
