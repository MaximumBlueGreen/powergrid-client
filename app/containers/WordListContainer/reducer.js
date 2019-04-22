import { fromJS } from 'immutable';
import { ENTITIES_LOADED } from 'entities/constants';
import { FILTER_PATTERN_UPDATED, WORDLIST_LOADED } from './constants';

export const initialState = fromJS({
  loading: true,
  entryIds: [],
  filterPattern: '$*^',
  limit: 50,
  offset: 0,
  moreToLoad: true,
});

function wordlistContainerReducer(state = initialState, action) {
  switch (action.type) {
    case ENTITIES_LOADED: {
      if (action.entityType === 'ENTRY') {
        const limit = state.get('limit');
        const offset = state.get('offset');
        return state
          .set('moreToLoad', action.result.length === limit)
          .update('entryIds', entryIds =>
            entryIds.splice(offset, limit, ...action.result.map(String)),
          )
          .set('offset', state.get('entryIds').size + action.result.length)
          .set('loading', false);
      }
      return state;
    }
    case FILTER_PATTERN_UPDATED:
      return state
        .set('filterPattern', action.pattern.toUpperCase())
        .set('offset', 0)
        .set('entryIds', fromJS([]))
        .set('loading', true)
        .set('moreToLoad', true);
    case WORDLIST_LOADED:
      return state.set('loading', true).set('moreToLoad', true);
    default:
      return state;
  }
}

export default wordlistContainerReducer;
