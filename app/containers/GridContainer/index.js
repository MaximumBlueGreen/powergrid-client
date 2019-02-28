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
import Grid from 'components/Grid';
import { toggleBlackSquare, updateSquareValue } from 'entities/Squares/actions';
import { focusSquare } from './actions';
import {
  makeSelectGridContainer,
  makeSelectGridContainerDomain,
} from './selectors';
import reducer from './reducer';
import { ACROSS } from './constants';

function GridContainer({
  data: { squares, size },
  ui: { focusedSquareIndex, focusedDirection },
  toggleBlackSquare,
  updateSquareValue,
  focusSquare,
}) {
  const focusedSquareId = squares[focusedSquareIndex].id;
  const focusSquareClamped = i =>
    focusSquare(clamp(i, 0, size.width * size.height - 1));
  return (
    <Grid
      squares={squares}
      size={size}
      focusedSquareId={focusedSquareId}
      onSquareClicked={focusSquareClamped}
      onSquareDoubleClicked={toggleBlackSquare}
      onKeyPressed={({ key, keyCode }) => {
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
          default:
            updateSquareValue(focusedSquareId, key);
            if (focusedDirection === ACROSS) {
              return focusSquareClamped(focusedSquareIndex + 1);
            }
            return focusSquareClamped(focusedSquareIndex + size.width);
        }
      }}
    />
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
};

const mapStateToProps = createStructuredSelector({
  ui: makeSelectGridContainerDomain(),
  data: makeSelectGridContainer(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { toggleBlackSquare, updateSquareValue, focusSquare },
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
