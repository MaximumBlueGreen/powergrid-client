/*
 *
 * GridContainer actions
 *
 */

import { SQUARE_BLACK_TOGGLED, SQUARE_VALUE_UPDATED } from './constants';

export function toggleBlackSquare(squareId) {
  return {
    type: SQUARE_BLACK_TOGGLED,
    squareId,
  };
}

export function updateSquareValue(squareId, value) {
  return {
    type: SQUARE_VALUE_UPDATED,
    squareId,
    value,
  };
}
