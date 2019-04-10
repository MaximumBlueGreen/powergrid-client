/*
 *
 * CluesContainer actions
 *
 */

import { CLUE_SELECTED } from './constants';

export function selectClue(puzzleId, number, isAcross) {
  return {
    type: CLUE_SELECTED,
    puzzleId,
    number,
    isAcross,
  };
}
