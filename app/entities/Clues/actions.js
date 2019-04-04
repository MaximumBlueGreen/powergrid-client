import { CLUE_UPDATED } from './constants';

export function updateClue(id, clue) {
  return {
    type: CLUE_UPDATED,
    id,
    clue,
  };
}
