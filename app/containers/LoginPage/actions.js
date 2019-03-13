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
  CREATE_USER_BUTTON_CLICKED_ACTION,
  SUCCESSFUL_USER_CREATION_ACTION,
  UNSUCCESSFUL_USER_CREATION_ACTION,
  CHANGE_MODE_ACTION,
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

export function createUserButtonClickedAction(values) {
  return {
    type: CREATE_USER_BUTTON_CLICKED_ACTION,
    values,
  };
}

export function validatedCreationAction() {
  return {
    type: SUCCESSFUL_USER_CREATION_ACTION,
  };
}

export function invalidatedCreationAction(err) {
  return {
    type: UNSUCCESSFUL_USER_CREATION_ACTION,
    error: err,
  };
}

export function changeMode() {
  return {
    type: CHANGE_MODE_ACTION,
  };
}
