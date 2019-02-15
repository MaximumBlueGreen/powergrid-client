import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gridContainer state domain
 */

const selectGridContainerDomain = state =>
  state.get('gridContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by GridContainer
 */

const makeSelectGridContainer = () =>
  createSelector(selectGridContainerDomain, substate => substate.toJS());

export default makeSelectGridContainer;
export { selectGridContainerDomain };
