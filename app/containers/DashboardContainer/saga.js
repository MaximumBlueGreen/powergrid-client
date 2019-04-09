// import { take, call, put, select } from 'redux-saga/effects';

import { put, takeLatest } from 'redux-saga/effects';
import { loadEntities } from 'entities/actions';
import { puzzle as puzzleSchema } from 'entities/schema';
import { normalize } from 'normalizr';
import { authenticated } from 'utils/apiRequestSaga';

import { PUZZLES_LOADED } from './constants';

export function* getPuzzlesSaga({ puzzleId }) {
  yield authenticated(
    'users/me/puzzles',
    { method: 'GET' },
    function* onSuccess(puzzles) {
      const { entities, result } = normalize(puzzles, [puzzleSchema]);
      yield put(loadEntities(entities, result, { puzzleId }));
    },
    function* onFailure(err) {
      console.log(err);
    },
  );
}

// Individual exports for testing
export default function* dashboardContainerSaga() {
  yield takeLatest(PUZZLES_LOADED, getPuzzlesSaga);
}
