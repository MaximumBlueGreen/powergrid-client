/*
 *
 * GridContainer actions
 *
 */

import {
  SQUARE_BLACK_TOGGLED,
  SQUARE_BLACK_SET,
  SQUARE_VALUE_UPDATED,
  BULK_SQUARE_VALUE_UPDATED,
  SQUARES_CLEARED,
} from './constants';

export function toggleBlackSquare(squareId) {
  return {
    type: SQUARE_BLACK_TOGGLED,
    squareId,
  };
}

export function setBlackSquare(squareId, isBlack) {
  return {
    type: SQUARE_BLACK_SET,
    squareId,
    isBlack,
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
