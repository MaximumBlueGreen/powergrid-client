import { CLUE_UPDATED } from './constants';

export function updateClue(puzzleId, number, across, text) {
  return {
    type: CLUE_UPDATED,
    puzzleId,
    number,
    across,
    text,
  };
}
