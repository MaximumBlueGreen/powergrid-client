import { combineReducers } from 'redux-immutable';

import puzzles from './Puzzles/reducer';
import squares from './Squares/reducer';

export default combineReducers({ puzzles, squares });
