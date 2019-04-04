import { schema } from 'normalizr';

export const square = new schema.Entity('squares', undefined, {
  idAttribute: (value, parent) => `${parent.id}-${value.id}`,
});
export const clue = new schema.Entity('clues', undefined, {
  idAttribute: (value, parent) => `${parent.id}-${value.id}`,
});
export const puzzle = new schema.Entity(
  'puzzles',
  {
    squares: [square],
    clues: [clue],
  },
  {
    processStrategy: value => ({
      ...value,
      id: String(value.id),
      squares: value.squares.map((s, i) => ({ ...s, id: i })),
      clues: value.clues ? value.clues.map((c, i) => ({ ...c, id: i })) : [],
    }),
  },
);
export const user = new schema.Entity('users');
export const entry = new schema.Entity(
  'entries',
  {
    user,
  },
  {
    processStrategy: value => ({
      ...value,
      id: String(value.id),
    }),
  },
);
