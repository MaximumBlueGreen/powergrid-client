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
import { toggleBlackSquares } from 'entities/Puzzles/actions';
import { ActionCreators } from 'redux-undo';
import Grid from '@material-ui/core/Grid';

import GridActionBar from 'components/GridActionBar';
import {
  focusSquare,
  toggleClickMode,
  toggleSymmetryMode,
  setHighlightedSquareIds,
  addHighlightedSquareIds,
} from './actions';
import {
  makeSelectGridContainer,
  makeSelectGridContainerDomain,
  makeSelectGridContainerFocusedWord,
} from './selectors';
import reducer from './reducer';
import {
  ACROSS,
  DOWN,
  CLICK_MODE_FILL,
  CLICK_MODE_BLACK_SQUARE,
  SYMMETRY_MODE_DIAGONAL,
} from './constants';

const StyledGridComponentWrapper = styled.div`
  max-height: 70vh;
  max-width: 70vh;
`;

function GridContainer({
  data: { squares, size },
  ui: {
    focusedSquareId,
    focusedDirection,
    clickMode,
    symmetryMode,
    highlightedSquareIds,
  },
  focusedWord,
  toggleBlackSquares,
  setBlackSquare,
  toggleClickMode,
  updateSquareValue,
  focusSquare,
  undo,
  redo,
  clearSquares,
  toggleSymmetryMode,
  setHighlightedSquareIds,
  addHighlightedSquareIds,
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
      (symmetryMode === SYMMETRY_MODE_DIAGONAL && [
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
          undo={undo}
          redo={redo}
          toggleClickMode={toggleClickMode}
          clearSquares={() =>
            clearSquares(
              highlightedSquareIds.length > 0
                ? highlightedSquareIds
                : squares.map(s => s.id),
            )
          }
          clickMode={clickMode}
          toggleSymmetryMode={toggleSymmetryMode}
          symmetryMode={symmetryMode}
        />
        <StyledGridComponentWrapper>
          <GridComponent
            squares={squares}
            size={size}
            focusedSquareId={focusedSquareId}
            focusedWordSquareIds={focusedWord.map(s => s.id)}
            highlightedSquareIds={highlightedSquareIds}
            onSquareClicked={({ metaKey }, id) => {
              if (metaKey) {
                return addHighlightedSquareIds([id]);
              }
              return clickMode === CLICK_MODE_FILL
                ? focusSquare(id)
                : toggleBlackSquares([id], symmetryMode);
            }}
            setHighlightedSquareIds={setHighlightedSquareIds}
            onHighlightEnd={squareIds =>
              clickMode === CLICK_MODE_FILL
                ? addHighlightedSquareIds(squareIds)
                : toggleBlackSquares(squareIds, symmetryMode)
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
                  focusSquare(previousSquareId(focusedDirection));

                  if (clickMode === CLICK_MODE_BLACK_SQUARE) {
                    return setBlackSquareWithSymmetry(focusedSquareId, false);
                  }
                  return updateSquareValue(focusedSquareId, '');

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
                  focusSquare(nextSquareId(focusedDirection));

                  if (clickMode === CLICK_MODE_BLACK_SQUARE) {
                    return setBlackSquareWithSymmetry(focusedSquareId);
                  }
                  return updateSquareValue(focusedSquareId, '');

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
                    symmetryMode,
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
    symmetryMode: PropTypes.string.isRequired,
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
  toggleSymmetryMode: PropTypes.func.isRequired,
  setHighlightedSquareIds: PropTypes.func.isRequired,
  addHighlightedSquareIds: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ui: makeSelectGridContainerDomain(),
  data: makeSelectGridContainer(),
  focusedWord: makeSelectGridContainerFocusedWord(),
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
      toggleSymmetryMode,
      setHighlightedSquareIds,
      addHighlightedSquareIds,
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
