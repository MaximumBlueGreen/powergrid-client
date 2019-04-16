import { delay } from 'redux-saga';
import { all, put, takeLatest, select } from 'redux-saga/effects';
import { loadEntities } from 'entities/actions';
import { puzzle as puzzleSchema } from 'entities/schema';
import { normalize, denormalize } from 'normalizr';
import { authenticated } from 'utils/apiRequestSaga';
import entitiesSelector from 'entities/selectors';
import entriesSelector from 'entities/Entries/selectors';
import { focusSquare, focusDirection } from 'containers/GridContainer/actions';
import {
  SQUARE_FOCUSED,
  ACROSS,
  DOWN,
  AUTOFILL_CLICKED,
} from 'containers/GridContainer/constants';
import {
  makeSelectGridContainerFocusedWord,
  makeSelectGridContainerSquareNumbers,
  makeSelectGridContainerWords,
} from 'containers/GridContainer/selectors';
import { selectWordListContainerDomain } from 'containers/WordListContainer/selectors';
import { updateFilterPattern } from 'containers/WordListContainer/actions';
import { ENTRY_SELECTED } from 'containers/WordListContainer/constants';
import { bulkUpdateSquareValue } from 'entities/Squares/actions';
import { CLUE_SELECTED } from 'containers/CluesContainer/constants';
import { savePuzzle, savePuzzleSuccess } from './actions';
import {
  PUZZLES_LOADED,
  PUZZLE_SAVED,
  PUZZLE_UPLOADED,
  ENTRY_TAG_CLICKED,
} from './constants';
import { makeSelectPuzzleContainer } from './selectors';

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

export function* savePuzzleSaga() {
  const entities = yield select(entitiesSelector);
  const { puzzleId } = yield select(makeSelectPuzzleContainer());

  const denormalizedPuzzle = denormalize(
    entities.puzzles[puzzleId],
    puzzleSchema,
    entities,
  );
  const puzzle = {
    ...denormalizedPuzzle,
    puzzle: {
      clues: denormalizedPuzzle.clues,
      squares: denormalizedPuzzle.squares,
      size: denormalizedPuzzle.size,
      title: denormalizedPuzzle.title,
      symmetry: denormalizedPuzzle.symmetry,
    },
  };
  yield authenticated(
    `puzzles/${puzzle.id}`,
    {
      method: 'PUT',
      body: JSON.stringify(puzzle),
    },
    function* onSuccess() {
      yield delay(500);
      yield put(savePuzzleSuccess());
    },
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

function* updateFilterPatternFromGrid() {
  const { puzzleId } = yield select(makeSelectPuzzleContainer());
  const focusedWord = yield select(makeSelectGridContainerFocusedWord(), {
    puzzleId,
  });
  if (focusedWord.length !== 0) {
    yield put(
      updateFilterPattern(`^${focusedWord.map(s => s.value || '.').join('')}$`),
    );
  }
}

function* updateGridFromEntry({ entry }) {
  const { puzzleId } = yield select(makeSelectPuzzleContainer());
  const focusedWord = yield select(makeSelectGridContainerFocusedWord(), {
    puzzleId,
  });

  if (entry.length === focusedWord.length) {
    yield put(bulkUpdateSquareValue(focusedWord.map(s => s.id), entry));
  }
}

function* focusWordInGrid({ puzzleId, number, isAcross }) {
  const puzzle = yield select(makeSelectGridContainerSquareNumbers(), {
    puzzleId,
  });
  yield all([
    put(
      focusSquare(
        puzzle
          .get('squares')
          .find(s => String(s.get('number')) === number)
          .get('id'),
      ),
    ),
    put(focusDirection(isAcross ? ACROSS : DOWN)),
  ]);
}

function* autoFillGrid() {
  const { puzzleId } = yield select(makeSelectPuzzleContainer());
  // const entities = yield select(entitiesSelector);
  const entries = yield select(entriesSelector);
  const domain = yield select(selectWordListContainerDomain);
  const entryIds = domain.get('entryIds');
  const actualEntries = entryIds.map(id => entries.get(id));

  // const words = yield select(makeSelectGridContainerSquareNumbers(), {
  //   puzzleId,
  // });
  //
  // const {
  //   size: { width, height },
  //   squares,
  // } = words.toJS();

  const gridContainerWords = yield select(makeSelectGridContainerWords(), {
    puzzleId,
  });

  // Iterate over numbers (possible word positions)
  // iterate over words:
  //    iterate through matches in word list sorted by score
  //    if there are matches:
  //      insert the word and recurse?
  //    else:
  //      go up a level or fail if at top level

  console.log(gridContainerWords);
  console.log(actualEntries);
  yield;
}

function* autosave() {
  while (true) {
    yield delay(10000);
    yield put(savePuzzle());
  }
}

export default function* saga() {
  yield all([
    takeLatest(PUZZLES_LOADED, getPuzzlesSaga),
    takeLatest(PUZZLE_SAVED, savePuzzleSaga),
    takeLatest(PUZZLE_UPLOADED, uploadPuzzleSaga),
    takeLatest(SQUARE_FOCUSED, updateFilterPatternFromGrid),
    takeLatest(ENTRY_SELECTED, updateGridFromEntry),
    takeLatest([CLUE_SELECTED, ENTRY_TAG_CLICKED], focusWordInGrid),
    takeLatest(AUTOFILL_CLICKED, autoFillGrid),
    autosave(),
  ]);
}
