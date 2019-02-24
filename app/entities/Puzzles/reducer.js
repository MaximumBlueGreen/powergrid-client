import { fromJS } from 'immutable';
import { times } from 'lodash';
const initialState = fromJS({
  puzzle_id_1: {
    squares: times(225, String),
    size: {
      height: 15,
      width: 15,
    },
  },
});

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
