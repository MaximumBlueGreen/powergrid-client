/*
 *
 * GridContainer actions
 *
 */

import {
  SQUARE_FOCUSED,
  CLICK_MODE_TOGGLED,
  SYMMETRY_MODE_TOGGLED,
  HIGHLIGHTED_SQUARE_IDS_SET,
  HIGHLIGHTED_SQUARE_IDS_ADD,
} from './constants';

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

export function toggleSymmetryMode() {
  return {
    type: SYMMETRY_MODE_TOGGLED,
  };
}

export function addHighlightedSquareIds(squareIds) {
  return {
    type: HIGHLIGHTED_SQUARE_IDS_ADD,
    squareIds,
  };
}

export function setHighlightedSquareIds(squareIds) {
  return {
    type: HIGHLIGHTED_SQUARE_IDS_SET,
    squareIds,
  };
}
