/**
 *
 * GridContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { find, findLast } from 'lodash';
import injectReducer from 'utils/injectReducer';
import GridComponent from 'components/Grid';
import {
  setBlackSquare,
  updateSquareValue,
  clearSquares,
} from 'entities/Squares/actions';
import {
  toggleBlackSquares,
  setPuzzleSymmetry,
} from 'entities/Puzzles/actions';
import { ActionCreators } from 'redux-undo';
import Grid from '@material-ui/core/Grid';

import GridActionBar from 'components/GridActionBar';
import { SYMMETRY_MODE_DIAGONAL } from 'entities/Puzzles/constants';
import { selectFutureLength, selectPastLength } from 'entities/selectors';
import { makeSelectWords } from 'containers/CluesContainer/selectors';
import {
  focusSquare,
  toggleClickMode,
  setHighlightedSquareIds,
  addHighlightedSquareIds,
  autoFill,
} from './actions';
import {
  makeSelectGridContainer,
  makeSelectGridContainerDomain,
  makeSelectGridContainerFocusedWord,
  makeSelectIllegalSquareIds,
} from './selectors';
import reducer from './reducer';
import {
  ACROSS,
  DOWN,
  CLICK_MODE_FILL,
  CLICK_MODE_BLACK_SQUARE,
} from './constants';

const StyledGridComponentWrapper = styled.div`
  max-height: 75vh;
  max-width: 75vh;
`;

function GridContainer({
  data: { squares, size, symmetry },
  ui: { focusedSquareId, focusedDirection, clickMode, highlightedSquareIds },
  focusedWord,
  toggleBlackSquares,
  setBlackSquare,
  toggleClickMode,
  updateSquareValue,
  focusSquare,
  undo,
  redo,
  clearSquares,
  setPuzzleSymmetry,
  setHighlightedSquareIds,
  addHighlightedSquareIds,
  puzzleId,
  illegalSquareIds,
  autoFill,
  futureLength,
  pastLength,
  words,
}) {
  const focusedSquareIndex = squares.findIndex(s => s.id === focusedSquareId);
  const focusedSquare = squares[focusedSquareIndex];

  const nextSquareId = direction => {
    if (direction === ACROSS) {
      return focusedSquareIndex === squares.length - 1
        ? focusedSquareId
        : squares[focusedSquareIndex + 1].id;
    }
    return focusedSquareIndex >= squares.length - size.width
      ? focusedSquareId
      : squares[focusedSquareIndex + size.width].id;
  };

  const previousSquareId = direction => {
    if (direction === ACROSS) {
      return focusedSquareIndex === 0
        ? focusedSquareId
        : squares[focusedSquareIndex - 1].id;
    }
    return focusedSquareIndex < size.width
      ? focusedSquareId
      : squares[focusedSquareIndex - size.width].id;
  };

  const setBlackSquareWithSymmetry = (id, isBlack) => {
    setBlackSquare(
      id,
      (symmetry === SYMMETRY_MODE_DIAGONAL && [
        squares[
          size.height * size.width - squares.findIndex(s => s.id === id) - 1
        ].id,
      ]) ||
        [],
      isBlack,
    );
  };

  return (
    <Grid container alignItems="flex-start">
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          component={GridActionBar}
          canUndo={pastLength > 0}
          canRedo={futureLength > 0}
          undo={undo}
          redo={redo}
          wordCount={
            Object.keys(words.across).length + Object.keys(words.down).length
          }
          blackSquareCount={squares.filter(s => s.isBlack).length}
          toggleClickMode={toggleClickMode}
          clearSquares={() =>
            clearSquares(
              highlightedSquareIds.length > 0
                ? highlightedSquareIds
                : squares.map(s => s.id),
            )
          }
          clickMode={clickMode}
          setSymmetryMode={symmetry => setPuzzleSymmetry(puzzleId, symmetry)}
          symmetryMode={symmetry}
          autoFill={autoFill}
        />
        <StyledGridComponentWrapper>
          <GridComponent
            squares={squares}
            size={size}
            focusedSquareId={focusedSquareId}
            focusedWordSquareIds={focusedWord.map(s => s.id)}
            highlightedSquareIds={highlightedSquareIds}
            illegalSquareIds={illegalSquareIds}
            onSquareClicked={({ metaKey }, id) => {
              if (metaKey) {
                return addHighlightedSquareIds([id]);
              }
              return clickMode === CLICK_MODE_FILL
                ? focusSquare(id)
                : toggleBlackSquares([id], symmetry);
            }}
            setHighlightedSquareIds={setHighlightedSquareIds}
            onHighlightEnd={squareIds =>
              clickMode === CLICK_MODE_FILL
                ? addHighlightedSquareIds(squareIds)
                : toggleBlackSquares(squareIds, symmetry)
            }
            onKeyPressed={e => {
              const { keyCode, metaKey, key, shiftKey } = e;
              e.preventDefault();
              if (metaKey && keyCode === 90 && !shiftKey) {
                return undo();
              }
              if (
                (metaKey && keyCode === 89) ||
                (metaKey && keyCode === 90 && shiftKey)
              ) {
                return redo();
              }
              switch (keyCode) {
                case 8 /* Backspace */:
                  if (clickMode === CLICK_MODE_BLACK_SQUARE) {
                    setBlackSquareWithSymmetry(focusedSquareId, false);
                  } else {
                    updateSquareValue(focusedSquareId, '');
                  }
                  return focusSquare(previousSquareId(focusedDirection));

                case 9 /* TAB */:
                case 13 /* ENTER */: {
                  const directionKey =
                    focusedDirection === ACROSS ? 'acrossNumber' : 'downNumber';
                  const relevantSquares = squares.filter(
                    s => s.number && s.number === s[directionKey],
                  );
                  const previous = findLast(
                    relevantSquares,
                    s => s[directionKey] < focusedSquare[directionKey],
                  );
                  const next = find(
                    relevantSquares,
                    s => s[directionKey] > focusedSquare[directionKey],
                  );

                  if ((shiftKey && !previous) || (!shiftKey && !next)) {
                    return false;
                  }

                  return focusSquare((shiftKey ? previous : next).id);
                }
                case 32 /* Space */:
                  if (clickMode === CLICK_MODE_BLACK_SQUARE) {
                    setBlackSquareWithSymmetry(focusedSquareId);
                  } else {
                    updateSquareValue(focusedSquareId, '');
                  }
                  return focusSquare(nextSquareId(focusedDirection));

                case 37 /* Left Arrow */:
                  return focusedDirection === ACROSS
                    ? focusSquare(previousSquareId(ACROSS))
                    : focusSquare(focusedSquareId);
                case 38 /* Up Arrow */:
                  return focusedDirection === ACROSS
                    ? focusSquare(focusedSquareId)
                    : focusSquare(previousSquareId(DOWN));
                case 39 /* Right Arrow */:
                  return focusedDirection === ACROSS
                    ? focusSquare(nextSquareId(ACROSS))
                    : focusSquare(focusedSquareId);
                case 40 /* Down Arrow */:
                  return focusedDirection === ACROSS
                    ? focusSquare(focusedSquareId)
                    : focusSquare(nextSquareId(DOWN));
                case 190 /* Period */:
                  return toggleBlackSquares(
                    highlightedSquareIds.length > 0
                      ? highlightedSquareIds
                      : [focusedSquareId],
                    symmetry,
                  );
                default:
                  if (keyCode > 47 && keyCode < 91) {
                    updateSquareValue(focusedSquareId, key);
                    return focusSquare(nextSquareId(focusedDirection));
                  }
              }
              return false;
            }}
          />
        </StyledGridComponentWrapper>
      </Grid>
    </Grid>
  );
}

