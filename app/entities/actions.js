import { ENTITIES_LOADED } from './constants';

export function loadEntities(entities) {
  return {
    type: ENTITIES_LOADED,
    entities,
  };
}
