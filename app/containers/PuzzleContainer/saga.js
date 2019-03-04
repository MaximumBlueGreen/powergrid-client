import { delay } from 'redux-saga';
import { call, all, put, takeLatest, select } from 'redux-saga/effects';
import { loadEntities } from 'entities/actions';
import { puzzle as puzzleSchema } from 'entities/schema';
import { normalize, denormalize } from 'normalizr';
import request from 'utils/request';
import { times } from 'lodash';
import { savePuzzles, savePuzzlesSuccess } from './actions';
import { PUZZLES_LOADED, PUZZLES_SAVED, PUZZLE_CREATED } from './constants';

const selectUserToken = state => state.getIn(['entities', 'users', 'me']);

export function* getPuzzlesSaga() {
  const requestURL = 'http://localhost:3000/users/me/puzzles';
  const authenticationToken = yield select(selectUserToken);

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

export function* savePuzzlesSaga() {
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

  const authenticationToken = yield select(selectUserToken);
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
    yield delay(500); /* For UI deliciousness only */
    yield put(savePuzzlesSuccess());
    /* TODO handle success */
  } catch (err) {
    /* TODO handle error */
  }
}

export function* createPuzzleSaga() {
  const authenticationToken = yield select(selectUserToken);
  const requestURL = 'http://localhost:3000/puzzles';

  try {
    yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({
        puzzle: {
          squares: times(25, () => ({})),
          size: {
            height: 5,
            width: 5,
          },
        },
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authenticationToken}`,
      },
    });
    yield* getPuzzlesSaga();
  } catch (err) {
    /* TODO handle error */
  }
}

function* autosave() {
  while (true) {
    yield put(savePuzzles());
    yield delay(10000);
  }
}

export default function* saga() {
  yield all([
    takeLatest(PUZZLES_LOADED, getPuzzlesSaga),
    takeLatest(PUZZLES_SAVED, savePuzzlesSaga),
    takeLatest(PUZZLE_CREATED, createPuzzleSaga),
    autosave(),
  ]);
}
