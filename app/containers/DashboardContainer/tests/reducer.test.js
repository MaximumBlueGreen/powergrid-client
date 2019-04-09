import { fromJS } from 'immutable';
import dashboardContainerReducer from '../reducer';

describe('dashboardContainerReducer', () => {
  it('returns the initial state', () => {
    expect(dashboardContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
