import { takeLatest, put, all, call } from 'redux-saga/effects';
import { authenticated } from 'utils/apiRequestSaga';
import { times } from 'lodash';
import { push } from 'connected-react-router';
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
      yield all([put(push(`/edit/${id}`)), put(closeModal())]);
    },
    function* onError(error) {
      console.log(error);
    },
  );
}

function splitBufferAtNulls(buf) {
  const arr = [];
  let p = 0;
  let start = 0;
  let length = 0;

  for (let i = 0; i < buf.length; i += 1) {
    if (buf[i] === 0) {
      length = i;
      arr[p] = buf.slice(start, length);
      p += 1;
      start = length + 1;
    }
  }

  return arr;
}
function parse(puzzleFile) {
  return new Promise(resolve => {
    const fileReader = new FileReader();
    let height;
    let width;
    let puzzle;
    let title;
    let notes;
    fileReader.onloadend = () => {
      const content = fileReader.result;
      height = Buffer.from(content.slice(0x2c, 0x2c + 0x01)).readInt8(0);
      width = Buffer.from(content.slice(0x2d, 0x2d + 0x01)).readInt8(0);
      puzzle = Buffer.from(
        content.slice(0x34, height * width + 0x34),
      ).toString();
      const numberOfClues = Buffer.from(
        content.slice(0x2e, 0x2e + 0x02),
      ).readInt16LE(0);
      const stringStart = 0x34 + 2 * height * width;

      let remainder = Buffer.from(content.slice(stringStart));
      const fields = ['title', 'author', 'copyright'];
      let clueStart = 0;

      for (
        let i = 0, j = 0, fieldIndex = 0;
        i < remainder.length && fieldIndex < fields.length;
        i += 1
      ) {
        const caret = remainder[i];

        if (caret === 0) {
          fields[fieldIndex] = remainder.slice(j, i).toString();
          j = i + 1;
          fieldIndex += 1;
        }

        if (fieldIndex === 2) {
          clueStart = i + 1;
        }
      }
      title = `${fields[0]} `;
      notes = fields[1] + fields[2];
      remainder = Buffer.from(content.slice(stringStart + clueStart));
      remainder = splitBufferAtNulls(remainder);

      const allClues = [];
      const acrossClues = [];
      const downClues = [];
      for (let i = 0; i < numberOfClues; i += 1) {
        allClues.push(remainder[i].toString());
      }

      let currentNumber = 0;
      let currentClue = 0;

      for (let i = 0; i < puzzle.length; i += 1) {
        const needsAcrossNumber = i % width === 0 || puzzle[i - 1] === '.';
        const needsDownNumber = i < width || puzzle[i - width] === '.';
        const needsNumber = needsAcrossNumber || needsDownNumber;

        if (puzzle[i] !== '.') {
          if (needsNumber) {
            currentNumber += 1;
          }
          if (needsAcrossNumber) {
            acrossClues.push({
              number: currentNumber,
              text: allClues[currentClue],
            });
            currentClue += 1;
          }
          if (needsDownNumber) {
            downClues.push({
              number: currentNumber,
              text: allClues[currentClue],
            });
            currentClue += 1;
          }
          if (currentClue === numberOfClues) {
            break;
          }
        }
      }

      console.log(acrossClues);
      console.log(downClues);
      console.log(allClues);
      console.log(title);
      console.log(notes);
      resolve({ height, width, puzzle, title, notes, acrossClues, downClues });
    };
    fileReader.readAsBinaryString(puzzleFile);
  });
}
// need to add in cluing and title later
export function* uploadPuzzleSaga({ puzzleFile }) {
  const {
    height,
    width,
    puzzle,
    title,
    notes,
    acrossClues,
    downClues,
  } = yield call(parse, puzzleFile);
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
          clue: { across: acrossClues, down: downClues },
          notes,
        },
        title,
      }),
    },
    function* onSuccess({ id }) {
      yield all([put(push(`/edit/${id}`)), put(closeModal())]);
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
