/*
 *
 * GridContainer actions
 *
 */

import {
  SQUARE_FOCUSED,
  DIRECTION_FOCUSED,
  CLICK_MODE_TOGGLED,
  SYMMETRY_MODE_TOGGLED,
  HIGHLIGHTED_SQUARE_IDS_SET,
  HIGHLIGHTED_SQUARE_IDS_ADD,
} from './constants';

export function focusSquare(squareId) {
  return {
    type: SQUARE_FOCUSED,
    squareId,
  };
}

export function focusDirection(direction) {
  return {
    type: DIRECTION_FOCUSED,
    direction,
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
