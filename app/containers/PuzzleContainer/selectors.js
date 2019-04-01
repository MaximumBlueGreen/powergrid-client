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
  createSelector(selectPuzzleContainerDomain, state =>
    state
      .update('activePuzzleId', id => id || state.getIn(['puzzleIds', 0]))
      .toJS(),
  );

export {
  selectPuzzleContainerDomain,
  makeSelectPuzzleContainer,
  makeSelectPuzzleContainerData,
};
