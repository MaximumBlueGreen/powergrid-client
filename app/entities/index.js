import { combineReducers } from 'redux-immutable';

import puzzles from './Puzzles/reducer';
import squares from './Squares/reducer';
import users from './Users/reducer';

export default combineReducers({ puzzles, squares, users });
