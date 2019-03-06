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
import SyncStatus from 'components/SyncStatus';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import WordListContainer from 'containers/WordListContainer';
import {
  makeSelectPuzzleContainer,
  makeSelectPuzzleContainerData,
} from './selectors';
import reducer from './reducer';
import {
  loadPuzzles,
  selectPuzzle,
  savePuzzles,
  createPuzzle,
} from './actions';
import saga from './saga';

class PuzzleContainer extends React.Component {
  componentDidMount() {
    this.props.loadPuzzles();
  }

  render() {
    const {
      ui: { activePuzzleId, puzzleIds, isSyncing, lastSynced },
      data: puzzles,
      loadPuzzles,
      selectPuzzle,
      savePuzzles,
      createPuzzle,
    } = this.props;
    return (
      <div
        style={{
          overflowX:
            'hidden' /* https://github.com/mui-org/material-ui/issues/7466 */,
        }}
      >
        <Grid container spacing={24} justify="center">
          <Grid item xs={6}>
            <Paper>
              <Button type="button" color="primary" onClick={loadPuzzles}>
                LOAD PUZZLES
              </Button>
              <Button type="button" color="primary" onClick={savePuzzles}>
                SAVE PUZZLES
              </Button>
              <Button type="button" color="primary" onClick={createPuzzle}>
                CREATE PUZZLE
              </Button>
            </Paper>
            <Paper>
              <SyncStatus isSyncing={isSyncing} lastSynced={lastSynced} />
            </Paper>
            {activePuzzleId && <GridContainer puzzleId={activePuzzleId} />}
            <PuzzleSelector
              puzzles={puzzleIds.map(id => puzzles[id])}
              activePuzzleId={activePuzzleId}
              onPuzzleSelected={selectPuzzle}
            />
          </Grid>
          <Grid item xs={6}>
            <WordListContainer />
          </Grid>
        </Grid>
      </div>
    );
  }
}

PuzzleContainer.propTypes = {
  ui: PropTypes.shape({
    activePuzzleId: PropTypes.string,
    puzzleIds: PropTypes.array.isRequired,
  }).isRequired,
  data: PropTypes.shape({}).isRequired,
  loadPuzzles: PropTypes.func.isRequired,
  selectPuzzle: PropTypes.func.isRequired,
  savePuzzles: PropTypes.func.isRequired,
  createPuzzle: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectPuzzleContainerData(),
  ui: makeSelectPuzzleContainer(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { loadPuzzles, selectPuzzle, savePuzzles, createPuzzle },
    dispatch,
  );
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
