import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dictionaryContainer state domain
 */

const JSify = state => state.toJS();

const selectDictionaryContainerDomain = state =>
  state.get('dictionaryContainer', initialState);

const makeSelectResultList = () =>
  createSelector(selectDictionaryContainerDomain, domain =>
    domain.get('resultList'),
  );

const makeSelectDictionaryContainerData = () =>
  createSelector(makeSelectResultList(), JSify);

const makeSelectDictionaryContainer = () =>
  createSelector(selectDictionaryContainerDomain, JSify);

export {
  selectDictionaryContainerDomain,
  makeSelectDictionaryContainer,
  makeSelectDictionaryContainerData,
};
