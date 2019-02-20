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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Grid from 'components/Grid';
import { toggleBlackSquare } from './actions';
import makeSelectGridContainer from './selectors';
import reducer from './reducer';
import saga from './saga';

function GridContainer({
  gridContainer: { squares, dimensions },
  toggleBlackSquare,
}) {
  return (
    <Grid
      squares={squares}
      size={dimensions}
      onSquareClicked={toggleBlackSquare}
    />
  );
}

GridContainer.propTypes = {
  gridContainer: PropTypes.shape({
    squares: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    dimensions: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }),
  }).isRequired,
  toggleBlackSquare: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  gridContainer: makeSelectGridContainer(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleBlackSquare }, dispatch);
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
