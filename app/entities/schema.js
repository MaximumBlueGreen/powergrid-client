import { schema } from 'normalizr';
import { SYMMETRY_MODE_DIAGONAL } from 'entities/Puzzles/constants';

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
      symmetry: value.symmetry || SYMMETRY_MODE_DIAGONAL,
    }),
    idAttribute: value => String(value.id),
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
