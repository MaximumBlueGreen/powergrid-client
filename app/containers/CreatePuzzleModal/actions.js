/*
 *
 * LoginPage actions
 *
 */

import {
  MODAL_CLOSED,
  MODAL_OPENED,
  PUZZLE_CREATED,
  SIZE_UPDATED,
  TITLE_UPDATED,
  PUZZLE_UPLOADED,
} from './constants';

export function closeModal() {
  return {
    type: MODAL_CLOSED,
  };
}

export function openModal() {
  return {
    type: MODAL_OPENED,
  };
}

export function createPuzzle(size, title) {
  return {
    type: PUZZLE_CREATED,
    size,
    title,
  };
}

export function updateSize(height, width) {
  return {
    type: SIZE_UPDATED,
    height,
    width,
  };
}

export function updateTitle(title) {
  return {
    type: TITLE_UPDATED,
    title,
  };
}

export function uploadPuzzle(puzzleFile) {
  return {
    type: PUZZLE_UPLOADED,
    puzzleFile,
  };
}
