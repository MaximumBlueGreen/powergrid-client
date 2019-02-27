/**
 *
 * PuzzleContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import GridContainer from 'containers/GridContainer';
import PuzzleSelector from 'components/PuzzleSelector';
import {
  makeSelectPuzzleContainer,
  makeSelectPuzzleContainerData,
} from './selectors';
import reducer from './reducer';
import { loadPuzzles, selectPuzzle } from './actions';
import saga from './saga';

const PuzzleContainer = ({
  ui: { activePuzzleId, puzzleIds },
  data: puzzles,
  loadPuzzles,
  selectPuzzle,
}) => (
  <div>
    <GridContainer puzzleId={activePuzzleId} />
    <PuzzleSelector
      puzzles={puzzleIds.map(id => puzzles[id])}
      activePuzzleId={activePuzzleId}
      onPuzzleSelected={selectPuzzle}
    />
    <button type="button" onClick={loadPuzzles}>
      LOAD PUZZLES
    </button>
  </div>
);

PuzzleContainer.propTypes = {
  ui: PropTypes.shape({
    activePuzzleId: PropTypes.string.isRequired,
    puzzleIds: PropTypes.array.isRequired,
  }).isRequired,
  data: PropTypes.shape({}).isRequired,
  loadPuzzles: PropTypes.func.isRequired,
  selectPuzzle: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectPuzzleContainerData(),
  ui: makeSelectPuzzleContainer(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadPuzzles, selectPuzzle }, dispatch);
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'puzzleContainer', reducer });
const withSaga = injectSaga({ key: 'puzzleContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PuzzleContainer);
