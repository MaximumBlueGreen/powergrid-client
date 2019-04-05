import { schema } from 'normalizr';
import { mapValues } from 'lodash';

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
      across: schema.Values(clue),
      down: schema.Values(clue),
    },
  },
  {
    processStrategy: value => ({
      ...value,
      id: String(value.id),
      squares: value.squares.map((s, i) => ({ ...s, id: i })),
      clues: {
        across: mapValues(
          value.clues && value.clues.across ? value.clues.across : {},
          (number, clue) => ({
            ...clue,
            id: value.clues && value.clues.down,
          }),
        ),
        down: mapValues(
          value.clues && value.clues.down ? value.clues.down : {},
          (number, clue) => ({
            ...clue,
            id: `${number}-Down`,
          }),
        ),
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
