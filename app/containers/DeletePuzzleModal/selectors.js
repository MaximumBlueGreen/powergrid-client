import { createSelector } from 'reselect';
import { initialState } from './reducer';

const JSify = state => state.toJS();

const makeSelectDeletePuzzleModalDomain = state =>
  state.get('deletePuzzleModal', initialState);

const makeSelectDeletePuzzleModal = () =>
  createSelector(makeSelectDeletePuzzleModalDomain, JSify);

export { makeSelectDeletePuzzleModal, makeSelectDeletePuzzleModalDomain };
