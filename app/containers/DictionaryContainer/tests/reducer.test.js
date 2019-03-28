import { fromJS } from 'immutable';
import dictionaryContainerReducer from '../reducer';

describe('dictionaryContainerReducer', () => {
  it('returns the initial state', () => {
    expect(dictionaryContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
