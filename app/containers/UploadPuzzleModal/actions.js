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
} from './constants';

export function closeModal() {
  return {
    type: MODAL_CLOSED,
  };
}

export function openUpload() {
  return {
    type: MODAL_OPENED,
  };
}

export function createPuzzle(size, title, parentId, puzzleToCopyId) {
  return {
    type: PUZZLE_CREATED,
    size,
    title,
    parentId,
    puzzleToCopyId,
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
