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
import { zipObject } from 'lodash';
import { savePuzzle, savePuzzleSuccess } from './actions';
import {
  PUZZLE_LOADED,
  PUZZLE_SAVED,
  PUZZLE_UPLOADED,
  ENTRY_TAG_CLICKED,
} from './constants';
import { makeSelectPuzzleContainer } from './selectors';

export function* getPuzzleSaga({ puzzleId }) {
  yield authenticated(
    `puzzles/${puzzleId}`,
    { method: 'GET' },
    function* onSuccess(puzzle) {
      const { entities, result } = normalize(puzzle, puzzleSchema);
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
    getPuzzleSaga,
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

function updateAdjacent(currentNode, nodes, edges, word) {
  const updatedNodes = JSON.parse(JSON.stringify(nodes));
  updatedNodes[currentNode] = [...word.entry];
  for (let i = 0; i < edges[currentNode].length; i += 1) {
    const adjNode = edges[currentNode][i];
    updatedNodes[adjNode.value][adjNode.index] = word.entry[i];
  }
  return updatedNodes;
}

function fill(
  currentNode,
  nodesList,
  nodesMap,
  edges,
  words,
  wordScores,
  visited,
  currentScore,
) {
  const potentialWords = words.filter(word =>
    word.entry.match(
      nodesMap[currentNode]
        .join('')
        .replace(/\?/g, '.')
        .toUpperCase(),
    ),
  );
  const allResults = [];
  const updatedVisited = [...visited, currentNode];

  for (let i = 0; i < potentialWords.length; i += 1) {
    const updatedNodes = updateAdjacent(
      currentNode,
      nodesMap,
      edges,
      potentialWords[i],
    );
    if (updatedVisited.length === nodesList.length) {
      allResults.push({
        updatedNodes,
        score: currentScore, // currentScore + wordScores[potentialWords[i]],
      });
      return allResults;
    }
    for (let j = 0; j < nodesList.length; j += 1) {
      if (!updatedVisited.includes(nodesList[j])) {
        const wordIndex = words.indexOf(potentialWords[i]);
        const arr = fill(
          nodesList[j],
          nodesList,
          updatedNodes,
          edges,
          [
            ...words.slice(0, wordIndex),
            ...words.slice(wordIndex + 1, words.length),
          ],
          wordScores,
          updatedVisited,
          currentScore, // currentScore + wordScores[potentialWords[i]],
        );
        if (arr.length !== 0) {
          return arr;
        }
      }
    }
  }
  return [];
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

  const nodes = {
    ...zipObject(
      Object.keys(gridContainerWords.across).map(k => `${k}A`),
      Object.values(gridContainerWords.across).map(a =>
        Object.values(a).map(s => s.value || '?'),
      ),
    ),
    ...zipObject(
      Object.keys(gridContainerWords.down).map(k => `${k}D`),
      Object.values(gridContainerWords.down).map(a =>
        Object.values(a).map(s => s.value || '?'),
      ),
    ),
  };

  // Invariant: gridContainerWords.accross[k] will be in order of the words
  const edges = {
    ...zipObject(
      Object.keys(gridContainerWords.across).map(k => `${k}A`),
      Object.keys(gridContainerWords.across).map(k =>
        Object.values(gridContainerWords.across[k]).map(s => ({
          value: `${s.downNumber}D`,
          index: gridContainerWords.down[s.downNumber]
            .map(g => g.id)
            .indexOf(s.id),
        })),
      ),
    ),
    ...zipObject(
      Object.keys(gridContainerWords.down).map(k => `${k}D`),
      Object.keys(gridContainerWords.down).map(k =>
        Object.values(gridContainerWords.down[k]).map(s =>
          // console.log(gridContainerWords.across[s.acrossNumber], s);
          ({
            value: `${s.acrossNumber}A`,
            index: gridContainerWords.across[s.acrossNumber]
              .map(g => g.id)
              .indexOf(s.id),
          }),
        ),
      ),
    ),
  };

  // console.log(edges);

  // call fill(nodes, edges), which will return nodes and edges that are full
  const wordScores = {};
  const results = yield fill(
    Object.keys(nodes)[0],
    Object.keys(nodes),
    nodes,
    edges,
    actualEntries.toJS(),
    wordScores,
    [],
    0,
  );

  console.log(gridContainerWords.across);
  console.log('results: ', results);

  if (results.length !== 0) {
    const { updatedNodes } = results[0];
    const acrossKeys = Object.keys(results[0].updatedNodes).filter(k =>
      k.includes('A'),
    );
    const allEntries = [];
    const allSquareIds = [];
    for (let i = 0; i < acrossKeys.length; i += 1) {
      const entry = updatedNodes[acrossKeys[i]];
      const id = acrossKeys[i].slice(0, 1);
      const squareIds = gridContainerWords.across[id].map(s => s.id);
      allEntries.push(...entry);
      allSquareIds.push(...squareIds);
    }
    yield put(bulkUpdateSquareValue(allSquareIds, allEntries));
  }
}

function* autosave() {
  while (true) {
    yield delay(10000);
    yield put(savePuzzle());
  }
}

export default function* saga() {
  yield all([
    takeLatest(PUZZLE_LOADED, getPuzzleSaga),
    takeLatest(PUZZLE_SAVED, savePuzzleSaga),
    takeLatest(PUZZLE_UPLOADED, uploadPuzzleSaga),
    takeLatest(SQUARE_FOCUSED, updateFilterPatternFromGrid),
    takeLatest(ENTRY_SELECTED, updateGridFromEntry),
    takeLatest([CLUE_SELECTED, ENTRY_TAG_CLICKED], focusWordInGrid),
    takeLatest(AUTOFILL_CLICKED, autoFillGrid),
    autosave(),
  ]);
}
