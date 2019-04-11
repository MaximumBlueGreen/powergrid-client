/*
 *
 * GridContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  MODAL_CLOSED,
  MODAL_OPENED,
  SIZE_UPDATED,
  TITLE_UPDATED,
  UPLOAD_MODE,
  CREATE_MODE,
  CHANGE_MODE_ACTION,
} from './constants';

export const initialState = fromJS({
  open: false,
  size: {
    height: 15,
    width: 15,
  },
  mode: CREATE_MODE,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case MODAL_CLOSED:
      return state.set('open', false);
    case MODAL_OPENED:
      return state.set('open', true);
    case CHANGE_MODE_ACTION:
      return state.set(
        'mode',
        state.get('mode') === CREATE_MODE ? UPLOAD_MODE : CREATE_MODE,
      );
    case SIZE_UPDATED:
      return state.set(
        'size',
        fromJS({
          height: action.height,
          width: action.width,
        }),
      );
    case TITLE_UPDATED:
      return state.set('title', action.title);
    default:
      return state;
  }
}

export default reducer;
