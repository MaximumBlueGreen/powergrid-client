import { createSelector } from 'reselect';
import entriesSelector from 'entities/Entries/selectors';
import { initialState } from './reducer';

/**
 * Direct selector to the WordListContainer state domain
 */

const JSify = state => state.toJS();

const selectWordListContainerDomain = state =>
  state.get('wordListContainer', initialState);

const makeSelectWordListContainerData = () =>
  createSelector(entriesSelector, JSify);

const makeSelectWordListContainer = () =>
  createSelector(selectWordListContainerDomain, JSify);

export {
  selectWordListContainerDomain,
  makeSelectWordListContainer,
  makeSelectWordListContainerData,
};
