import { PUZZLE_TITLE_UPDATED, PUZZLE_NOTES_EDITED } from './constants';

export function updatePuzzleTitle(id, title) {
  return {
    type: PUZZLE_TITLE_UPDATED,
    id,
    title,
  };
}

export function editPuzzleNotes(id, notes) {
  return {
    type: PUZZLE_NOTES_EDITED,
    id,
    notes,
  };
}
