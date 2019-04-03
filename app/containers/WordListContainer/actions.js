/*
 *
 * WordListContainer actions
 *
 */

import {
  WORDLIST_LOADED,
  FILTER_PATTERN_UPDATED,
  ENTRY_ADDED,
  ENTRY_SELECTED,
  ENTRY_DELETED,
} from './constants';

export function loadWordList() {
  return {
    type: WORDLIST_LOADED,
  };
}

export function updateFilterPattern(pattern) {
  return {
    type: FILTER_PATTERN_UPDATED,
    pattern,
  };
}

export function addEntry(values) {
  return {
    type: ENTRY_ADDED,
    values,
  };
}

export function deleteEntry(entryId) {
  return {
    type: ENTRY_DELETED,
    entryId,
  };
}

export function selectEntry(entry) {
  return {
    type: ENTRY_SELECTED,
    entry,
  };
}
