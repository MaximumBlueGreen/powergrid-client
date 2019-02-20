import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gridContainer state domain
 */

const selectGridContainerDomain = state =>
  state.get('gridContainer', initialState);

const normalize = createSelector(selectGridContainerDomain, state =>
  state.set(
    'squares',
    state
      .getIn(['squares', 'allIds'])
      .map(id => state.getIn(['squares', 'byId', id]).set('id', id)),
  ),
);

const selectGridContainerSquareNumbers = createSelector(normalize, state =>
  state.update('squares', squares => {
    const { width } = state.get('dimensions').toJS();
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

const makeSelectGridContainer = () =>
  createSelector(selectGridContainerSquareNumbers, substate => substate.toJS());

export default makeSelectGridContainer;
export { selectGridContainerDomain, selectGridContainerSquareNumbers };
