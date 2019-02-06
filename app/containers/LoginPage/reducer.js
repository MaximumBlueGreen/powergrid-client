/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOGIN_BUTTON_CLICKED_ACTION } from './constants';

export const initialState = fromJS({ username: '' });

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOGIN_BUTTON_CLICKED_ACTION:
      return fromJS({ username: `${action.loginInfo}a` });
    default:
      return state;
  }
}

export default loginPageReducer;
