/*
 *
 * WordListContainer actions
 *
 */

import { WORDLIST_LOADED } from './constants';

export function loadWordList() {
  return {
    type: WORDLIST_LOADED,
  };
}
