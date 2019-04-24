/*
 *
 * LoginPage actions
 *
 */

import { MODAL_CLOSED, MODAL_OPENED, PUZZLE_DELETED } from './constants';

export function closeModal() {
  return {
    type: MODAL_CLOSED,
  };
}

export function openModal(puzzleId) {
  return {
    type: MODAL_OPENED,
    puzzleId,
  };
}

export function deletePuzzle(id) {
  return {
    type: PUZZLE_DELETED,
    id,
  };
}
