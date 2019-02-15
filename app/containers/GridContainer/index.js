/**
 *
 * GridContainer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Grid from 'components/Grid';
import makeSelectGridContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prop-types */
function GridContainer({ gridContainer: { squares, dimensions } }) {
  console.log('rendering the grid container', squares, dimensions);
  return (
    <Grid
      squares={squares.allIds.map(id => squares.byId[id])}
      size={dimensions}
    />
  );
}

GridContainer.propTypes = {
  // gridContainer: PropTypes.object({}).isRequired,
  // dispatch: PropTypes.func.isRequired,
  // squares: PropTypes.arrayOf(PropTypes.object).isRequired,
  // dimensions: PropTypes.object({
  //   height: PropTypes.number.isRequired,
  //   width: PropTypes.number.isRequired,
  // }),
};

const mapStateToProps = createStructuredSelector({
  gridContainer: makeSelectGridContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'gridContainer', reducer });
const withSaga = injectSaga({ key: 'gridContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(GridContainer);
