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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import WordListContainer from 'containers/WordListContainer';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
          overflowY: 'hidden',
        }}
      >
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
        <Grid container spacing={40} justify="center">
          <Grid item container xs={5}>
            <Grid item xs={12}>
              <TextField
                value={activePuzzleId && puzzles[activePuzzleId].title}
                placeholder="Title"
              />
            </Grid>
            <Grid
              item
              xs={12}
              lg={6}
              component={SyncStatus}
              isSyncing={isSyncing}
              lastSynced={lastSynced}
            />
            <Grid item xs={12} alignContent="center">
              {activePuzzleId && <GridContainer puzzleId={activePuzzleId} />}
            </Grid>
            <Grid
              item
              xs={12}
              component={PuzzleSelector}
              puzzles={puzzleIds.map(id => puzzles[id])}
              activePuzzleId={activePuzzleId}
              onPuzzleSelected={selectPuzzle}
            />
          </Grid>
          <Grid item xs={6}>
            <Tabs value="WordList">
              <Tab key="WordList" label="WordList" value="WordList" />
              <Tab key="Dictionary" label="Dictionary" value="Dictionary" />
              <Tab key="Puzzle Data" label="Puzzle Data" value="Puzzle Data" />
              <Tab key="Notes" label="Notes" value="Notes" />
            </Tabs>
            <WordListContainer />
          </Grid>
        </Grid>
      </div>
    );

    // return (
    //   <div
    //     style={{
    //       overflowX:
    //         'hidden' /* https://github.com/mui-org/material-ui/issues/7466 */,
    //     }}
    //   >
    //     <Paper>
    //       <Button type="button" color="primary" onClick={loadPuzzles}>
    //         LOAD PUZZLES
    //       </Button>
    //       <Button type="button" color="primary" onClick={savePuzzles}>
    //         SAVE PUZZLES
    //       </Button>
    //       <Button type="button" color="primary" onClick={createPuzzle}>
    //         CREATE PUZZLE
    //       </Button>
    //     </Paper>
    //     <Grid container spacing={24}>
    //       <Grid item container xs={6}>
    //         <Grid item component={Paper} xs={12}>
    //           <SyncStatus isSyncing={isSyncing} lastSynced={lastSynced} />
    //         </Grid>
    //         <Grid xs={12} item component={TextField}>
    //           Title
    //         </Grid>
    //         <Grid
    //           xs={12}
    //           item
    //           component={GridContainer}
    //           puzzleId={activePuzzleId}
    //         />
    //         <Grid
    //           xs={12}
    //           item
    //           component={PuzzleSelector}
    //           puzzles={puzzleIds.map(id => puzzles[id])}
    //           activePuzzleId={activePuzzleId}
    //           onPuzzleSelected={selectPuzzle}
    //         />
    //       </Grid>
    //     </Grid>
    //     <Grid item xs={6}>
    //       <Tabs centered value="WordList">
    //         <Tab key="WordList" label="WordList" value="WordList" />
    //         <Tab key="Dictionary" label="Dictionary" value="Dictionary" />
    //         <Tab key="PuzzleData" label="PuzzleData" value="PuzzleData" />
    //         <Tab key="Notes" label="Notes" value="Notes" />
    //       </Tabs>
    //       <WordListContainer />
    //     </Grid>
    //   </Grd
    //   </div>
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
