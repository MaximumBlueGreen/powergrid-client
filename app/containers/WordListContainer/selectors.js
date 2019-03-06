import { createSelector } from 'reselect';
import entriesSelector from 'entities/Entries/selectors';
import { initialState } from './reducer';

/**
 * Direct selector to the WordListContainer state domain
 */

const JSify = state => state.toJS();

const selectWordListContainerDomain = state =>
  state.get('wordListContainer', initialState);

const makeSelectWordListFiltered = () =>
  createSelector(
    entriesSelector,
    selectWordListContainerDomain,
    (entries, domain) => {
      const filterPattern = domain.get('filterPattern');
      const entryIds = domain.get('entryIds');

      return entryIds.map(id => entries.get(id)).filter(entry => {
        try {
          return entry.get('entry').match(filterPattern);
        } catch {
          return false;
        }
      });
    },
  );

const makeSelectWordListContainerData = () =>
  createSelector(makeSelectWordListFiltered(), JSify);

const makeSelectWordListContainer = () =>
  createSelector(selectWordListContainerDomain, JSify);

export {
  selectWordListContainerDomain,
  makeSelectWordListContainer,
  makeSelectWordListContainerData,
};
