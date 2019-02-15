import { fromJS } from 'immutable';
import gridContainerReducer from '../reducer';

describe('gridContainerReducer', () => {
  it('returns the initial state', () => {
    expect(gridContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