GridContainer.propTypes = {
  data: PropTypes.shape({
    squares: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    size: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }),
  }).isRequired,
  ui: PropTypes.shape({
    focusedSquareId: PropTypes.string,
    focusedDirection: PropTypes.string.isRequired,
    clickMode: PropTypes.string.isRequired,
    highlightedSquareIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  focusSquare: PropTypes.func.isRequired,
  toggleBlackSquares: PropTypes.func.isRequired,
  setBlackSquare: PropTypes.func.isRequired,
  updateSquareValue: PropTypes.func.isRequired,
  undo: PropTypes.func.isRequired,
  redo: PropTypes.func.isRequired,
  clearSquares: PropTypes.func.isRequired,
  focusedWord: PropTypes.array.isRequired,
  toggleClickMode: PropTypes.func.isRequired,
  setPuzzleSymmetry: PropTypes.func.isRequired,
  setHighlightedSquareIds: PropTypes.func.isRequired,
  addHighlightedSquareIds: PropTypes.func.isRequired,
  puzzleId: PropTypes.string.isRequired,
  illegalSquareIds: PropTypes.array.isRequired,
  autoFill: PropTypes.func.isRequired,
  pastLength: PropTypes.number.isRequired,
  futureLength: PropTypes.number.isRequired,
  words: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ui: makeSelectGridContainerDomain(),
  data: makeSelectGridContainer(),
  focusedWord: makeSelectGridContainerFocusedWord(),
  illegalSquareIds: makeSelectIllegalSquareIds(),
  futureLength: selectFutureLength,
  pastLength: selectPastLength,
  words: makeSelectWords(),
});

function mapDispatchToProps(dispatch, { puzzleId }) {
  return bindActionCreators(
    {
      toggleBlackSquares: (ids, symmetry) =>
        toggleBlackSquares(puzzleId, ids, symmetry),
      setBlackSquare,
      updateSquareValue,
      focusSquare,
      undo: ActionCreators.undo,
      redo: ActionCreators.redo,
      clearSquares,
      toggleClickMode,
      setPuzzleSymmetry,
      setHighlightedSquareIds,
      addHighlightedSquareIds,
      autoFill,
    },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'gridContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(GridContainer);
