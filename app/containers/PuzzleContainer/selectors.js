import { createSelector } from 'reselect';
import selectPuzzles from 'entities/Puzzles/selectors';
import { initialState } from './reducer';

/**
 * Direct selector to the puzzleContainer state domain
 */

const JSify = state => state.toJS();

const selectPuzzleContainerDomain = state =>
  state.get('puzzleContainer', initialState);

const makeSelectPuzzleContainerData = () =>
  createSelector(
    [selectPuzzles, selectPuzzleContainerDomain],
    (puzzles, domain) => {
      const puzzleId = domain.get('puzzleId');
      return puzzleId && puzzles.get(puzzleId).toJS();
    },
  );

const makeSelectPuzzleContainer = () =>
  createSelector(selectPuzzleContainerDomain, JSify);

export {
  selectPuzzleContainerDomain,
  makeSelectPuzzleContainer,
  makeSelectPuzzleContainerData,
};
