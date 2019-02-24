import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the puzzleContainer state domain
 */

const selectPuzzleContainerDomain = state =>
  state.get('puzzleContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PuzzleContainer
 */

const makeSelectPuzzleContainer = () =>
  createSelector(selectPuzzleContainerDomain, substate => substate.toJS());

export default makeSelectPuzzleContainer;
export { selectPuzzleContainerDomain };
