const stateShape = {
  entities: {
    me: Object,
    puzzles: {
      byId: {
        Number: {
          squareIds: [String],
          size: {
            height: Number,
            width: Number,
          },
        },
      },
    },
    squares: {
      byId: {
        Number: {
          value: String,
          isBlack: Boolean,
          isCircled: Boolean,
          isShaded: Boolean,
        },
      },
    },
  },
  puzzleContainer: {
    activePuzzleId: String,
  },
  gridContainer: {
    focusedSquareId: String,
    focusedDirection: String,
  },
};

export default stateShape;

/*
 Actions:

 SET_ACTIVE_PUZZLE(id)

 TOGGLE_BLACK_SQUARE(squareId)


*/
