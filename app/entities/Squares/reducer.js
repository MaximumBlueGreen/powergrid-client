import { fromJS } from 'immutable';
import { ENTITIES_LOADED } from 'entities/constants';
import {
  SQUARE_BLACK_TOGGLED,
  SQUARE_BLACK_SET,
  SQUARE_VALUE_UPDATED,
  BULK_SQUARE_VALUE_UPDATED,
  SQUARES_CLEARED,
} from './constants';

const initialState = fromJS({});

export default function(state = initialState, action) {
  switch (action.type) {
    case SQUARE_BLACK_TOGGLED:
      return state.update(action.squareId, square => ({
        value: undefined,
        isBlack: !square.get('isBlack'),
      }));
    case SQUARE_BLACK_SET:
      return state.set(action.squareId, {
        value: undefined,
        isBlack: action.isBlack,
      });
    case SQUARE_VALUE_UPDATED:
      if (state.getIn([action.squareId, 'isBlack'])) {
        return state;
      }
      return state.setIn([action.squareId, 'value'], action.value);
    case SQUARES_CLEARED:
      return state.mergeDeep(
        fromJS(
          Object.assign(
            {},
            ...action.squareIds.map(id => ({ [id]: { value: undefined } })),
          ),
        ),
      );
    case BULK_SQUARE_VALUE_UPDATED:
      return state.mergeDeep(
        fromJS(
          Object.assign(
            {},
            ...action.squareIds.map((id, i) => ({
              [id]: { value: action.values[i] },
            })),
          ),
        ),
      );
    case ENTITIES_LOADED:
      return state.merge(action.entities.squares);
    default:
      return state;
  }
}
