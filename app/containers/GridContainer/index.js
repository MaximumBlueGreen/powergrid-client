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

import injectReducer from 'utils/injectReducer';
import Grid from 'components/Grid';
import { toggleBlackSquare, updateSquareValue } from 'entities/Squares/actions';
import { focusSquare } from './actions';
import {
  makeSelectGridContainer,
  makeSelectGridContainerDomain,
} from './selectors';
import reducer from './reducer';

function GridContainer({
  data: { squares, size },
  ui: { focusedSquareIndex },
  toggleBlackSquare,
  updateSquareValue,
  focusSquare,
}) {
  const focusedSquareId = squares[focusedSquareIndex].id;
  return (
    <Grid
      squares={squares}
      size={size}
      focusedSquareId={focusedSquareId}
      onSquareClicked={focusSquare}
      onSquareDoubleClicked={toggleBlackSquare}
      onKeyPressed={({ key, keyCode }) => {
        switch (keyCode) {
          case 8 /* Backspace */:
            focusSquare(focusedSquareIndex - 1);
            return updateSquareValue(focusedSquareId, '');
          case 37 /* Left Arrow */:
            return focusSquare(focusedSquareIndex - 1);
          case 38 /* Up Arrow */:
            return focusSquare(focusedSquareIndex - size.width);
          case 39 /* Right Arrow */:
            return focusSquare(focusedSquareIndex + 1);
          case 40 /* Down Arrow */:
            return focusSquare(focusedSquareIndex + size.width);
          default:
            updateSquareValue(focusedSquareId, key);
            return focusSquare(
              (focusedSquareIndex + 1) % (size.width * size.height),
            );
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
