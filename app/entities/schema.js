import { schema } from 'normalizr';

export const square = new schema.Entity('squares', undefined, {
  idAttribute: (value, parent) => `${parent.id}-${value.id}`,
});
export const clue = new schema.Entity('clues');
export const puzzle = new schema.Entity(
  'puzzles',
  {
    squares: [square],
    clues: {
      across: new schema.Values(clue),
      down: new schema.Values(clue),
    },
  },
  {
    processStrategy: value => ({
      ...value,
      id: String(value.id),
      squares: value.squares.map((s, i) => ({ ...s, id: i })),
      clues: {
        across: value.clues && value.clues.across ? value.clues.across : {},
        down: value.clues && value.clues.down ? value.clues.down : {},
      },
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
