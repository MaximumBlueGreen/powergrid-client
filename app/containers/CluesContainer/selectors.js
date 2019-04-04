import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the cluesContainer state domain
 */

const selectCluesContainerDomain = state =>
  state.get('cluesContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by CluesContainer
 */

const makeSelectCluesContainer = () =>
  createSelector(selectCluesContainerDomain, substate => substate.toJS());

export default makeSelectCluesContainer;
export { selectCluesContainerDomain };
