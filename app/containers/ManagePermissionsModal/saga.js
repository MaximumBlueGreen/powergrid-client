import { all, put, takeLatest } from 'redux-saga/effects';
import { authenticated } from 'utils/apiRequestSaga';
import { loadPuzzle } from 'containers/PuzzleContainer/actions';
import { ACCESSOR_ADDED, ACCESSOR_DELETED } from './constants';

function* addAccessorSaga({ puzzleId, values }) {
  const { username } = values.toJS();

  yield authenticated(
    `puzzles/${puzzleId}/accessors/${username}`,
    {
      method: 'POST',
      body: JSON.stringify({ permission_level: 'EDIT', user_id: 2 }),
    },
    function* onSuccess() {
      yield put(loadPuzzle(puzzleId));
    },
    function* onFailure() {
      alert('No such user found');
    },
  );
}

function* deleteAccessorSaga({ puzzleId, accessorId }) {
  yield authenticated(
    `puzzles/${puzzleId}/accessors/${accessorId}`,
    { method: 'DELETE' },
    function* onSuccess() {
      yield put(loadPuzzle(puzzleId));
    },
    function* onFailure(err) {
      console.log(err);
    },
  );
}

export default function* createPuzzleModalSaga() {
  yield all([
    takeLatest(ACCESSOR_ADDED, addAccessorSaga),
    takeLatest(ACCESSOR_DELETED, deleteAccessorSaga),
  ]);
}
