import { fromJS } from 'immutable';
import { ENTITIES_LOADED } from 'entities/constants';
import { SQUARE_BLACK_TOGGLED, SQUARE_VALUE_UPDATED } from './constants';

const initialState = fromJS({});

export default function(state = initialState, action) {
  switch (action.type) {
    case SQUARE_BLACK_TOGGLED:
      return state
        .updateIn([action.squareId, 'isBlack'], isBlack => !isBlack)
        .setIn([action.squareId, 'value'], '');
    case SQUARE_VALUE_UPDATED:
      return state.setIn([action.squareId, 'value'], action.value);
    case ENTITIES_LOADED:
      return state.merge(action.entities.squares);
    default:
      return state;
  }
}
