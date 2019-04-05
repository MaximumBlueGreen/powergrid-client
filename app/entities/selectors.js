import clues from 'entities/Clues/selectors';
import puzzles from 'entities/Puzzles/selectors';
import squares from 'entities/Squares/selectors';
import users from 'entities/Users/selectors';

import { createSelector } from 'reselect';

export default createSelector(
  [clues, puzzles, squares, users],
  (clues, puzzles, squares, users) => ({
    clues: clues.toJS(),
    puzzles: puzzles.toJS(),
    squares: squares.toJS(),
    users: users.toJS(),
  }),
);
