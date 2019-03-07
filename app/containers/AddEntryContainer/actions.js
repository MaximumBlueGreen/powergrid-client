/*
 *
 * AddEntryContainer actions
 *
 */

import { ENTRY_ADDED } from './constants';

export function addEntry(entry) {
  return {
    type: ENTRY_ADDED,
    entry,
  };
}
