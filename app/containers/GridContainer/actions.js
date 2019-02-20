/*
 *
 * GridContainer actions
 *
 */

import { SQUARE_BLACK_TOGGLED } from './constants';

export function toggleBlackSquare(squareId) {
  return {
    type: SQUARE_BLACK_TOGGLED,
    squareId,
  };
}
