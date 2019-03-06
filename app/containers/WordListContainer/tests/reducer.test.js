import { fromJS } from 'immutable';
import wordlistContainerReducer from '../reducer';

describe('wordlistContainerReducer', () => {
  it('returns the initial state', () => {
    expect(wordlistContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
