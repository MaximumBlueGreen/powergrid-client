import { createSelector } from 'reselect';
import selectPuzzles from 'entities/Puzzles/selectors';
import selectClues from 'entities/Clues/selectors';
import { makeSelectGridContainerWords } from 'containers/GridContainer/selectors';
import { mapValues } from 'lodash';
import { initialState } from './reducer';

/**
 * Direct selector to the cluesContainer state domain
 */

const selectCluesContainerDomain = state =>
  state.get('cluesContainer', initialState);

/**
 * Other specific selectors
 */

const selectPuzzleId = (_, { puzzleId }) => puzzleId;

const makeSelectClues = direction =>
  createSelector(
    [selectPuzzleId, selectPuzzles, selectClues],
    (puzzleId, puzzles, clues) =>
      puzzles
        .updateIn([puzzleId, 'clues', direction], clueIds =>
          clueIds.map(id => clues.get(id)),
        )
        .getIn([puzzleId, 'clues', direction])
        .toJS(),
  );

const makeSelectWords = () =>
  createSelector(makeSelectGridContainerWords(), ({ across, down }) => ({
    across: mapValues(across, word =>
      word
        .map(s => s.value || '?')
        .join('')
        .toUpperCase(),
    ),
    down: mapValues(down, word =>
      word
        .map(s => s.value || '?')
        .join('')
        .toUpperCase(),
    ),
  }));

const makeSelectCompletion = direction =>
  createSelector(
    [makeSelectClues(direction), makeSelectGridContainerWords()],
    (clues, words) => ({
      completed: Object.keys(clues).length,
      total: Object.keys(words[direction]).length,
    }),
  );

/**
 * Default selector used by CluesContainer
 */

const makeSelectCluesContainer = () =>
  createSelector(selectCluesContainerDomain, substate => substate.toJS());

export default makeSelectCluesContainer;
export {
  selectCluesContainerDomain,
  makeSelectClues,
  makeSelectWords,
  makeSelectCompletion,
};
