import { fromJS } from 'immutable';
import cluesContainerReducer from '../reducer';

describe('cluesContainerReducer', () => {
  it('returns the initial state', () => {
    expect(cluesContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
