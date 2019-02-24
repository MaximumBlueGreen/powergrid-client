import { fromJS } from 'immutable';
import puzzleContainerReducer from '../reducer';

describe('puzzleContainerReducer', () => {
  it('returns the initial state', () => {
    expect(puzzleContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
