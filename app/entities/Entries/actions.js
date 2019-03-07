import { ENTRY_UPDATED } from './constants';

export function updateEntry(id, entry) {
  return {
    type: ENTRY_UPDATED,
    id,
    entry,
  };
}
