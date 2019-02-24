/*
 *
 * GridContainer actions
 *
 */

import { SQUARE_FOCUSED } from './constants';

export function focusSquare(index) {
  return {
    type: SQUARE_FOCUSED,
    index,
  };
}
