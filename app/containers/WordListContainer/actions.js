/*
 *
 * WordListContainer actions
 *
 */

import { WORDLIST_LOADED, FILTER_PATTERN_UPDATED } from './constants';

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
