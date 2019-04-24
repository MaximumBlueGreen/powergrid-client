import { takeLatest, put } from 'redux-saga/effects';
import { authenticated } from 'utils/apiRequestSaga';
import { closeModal } from './actions';
import { PUZZLE_DELETED } from './constants';

export function* deletePuzzleSaga({ id }) {
  yield authenticated(
    `puzzles/${id}`,
    {
      method: 'DELETE',
    },
    function* onSuccess() {
      yield put(closeModal());
    },
    function* onError(error) {
      console.log(error);
    },
  );
}

export default function* createPuzzleModalSaga() {
  yield takeLatest(PUZZLE_DELETED, deletePuzzleSaga);
}
