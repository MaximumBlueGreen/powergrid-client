import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the wordlistContainer state domain
 */

const selectWordListContainerDomain = state =>
  state.get('wordlistContainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by WordListContainer
 */

const makeSelectWordListContainer = () =>
  createSelector(selectWordListContainerDomain, substate => substate.toJS());

export default makeSelectWordListContainer;
export { selectWordListContainerDomain };
