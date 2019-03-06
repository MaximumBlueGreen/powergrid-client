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
  PUZZLE_CREATED,
  PUZZLE_SELECTED,
} from './constants';

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

export function createPuzzle() {
  return {
    type: PUZZLE_CREATED,
  };
}

export function selectPuzzle(id) {
  return {
    type: PUZZLE_SELECTED,
    id,
  };
}
