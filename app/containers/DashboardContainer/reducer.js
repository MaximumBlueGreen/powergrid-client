/*
 *
 * DashboardContainer reducer
 *
 */

import { fromJS } from 'immutable';

export const initialState = fromJS({});

function dashboardContainerReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default dashboardContainerReducer;
