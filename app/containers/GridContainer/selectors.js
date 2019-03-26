import { createSelector } from 'reselect';
import puzzlesSelector from 'entities/Puzzles/selectors';
import squaresSelector from 'entities/Squares/selectors';
import { initialState } from './reducer';

/**
 * Direct selector to the gridContainer state domain
 */

const JSify = state => state.toJS();

const selectGridContainerDomain = state =>
  state.get('gridContainer', initialState);

const makeSelectGridContainerDomain = () =>
  createSelector(selectGridContainerDomain, JSify);

const selectPuzzleId = (_, { puzzleId }) => puzzleId;

const makeSelectPuzzle = () =>
  createSelector(
    [selectPuzzleId, puzzlesSelector, squaresSelector],
    (puzzleId, puzzles, squares) =>
      puzzles
        .get(puzzleId)
        .update('squares', ids => ids.map(id => squares.get(id).set('id', id))),
  );

const makeSelectGridContainerSquareNumbers = () =>
  createSelector(makeSelectPuzzle(), state =>
    state.update('squares', squares => {
      const width = state.get('size').get('width');
      let currentNumber = 0;
      let currentAcrossNumber = 0;
      const currentDownNumbers = [];
      return squares.map((s, i) => {
        if (s.get('isBlack')) {
          return s;
        }

        const needsAcrossNumber =
          i % width === 0 || squares.getIn([i - 1, 'isBlack']);
        const needsDownNumber =
          i < width || squares.getIn([i - width, 'isBlack']);
        const needsNumber = needsAcrossNumber || needsDownNumber;

        if (needsNumber) {
          currentNumber += 1;
        }
        if (needsAcrossNumber) {
          currentAcrossNumber = currentNumber;
        }
        if (needsDownNumber) {
          currentDownNumbers[i % width] = currentNumber;
        }
        return s
          .set('number', needsNumber ? currentNumber : undefined)
          .set('acrossNumber', currentAcrossNumber)
          .set('downNumber', currentDownNumbers[i % width]);
      });
    }),
  );

const makeSelectGridContainer = () =>
  createSelector(makeSelectGridContainerSquareNumbers(), JSify);

export {
  makeSelectGridContainerDomain,
  makeSelectGridContainer,
  makeSelectGridContainerSquareNumbers,
};
