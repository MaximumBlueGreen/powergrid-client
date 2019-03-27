/**
 *
 * GridContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { clamp } from 'lodash';
import injectReducer from 'utils/injectReducer';
import GridComponent from 'components/Grid';
import {
  toggleBlackSquare,
  updateSquareValue,
  clearSquares,
} from 'entities/Squares/actions';
import { ActionCreators } from 'redux-undo';
import Grid from '@material-ui/core/Grid';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

import { focusSquare } from './actions';
import {
  makeSelectGridContainer,
  makeSelectGridContainerDomain,
  makeSelectGridContainerFocusedWord,
} from './selectors';
import reducer from './reducer';
import { ACROSS } from './constants';

function GridContainer({
  data: { squares, size },
  ui: { focusedSquareIndex, focusedDirection },
  focusedWord,
  toggleBlackSquare,
  updateSquareValue,
  focusSquare,
  undo,
  redo,
  clearSquares,
}) {
  const focusedSquareId = squares[focusedSquareIndex].id;
  const focusSquareClamped = i =>
    focusSquare(clamp(i, 0, size.width * size.height - 1));
  return (
    <Grid container alignItems="flex-start">
      <Grid item xs={12}>
        <Grid item xs={12}>
          <IconButton color="primary">
            <UndoIcon onClick={undo} />
          </IconButton>
          <IconButton color="primary">
            <RedoIcon onClick={redo} />
          </IconButton>
          <IconButton color="primary">
            <ClearIcon onClick={() => clearSquares(squares.map(s => s.id))} />
          </IconButton>
        </Grid>
        <GridComponent
          squares={squares}
          size={size}
          focusedSquareId={focusedSquareId}
          focusedWordSquareIds={focusedWord.map(s => s.id)}
          onSquareClicked={focusSquareClamped}
          onSquareDoubleClicked={toggleBlackSquare}
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
                if (focusedDirection === ACROSS) {
                  focusSquareClamped(focusedSquareIndex - 1);
                } else {
                  focusSquareClamped(focusedSquareIndex - size.width);
                }
                return updateSquareValue(focusedSquareId, '');
              case 37 /* Left Arrow */:
                return focusSquareClamped(focusedSquareIndex - 1);
              case 38 /* Up Arrow */:
                return focusSquareClamped(focusedSquareIndex - size.width);
              case 39 /* Right Arrow */:
                return focusSquareClamped(focusedSquareIndex + 1);
              case 40 /* Down Arrow */:
                return focusSquareClamped(focusedSquareIndex + size.width);
              case 190:
                return toggleBlackSquare(focusedSquareId);
              default:
                if (keyCode > 47 && keyCode < 91) {
                  updateSquareValue(focusedSquareId, key);
                  if (focusedDirection === ACROSS) {
                    return focusSquareClamped(focusedSquareIndex + 1);
                  }
                  return focusSquareClamped(focusedSquareIndex + size.width);
                }
            }
            return false;
          }}
        />
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
    focusedSquareIndex: PropTypes.number.isRequired,
    focusedDirection: PropTypes.string.isRequired,
  }).isRequired,
  focusSquare: PropTypes.func.isRequired,
  toggleBlackSquare: PropTypes.func.isRequired,
  updateSquareValue: PropTypes.func.isRequired,
  undo: PropTypes.func.isRequired,
  redo: PropTypes.func.isRequired,
  clearSquares: PropTypes.func.isRequired,
  focusedWord: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ui: makeSelectGridContainerDomain(),
  data: makeSelectGridContainer(),
  focusedWord: makeSelectGridContainerFocusedWord(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggleBlackSquare,
      updateSquareValue,
      focusSquare,
      undo: ActionCreators.undo,
      redo: ActionCreators.redo,
      clearSquares,
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
