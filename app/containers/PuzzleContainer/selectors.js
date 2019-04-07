import { createSelector } from 'reselect';
import puzzlesSelector from 'entities/Puzzles/selectors';
import { initialState } from './reducer';

/**
 * Direct selector to the puzzleContainer state domain
 */

const JSify = state => state.toJS();

const selectPuzzleContainerDomain = state =>
  state.get('puzzleContainer', initialState);

const makeSelectPuzzleContainerData = () =>
  createSelector(puzzlesSelector, JSify);

const makeSelectPuzzleContainer = () =>
  createSelector(selectPuzzleContainerDomain, JSify);

export {
  selectPuzzleContainerDomain,
  makeSelectPuzzleContainer,
  makeSelectPuzzleContainerData,
};
