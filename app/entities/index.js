import { combineReducers } from 'redux-immutable';

import entries from './Entries/reducer';
import puzzles from './Puzzles/reducer';
import squares from './Squares/reducer';
import users from './Users/reducer';

export default combineReducers({ entries, puzzles, squares, users });
