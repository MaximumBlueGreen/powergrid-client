import { takeLatest, put, all } from 'redux-saga/effects';
import { authenticated } from 'utils/apiRequestSaga';
import { times } from 'lodash';
import { loadPuzzles } from 'containers/PuzzleContainer/actions';
import { closeModal } from './actions';
import { PUZZLE_CREATED, PUZZLE_UPLOADED } from './constants';
// import { PUZZLE_CREATED } from './constants';

export function* createPuzzleSaga({ size: { height, width }, title }) {
  yield authenticated(
    'puzzles',
    {
      method: 'POST',
      body: JSON.stringify({
        puzzle: {
          squares: times(height * width, () => ({})),
          size: { height, width },
          title,
        },
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

// need to add in cluing and title later
export function* uploadPuzzleSaga({ puzzleFile }) {
  console.log(puzzleFile);
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

  console.log(height);
  console.log(width);
  console.log(puzzle);
  yield authenticated(
    'puzzles',
    {
      method: 'POST',
      body: JSON.stringify({
        puzzle: {
          squares: times(height * width, () => ({})),
          size: { height, width },
        },
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
  // yield takeLatest(PUZZLE_CREATED, createPuzzleSaga);
  yield all([
    takeLatest(PUZZLE_CREATED, createPuzzleSaga),
    takeLatest(PUZZLE_UPLOADED, uploadPuzzleSaga),
  ]);
}
