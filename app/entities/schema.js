import { schema } from 'normalizr';

export const square = new schema.Entity('squares', undefined, {
  idAttribute: (value, parent) => `${parent.id}-${value.id}`,
});
export const puzzle = new schema.Entity(
  'puzzles',
  {
    squares: [square],
  },
  {
    processStrategy: value => ({
      ...value,
      id: String(value.id),
      squares: value.squares.map((s, i) => ({ ...s, id: i })),
    }),
  },
);
