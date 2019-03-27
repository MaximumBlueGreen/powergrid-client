/*
 *
 * GridContainer actions
 *
 */

import { SQUARE_FOCUSED, CLICK_MODE_TOGGLED } from './constants';

export function focusSquare(index) {
  return {
    type: SQUARE_FOCUSED,
    index,
  };
}

export function toggleClickMode() {
  return {
    type: CLICK_MODE_TOGGLED,
  };
}
