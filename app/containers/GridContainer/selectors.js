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

const makeSelectPuzzle = puzzleId =>
  createSelector([puzzlesSelector, squaresSelector], (puzzles, squares) =>
    puzzles
      .get(puzzleId)
      .update('squares', ids => ids.map(id => squares.get(id).set('id', id))),
  );

const makeSelectGridContainerSquareNumbers = puzzleId =>
  createSelector(makeSelectPuzzle(puzzleId), state =>
    state.update('squares', squares => {
      const width = state.get('size').get('width');
      let currentNumber = 0;
      return squares.map((s, i) => {
        const needsNumber =
          !s.get('isBlack') &&
          (i % width === 0 ||
            i < width ||
            squares.getIn([i - 1, 'isBlack']) ||
            squares.getIn([i - width, 'isBlack']));

        if (needsNumber) {
          currentNumber += 1;
        }
        return s.set('number', needsNumber ? currentNumber : undefined);
      });
    }),
  );

const makeSelectGridContainer = puzzleId =>
  createSelector(makeSelectGridContainerSquareNumbers(puzzleId), JSify);

export {
  makeSelectGridContainerDomain,
  makeSelectGridContainer,
  makeSelectGridContainerSquareNumbers,
};
