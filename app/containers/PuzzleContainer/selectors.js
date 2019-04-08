import { createSelector } from 'reselect';
import selectPuzzles from 'entities/Puzzles/selectors';
import { fromJS } from 'immutable';
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
      if (puzzleId) {
        const puzzle = puzzles.get(puzzleId);
        const parentId = puzzle.get('parent_id');
        const versions = puzzles
          .filter(p => parentId && p.get('parent_id') === parentId)
          .valueSeq();
        return puzzle
          .set('versions', versions.size > 0 ? versions : fromJS([puzzle]))
          .toJS();
      }
      return undefined;
    },
  );

const makeSelectPuzzleContainer = () =>
  createSelector(selectPuzzleContainerDomain, JSify);

export {
  selectPuzzleContainerDomain,
  makeSelectPuzzleContainer,
  makeSelectPuzzleContainerData,
};
