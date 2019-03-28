import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gridContainer state domain
 */

const JSify = state => state.toJS();

const selectCreatePuzzleModalDomain = state =>
  state.get('createPuzzleModal', initialState);

const makeSelectCreatePuzzleModal = () =>
  createSelector(selectCreatePuzzleModalDomain, JSify);

export { makeSelectCreatePuzzleModal, selectCreatePuzzleModalDomain };
