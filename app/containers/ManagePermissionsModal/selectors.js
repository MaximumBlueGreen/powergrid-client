import { createSelector } from 'reselect';
import selectUsers from 'entities/Users/selectors';
import selectPuzzles from 'entities/Puzzles/selectors';
import { initialState } from './reducer';

const JSify = state => state.toJS();

const selectManagePermissionsModalDomain = state =>
  state.get('managePermissionsModal', initialState);

const makeSelectManagePermissionsModal = () =>
  createSelector(selectManagePermissionsModalDomain, JSify);

const selectPuzzleId = (_, { puzzleId }) => puzzleId;

const makeSelectAccessors = () =>
  createSelector(
    [selectUsers, selectPuzzles, selectPuzzleId],
    (users, puzzles, puzzleId) =>
      puzzles
        .getIn([puzzleId, 'accessors'])
        .map(accessorId => users.get(accessorId))
        .toJS(),
  );

export {
  makeSelectManagePermissionsModal,
  selectManagePermissionsModalDomain,
  makeSelectAccessors,
};
