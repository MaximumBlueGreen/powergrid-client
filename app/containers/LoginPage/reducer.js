/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import { CHANGE_MODE_ACTION, LOGIN_MODE, REGISTRATION_MODE } from './constants';

export const initialState = fromJS({
  mode: LOGIN_MODE,
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
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
