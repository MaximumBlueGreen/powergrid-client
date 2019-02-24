/**
 *
 * PuzzleContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import GridContainer from 'containers/GridContainer';
import makeSelectPuzzleContainer from './selectors';
import reducer from './reducer';

function PuzzleContainer({ puzzleContainer: { activePuzzleId } }) {
  return <GridContainer puzzleId={activePuzzleId} />;
}

PuzzleContainer.propTypes = {
  puzzleContainer: PropTypes.shape({
    activePuzzleId: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  puzzleContainer: makeSelectPuzzleContainer(),
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

const withReducer = injectReducer({ key: 'puzzleContainer', reducer });

export default compose(
  withReducer,
  withConnect,
)(PuzzleContainer);
