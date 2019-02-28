import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import { loadEntities } from 'entities/actions';
import { puzzle as puzzleSchema } from 'entities/schema';
import { normalize, denormalize } from 'normalizr';
import request from 'utils/request';
import { PUZZLES_LOADED, PUZZLES_SAVED } from './constants';

export function* getPuzzles() {
  const authenticationToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTUxMzc2NTk3LCJleHAiOjE1NTE0NjI5OTd9.gW3GgIma7CHUFm6Vwc3CiPt6cs8juoFHflQ31SoS77U';
  const requestURL = 'http://localhost:3000/users/me/puzzles';

  try {
    const puzzles = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authenticationToken}`,
      },
    });
    const { entities } = normalize(puzzles, [puzzleSchema]);
    yield put(loadEntities(entities));
  } catch (err) {
    /* TODO handle error */
    yield put(loadEntities([]));
  }
}

export function* savePuzzles() {
  const entities = yield select(state => state.get('entities').toJS());

  /* TODO batch/bulk */
  const puzzles = Object.values(entities.puzzles).map(p => {
    const denormalizedPuzzle = denormalize(p, puzzleSchema, entities);
    return {
      ...denormalizedPuzzle,
      puzzle: {
        squares: denormalizedPuzzle.squares,
        size: denormalizedPuzzle.size,
      },
    };
  });

  const authenticationToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTUxMzc2NTk3LCJleHAiOjE1NTE0NjI5OTd9.gW3GgIma7CHUFm6Vwc3CiPt6cs8juoFHflQ31SoS77U';
  const requestURL = id => `http://localhost:3000/puzzles/${id}`;

  try {
    yield all(
      puzzles.map(p =>
        call(request, requestURL(p.id), {
          method: 'PUT',
          body: JSON.stringify(p),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authenticationToken}`,
          },
        }),
      ),
    );

    /* TODO handle success */
  } catch (err) {
    /* TODO handle error */
  }
}

export default function* saga() {
  yield all([
    takeLatest(PUZZLES_LOADED, getPuzzles),
    takeLatest(PUZZLES_SAVED, savePuzzles),
  ]);
}
