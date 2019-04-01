import { ENTITIES_LOADED } from './constants';

export function loadEntities(entities, result) {
  return {
    type: ENTITIES_LOADED,
    entities,
    result,
  };
}
