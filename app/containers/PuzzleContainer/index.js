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
import CreatePuzzleModal from 'containers/CreatePuzzleModal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styled from 'styled-components';
import { updatePuzzleTitle } from 'entities/Puzzles/actions';
import { openModal } from 'containers/CreatePuzzleModal/actions';
import {
  makeSelectPuzzleContainer,
  makeSelectPuzzleContainerData,
} from './selectors';
import reducer from './reducer';
import {
  loadPuzzles,
  selectPuzzle,
  savePuzzles,
  uploadPuzzle,
} from './actions';

import saga from './saga';

const PuzzleContainerWrapper = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
  font-size: ${props => props.theme.typography.fontSize}px;
  font-family: ${props => props.theme.typography.fontFamily};
`;

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
      openModal,
      updatePuzzleTitle,
      uploadPuzzle,
    } = this.props;

    return (
      <PuzzleContainerWrapper>
        <CreatePuzzleModal />
        <Grid
          component={Paper}
          container
          justify="space-evenly"
          alignItems="center"
          spacing={8}
        >
          <Grid item xs={3} container>
            <Grid
              item
              component={Button}
              xs={4}
              type="button"
              color="primary"
              onClick={openModal}
            >
              NEW PUZZLE
            </Grid>
            <Grid
              item
              component={Button}
              xs={4}
              type="button"
              color="primary"
              onClick={savePuzzles}
            >
              SAVE PUZZLES
            </Grid>
            <Grid
              item
              component={Button}
              xs={4}
              type="button"
              color="primary"
              onClick={loadPuzzles}
            >
              LOAD PUZZLES
            </Grid>
          </Grid>
          <Grid
            item
            xs={5}
            component={PuzzleSelector}
            puzzles={puzzleIds.map(id => puzzles[id])}
            activePuzzleId={activePuzzleId}
            onPuzzleSelected={selectPuzzle}
          />

          <Grid item xs={2}>
            <input
              type="file"
              onChange={e => uploadPuzzle(e.target.files[0])}
              accept=".puz"
            />
          </Grid>
        </Grid>
        <Grid container justify="center" alignItems="flex-start" spacing={16}>
          <Grid item container xs={11} md={5}>
            <Grid item xs={12}>
              <TextField
                value={activePuzzleId && puzzles[activePuzzleId].title}
                placeholder="Untitled"
                margin="normal"
                name="title"
                onChange={e =>
                  updatePuzzleTitle(activePuzzleId, e.target.value)
                }
              />
            </Grid>
            <Grid
              item
              xs={12}
              component={SyncStatus}
              isSyncing={isSyncing}
              lastSynced={lastSynced}
            />
            <Grid item xs={12}>
              {activePuzzleId && <GridContainer puzzleId={activePuzzleId} />}
            </Grid>
          </Grid>
          <Grid item xs={11} md={6}>
            <Tabs value="WordList">
              <Tab key="WordList" label="WordList" value="WordList" />
              <Tab key="Dictionary" label="Dictionary" value="Dictionary" />
              <Tab key="Puzzle Data" label="Puzzle Data" value="Puzzle Data" />
              <Tab key="Notes" label="Notes" value="Notes" />
            </Tabs>
            <WordListContainer />
          </Grid>
        </Grid>
      </PuzzleContainerWrapper>
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
  updatePuzzleTitle: PropTypes.func.isRequired,
  uploadPuzzle: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectPuzzleContainerData(),
  ui: makeSelectPuzzleContainer(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadPuzzles,
      selectPuzzle,
      savePuzzles,
      updatePuzzleTitle,
      uploadPuzzle,
      openModal,
    },
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
