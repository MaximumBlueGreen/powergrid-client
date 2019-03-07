import puzzles from 'entities/Puzzles/selectors';
import squares from 'entities/Squares/selectors';
import users from 'entities/Users/selectors';

import { createSelector } from 'reselect';

export default createSelector(
  [puzzles, squares, users],
  (puzzles, squares, users) => ({
    puzzles: puzzles.toJS(),
    squares: squares.toJS(),
    users: users.toJS(),
  }),
);
