import { createSelector } from 'reselect';
import puzzlesSelector from 'entities/Puzzles/selectors';
import squaresSelector from 'entities/Squares/selectors';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboardContainer state domain
 */

const selectDashboardContainerDomain = state =>
  state.get('dashboardContainer', initialState);

/**
 * Other specific selectors
 */

const makeSelectDashboardContainerPuzzles = () =>
  createSelector([puzzlesSelector, squaresSelector], (puzzles, squares) =>
    puzzles
      .groupBy(puzzle => puzzle.get('parent_id'))
      .map(puzzleGroup =>
        puzzleGroup.map(puzzle =>
          puzzle.update(
            'squares',
            squareIds => squareIds && squareIds.map(id => squares.get(id)),
          ),
        ),
      )
      .toJS(),
  );

/**
 * Default selector used by DashboardContainer
 */

const makeSelectDashboardContainer = () =>
  createSelector(selectDashboardContainerDomain, substate => substate.toJS());

export default makeSelectDashboardContainer;
export { selectDashboardContainerDomain, makeSelectDashboardContainerPuzzles };
