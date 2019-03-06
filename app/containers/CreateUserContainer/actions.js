/*
 *
 * LoginPage actions
 *
 */

import { CREATE_USER_BUTTON_CLICKED_ACTION } from './constants';

export function createUserButtonClickedAction(values) {
  return {
    type: CREATE_USER_BUTTON_CLICKED_ACTION,
    values,
  };
}
