import {
  PUZZLE_TITLE_UPDATED,
  PUZZLE_NOTES_EDITED,
  PUZZLE_SYMMETRY_SET,
  SQUARES_BLACK_TOGGLED,
  SQUARES_BLACK_SET,
  SYMMETRY_MODE_NONE,
} from './constants';

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

export function toggleBlackSquares(
  puzzleId,
  ids,
  symmetry = SYMMETRY_MODE_NONE,
) {
  return {
    type: SQUARES_BLACK_TOGGLED,
    puzzleId,
    ids,
    symmetry,
  };
}

export function setBlackSquares(puzzleId, ids, symmetry = SYMMETRY_MODE_NONE) {
  return {
    type: SQUARES_BLACK_SET,
    ids,
    symmetry,
  };
}

export function setPuzzleSymmetry(id, symmetry) {
  return {
    type: PUZZLE_SYMMETRY_SET,
    id,
    symmetry,
  };
}
