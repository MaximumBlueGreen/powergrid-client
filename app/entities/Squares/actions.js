/*
 *
 * GridContainer actions
 *
 */

import {
  SQUARE_BLACK_TOGGLED,
  SQUARE_VALUE_UPDATED,
  BULK_SQUARE_VALUE_UPDATED,
  SQUARES_CLEARED,
} from './constants';

export function toggleBlackSquare(squareId, symmetricSquareIds = []) {
  return {
    type: SQUARE_BLACK_TOGGLED,
    squareId,
    symmetricSquareIds,
  };
}

export function updateSquareValue(squareId, value) {
  return {
    type: SQUARE_VALUE_UPDATED,
    squareId,
    value,
  };
}

export function bulkUpdateSquareValue(squareIds, values) {
  return {
    type: BULK_SQUARE_VALUE_UPDATED,
    squareIds,
    values,
  };
}

export function clearSquares(squareIds) {
  return {
    type: SQUARES_CLEARED,
    squareIds,
  };
}
