/*
 *
 * PuzzleContainer actions
 *
 */

import {
  DEFAULT_ACTION,
  PUZZLES_LOADED,
  PUZZLES_SAVED,
  PUZZLES_SAVED_SUCCESS,
  PUZZLE_SELECTED,
  PUZZLE_UPLOADED,
  TAB_CHANGED,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadPuzzles(selectedPuzzleId) {
  return {
    type: PUZZLES_LOADED,
    selectedPuzzleId,
  };
}

export function savePuzzles() {
  return {
    type: PUZZLES_SAVED,
  };
}

export function savePuzzlesSuccess() {
  return {
    type: PUZZLES_SAVED_SUCCESS,
  };
}

export function selectPuzzle(id) {
  return {
    type: PUZZLE_SELECTED,
    id,
  };
}

export function uploadPuzzle(puzzleFile) {
  return {
    type: PUZZLE_UPLOADED,
    puzzleFile,
  };
}

export function handleTabChange(event, value) {
  return {
    type: TAB_CHANGED,
    tabValue: value,
  };
}
