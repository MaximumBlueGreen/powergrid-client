/*
 *
 * GridContainer reducer
 *
 */

import { fromJS } from 'immutable';
import _ from 'lodash';
import { DEFAULT_ACTION, ACROSS /* DOWN */ } from './constants';

const ids = _.times(25, n => n);
const squares = _.times(25, () => ({ value: '' }));

export const initialState = fromJS({
  squares: { byId: _.zipObject(ids, squares), allIds: ids },
  focusedSquareId: 0,
  direction: ACROSS,
  dimensions: { height: 5, width: 5 },
});

function gridContainerReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default gridContainerReducer;
