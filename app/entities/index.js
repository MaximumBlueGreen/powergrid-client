import { combineReducers } from 'redux-immutable';
import undoable, { includeAction } from 'redux-undo';

import {
  SQUARES_BLACK_TOGGLED,
  SYMMETRY_MODE_NONE,
  SYMMETRY_MODE_DIAGONAL,
} from './Puzzles/constants';
import clues from './Clues/reducer';
import entries from './Entries/reducer';
import puzzles from './Puzzles/reducer';
import squares from './Squares/reducer';
import users from './Users/reducer';

import { setBlackSquare } from './Squares/actions';
import {
  SQUARE_BLACK_TOGGLED,
  SQUARE_BLACK_SET,
  SQUARE_VALUE_UPDATED,
  BULK_SQUARE_VALUE_UPDATED,
  SQUARES_CLEARED,
} from './Squares/constants';

const reducer = (state, action) => {
  if (action.type === SQUARES_BLACK_TOGGLED) {
    const { ids, puzzleId, symmetry } = action;
    const puzzle = state.getIn(['puzzles', puzzleId]);
    const allIndices = indicesWithSymmetry(
      ids.map(id => puzzle.get('squares').findKey(squareId => id === squareId)),
      puzzle.get('size'),
      symmetry,
    );
    const allIds = allIndices.map(i => puzzle.getIn(['squares', i]));
    return state.mergeIn(
      ['squares'],
      Object.assign(
        {},
        ...allIds.map(id => ({
          [id]: squares(
            state.get('squares'),
            setBlackSquare(
              id,
              allIds.some(id => !state.getIn(['squares', id, 'isBlack'])),
            ),
          ).get(id),
        })),
      ),
    );
  }

  return combineReducers({ clues, entries, puzzles, squares, users })(
    state,
    action,
  );
};

const indicesWithSymmetry = (indices, size, symmetry) => {
  switch (symmetry) {
    case SYMMETRY_MODE_DIAGONAL:
      return indices.flatMap(i => [
        i,
        size.get('width') * size.get('height') - i - 1,
      ]);
    case SYMMETRY_MODE_NONE:
    default:
      return indices;
  }
};

export default undoable(reducer, {
  limit: 20,
  filter: includeAction([
    SQUARE_BLACK_TOGGLED,
    SQUARE_BLACK_SET,
    SQUARE_VALUE_UPDATED,
    BULK_SQUARE_VALUE_UPDATED,
    SQUARES_CLEARED,
    SQUARES_BLACK_TOGGLED,
  ]),
  ignoreInitialState: true,
  syncFilter: true,
});
