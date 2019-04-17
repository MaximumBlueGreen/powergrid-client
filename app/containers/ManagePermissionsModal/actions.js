/*
 *
 * LoginPage actions
 *
 */

import {
  MODAL_CLOSED,
  MODAL_OPENED,
  ACCESSOR_ADDED,
  ACCESSOR_DELETED,
} from './constants';

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

export function addAccessor(puzzleId, values) {
  return {
    type: ACCESSOR_ADDED,
    puzzleId,
    values,
  };
}

export function deleteAccessor(puzzleId, accessorId) {
  return {
    type: ACCESSOR_DELETED,
    puzzleId,
    accessorId,
  };
}
