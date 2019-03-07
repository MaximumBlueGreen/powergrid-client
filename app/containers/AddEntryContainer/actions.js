/*
 *
 * AddEntryContainer actions
 *
 */

import { ENTRY_ADDED } from './constants';

export function addEntry(values) {
  return {
    type: ENTRY_ADDED,
    values,
  };
}
