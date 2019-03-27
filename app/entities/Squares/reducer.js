import { fromJS } from 'immutable';
import { ENTITIES_LOADED } from 'entities/constants';
import undoable, { includeAction } from 'redux-undo';
import {
  SQUARE_BLACK_TOGGLED,
  SQUARE_VALUE_UPDATED,
  SQUARES_CLEARED,
} from './constants';
// redux-undo higher-order reducer

const initialState = fromJS({});

function reducer(state = initialState, action) {
  switch (action.type) {
    case SQUARE_BLACK_TOGGLED: {
      const currentIsBlack = state.getIn([action.squareId, 'isBlack']);
      return state.mergeDeep(
        Object.assign(
          {},
          ...[...action.symmetricSquareIds, action.squareId].map(id => ({
            [id]: { isBlack: !currentIsBlack, value: undefined },
          })),
        ),
      );
    }
    case SQUARE_VALUE_UPDATED:
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
    case ENTITIES_LOADED:
      return state.merge(action.entities.squares);
    default:
      return state;
  }
}

export default undoable(reducer, {
  filter: includeAction([
    SQUARE_BLACK_TOGGLED,
    SQUARE_VALUE_UPDATED,
    SQUARES_CLEARED,
  ]),
  ignoreInitialState: true,
  syncFilter: true,
});
