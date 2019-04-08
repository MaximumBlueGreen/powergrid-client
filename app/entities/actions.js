import { ENTITIES_LOADED } from './constants';

export function loadEntities(entities, result, other) {
  return {
    type: ENTITIES_LOADED,
    entities,
    result,
    ...other,
  };
}
