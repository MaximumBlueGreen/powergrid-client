/*
 *
 * PuzzleContainer actions
 *
 */

import { DEFAULT_ACTION, PUZZLES_LOADED, PUZZLE_SELECTED } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadPuzzles() {
  return {
    type: PUZZLES_LOADED,
  };
}

export function selectPuzzle(id) {
  return {
    type: PUZZLE_SELECTED,
    id,
  };
}
