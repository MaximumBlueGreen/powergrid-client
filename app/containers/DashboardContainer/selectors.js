import { createSelector } from 'reselect';
import puzzlesSelector from 'entities/Puzzles/selectors';
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
  createSelector(puzzlesSelector, puzzles =>
    puzzles.groupBy(puzzle => puzzle.get('parent_id')).toJS(),
  );

/**
 * Default selector used by DashboardContainer
 */

const makeSelectDashboardContainer = () =>
  createSelector(selectDashboardContainerDomain, substate => substate.toJS());

export default makeSelectDashboardContainer;
export { selectDashboardContainerDomain, makeSelectDashboardContainerPuzzles };
