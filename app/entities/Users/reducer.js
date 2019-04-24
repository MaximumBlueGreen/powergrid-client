import { fromJS } from 'immutable';
import { SUCCESSFUL_USER_LOGIN_ACTION } from 'containers/LoginContainer/constants';
import { ENTITIES_LOADED } from 'entities/constants';
const initialState = fromJS({ me: localStorage.getItem('token') });

export default function(state = initialState, action) {
  switch (action.type) {
    case SUCCESSFUL_USER_LOGIN_ACTION:
      return state.set('me', action.token);
    case ENTITIES_LOADED:
      return state.merge(action.entities.users);
    default:
      return state;
  }
}
