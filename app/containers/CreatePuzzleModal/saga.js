import { takeLatest, put, all } from 'redux-saga/effects';
import { authenticated } from 'utils/apiRequestSaga';
import { times } from 'lodash';
import { loadPuzzles } from 'containers/PuzzleContainer/actions';
import { closeModal } from './actions';
import { PUZZLE_CREATED } from './constants';

export function* createPuzzleSaga({
  size: { height, width },
  title,
  parentId,
  puzzleToCopyId,
}) {
  yield authenticated(
    'puzzles',
    {
      method: 'POST',
      body: JSON.stringify({
        puzzle: {
          squares: times(height * width, () => ({})),
          size: { height, width },
        },
        title,
        parent_id: parentId,
        puzzleToCopyId,
      }),
    },
    function* onSuccess() {
      yield all([put(loadPuzzles()), put(closeModal())]);
    },
    function* onError(error) {
      console.log(error);
    },
  );
}
// Individual exports for testing
export default function* createPuzzleModalSaga() {
  yield takeLatest(PUZZLE_CREATED, createPuzzleSaga);
}
