/*
 *
 * GridContainer actions
 *
 */

import {
  SQUARE_FOCUSED,
  CLICK_MODE_TOGGLED,
  SYMMETRY_MODE_TOGGLED,
} from './constants';

export function focusSquare(squareId) {
  return {
    type: SQUARE_FOCUSED,
    squareId,
  };
}

export function toggleClickMode() {
  return {
    type: CLICK_MODE_TOGGLED,
  };
}

export function toggleSymmetryMode() {
  return {
    type: SYMMETRY_MODE_TOGGLED,
  };
}
