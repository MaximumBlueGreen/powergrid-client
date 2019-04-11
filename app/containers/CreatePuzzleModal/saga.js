import { takeLatest, put, all, call } from 'redux-saga/effects';
import { authenticated } from 'utils/apiRequestSaga';
import { times } from 'lodash';
import { push } from 'connected-react-router';
import { loadPuzzles } from 'containers/PuzzleContainer/actions';
import { SYMMETRY_MODE_DIAGONAL } from 'entities/Puzzles/constants';
import { closeModal } from './actions';
import { PUZZLE_CREATED, PUZZLE_UPLOADED } from './constants';
// import { PUZZLE_CREATED } from './constants';

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
          symmetry: SYMMETRY_MODE_DIAGONAL,
        },
        title,
        parent_id: parentId,
        puzzleToCopyId,
      }),
    },
    function* onSuccess({ id }) {
      yield all([put(push(`/home/${id}`)), put(closeModal())]);
    },
    function* onError(error) {
      console.log(error);
    },
  );
}

function parse(puzzleFile) {
  return new Promise(resolve => {
    console.log(puzzleFile);
    const fileReader = new FileReader();
    let height;
    let width;
    let puzzle;
    fileReader.onloadend = () => {
      const content = fileReader.result;
      height = Buffer.from(content.slice(0x2c, 0x2c + 0x01)).readInt8(0); // .readInt8(0);
      width = Buffer.from(content.slice(0x2d, 0x2d + 0x01)).readInt8(0);
      puzzle = Buffer.from(
        content.slice(0x34, height * width + 0x34),
      ).toString();
      console.log(height);
      console.log(width);
      console.log(puzzle);
      resolve({ height, width, puzzle });
    };
    fileReader.readAsBinaryString(puzzleFile);
  });
}
// need to add in cluing and title later
export function* uploadPuzzleSaga({ puzzleFile }) {
  const { height, width, puzzle } = yield call(parse, puzzleFile);
  yield authenticated(
    'puzzles',
    {
      method: 'POST',
      body: JSON.stringify({
        puzzle: {
          squares: times(height * width, i => ({
            isBlack: puzzle[i] === '.',
            value: puzzle[i] === '.' ? undefined : puzzle[i],
          })),
          size: { height, width },
        },
      }),
    },
    // console.log(response),
    // console.log(puzzle),
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
