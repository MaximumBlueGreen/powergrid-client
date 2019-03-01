import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the wordlistContainer state domain
 */

const selectWordlistContainerDomain = state =>
  state.get('wordlistContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by WordlistContainer
 */

const makeSelectWordlistContainer = () =>
  createSelector(selectWordlistContainerDomain, substate => substate.toJS());

export default makeSelectWordlistContainer;
export { selectWordlistContainerDomain };
