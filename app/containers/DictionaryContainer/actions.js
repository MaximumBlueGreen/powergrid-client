/*
 *
 * DictionaryContainer actions
 *
 */

import {
  SEARCH_BUTTON_CLICKED_ACTION,
  VALID_SEARCH_ACTION,
  INVALID_SEARCH_ACTION,
} from './constants';

export function searchButtonClicked(values) {
  return {
    type: SEARCH_BUTTON_CLICKED_ACTION,
    values,
  };
}

export function validSearch(resultList) {
  return {
    type: VALID_SEARCH_ACTION,
    resultList,
  };
}

export function invalidSearch(err) {
  console.log(err);
  return {
    type: INVALID_SEARCH_ACTION,
    error: err,
  };
}
