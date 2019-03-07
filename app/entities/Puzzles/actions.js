import { PUZZLE_TITLE_UPDATED } from './constants';

export function updatePuzzleTitle(id, title) {
  return {
    type: PUZZLE_TITLE_UPDATED,
    id,
    title,
  };
}
