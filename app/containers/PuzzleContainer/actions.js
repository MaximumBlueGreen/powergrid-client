/*
 *
 * PuzzleContainer actions
 *
 */

import {
  DEFAULT_ACTION,
  PUZZLE_LOADED,
  PUZZLE_SAVED,
  PUZZLE_SAVED_SUCCESS,
  PUZZLE_UPLOADED,
  ENTRY_TAG_CLICKED,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadPuzzle(puzzleId) {
  return {
    type: PUZZLE_LOADED,
    puzzleId,
  };
}

export function savePuzzle() {
  return {
    type: PUZZLE_SAVED,
  };
}

export function savePuzzleSuccess() {
  return {
    type: PUZZLE_SAVED_SUCCESS,
  };
}

export function uploadPuzzle(puzzleFile) {
  return {
    type: PUZZLE_UPLOADED,
    puzzleFile,
  };
}

export function clickEntryTag(puzzleId, number, isAcross) {
  return {
    type: ENTRY_TAG_CLICKED,
    puzzleId,
    number,
    isAcross,
  };
}
