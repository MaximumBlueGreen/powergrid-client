/*
 *
 * DashboardContainer actions
 *
 */

import { PUZZLES_LOADED } from './constants';

export function loadPuzzles() {
  return {
    type: PUZZLES_LOADED,
  };
}
