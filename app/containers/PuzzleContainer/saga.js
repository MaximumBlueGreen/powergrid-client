import { delay } from 'redux-saga';
import { all, put, takeLatest, select } from 'redux-saga/effects';
import { loadEntities } from 'entities/actions';
import { puzzle as puzzleSchema } from 'entities/schema';
import { normalize, denormalize } from 'normalizr';
import { times } from 'lodash';
import { authenticated } from 'utils/apiRequestSaga';
import entitiesSelector from 'entities/selectors';
import { savePuzzles, savePuzzlesSuccess } from './actions';
import {
  PUZZLES_LOADED,
  PUZZLES_SAVED,
  PUZZLE_CREATED,
  PUZZLE_UPLOADED,
} from './constants';

export function* getPuzzlesSaga() {
  yield authenticated(
    'users/me/puzzles',
    { method: 'GET' },
    function* onSuccess(puzzles) {
      const { entities } = normalize(puzzles, [puzzleSchema]);
      yield put(loadEntities(entities));
    },
    function* onFailure(err) {
      console.log(err);
    },
  );
}

export function* savePuzzlesSaga() {
  const entities = yield select(entitiesSelector);

  /* TODO batch/bulk */
  const puzzles = Object.values(entities.puzzles).map(p => {
    const denormalizedPuzzle = denormalize(p, puzzleSchema, entities);
    return {
      ...denormalizedPuzzle,
      puzzle: {
        squares: denormalizedPuzzle.squares,
        size: denormalizedPuzzle.size,
        title: denormalizedPuzzle.title,
      },
    };
  });

  yield all(
    puzzles.map(p =>
      authenticated(
        `puzzles/${p.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(p),
        },
        function* onSuccess() {
          yield delay(500);
          yield put(savePuzzlesSuccess());
        },
        function* onError(error) {
          console.log(error);
        },
      ),
    ),
  );
}

export function* createPuzzleSaga() {
  yield authenticated(
    'puzzles',
    {
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
    },
    getPuzzlesSaga,
    function* onError(error) {
      console.log(error);
    },
  );
}

export function* uploadPuzzleSaga({ puzzleFile }) {
  const fileReader = new FileReader();
  let height;
  let width;
  let puzzle;
  fileReader.onloadend = () => {
    const content = fileReader.result;
    height = Buffer.from(content.slice(0x2c, 0x2c + 0x01)).readInt8(0); // .readInt8(0);
    width = Buffer.from(content.slice(0x2d, 0x2d + 0x01)).readInt8(0);
    puzzle = Buffer.from(content.slice(0x34, height * width + 0x34)).toString();
  };
  fileReader.readAsBinaryString(puzzleFile);

  yield authenticated(
    'puzzles',
    {
      method: 'POST',
      body: JSON.stringify({
        puzzle: {
          squares: puzzle,
          size: {
            height,
            width,
          },
        },
      }),
    },
    getPuzzlesSaga,
    function* onError(error) {
      console.log(error);
    },
  );
}

function* autosave() {
  while (true) {
    yield delay(10000);
    yield put(savePuzzles());
  }
}

export default function* saga() {
  yield all([
    takeLatest(PUZZLES_LOADED, getPuzzlesSaga),
    takeLatest(PUZZLES_SAVED, savePuzzlesSaga),
    takeLatest(PUZZLE_CREATED, createPuzzleSaga),
    takeLatest(PUZZLE_UPLOADED, uploadPuzzleSaga),
    autosave(),
  ]);
}
