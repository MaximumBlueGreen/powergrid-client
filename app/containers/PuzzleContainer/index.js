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
import CluesContainer from 'containers/CluesContainer';
import PuzzleSelector from 'components/PuzzleSelector';
import SyncStatus from 'components/SyncStatus';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import WordListContainer from 'containers/WordListContainer';
import DictionaryContainer from 'containers/DictionaryContainer';
import CreatePuzzleModal from 'containers/CreatePuzzleModal';
import Notes from 'components/Notes';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { updatePuzzleTitle, editPuzzleNotes } from 'entities/Puzzles/actions';
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
  handleTabChange,
} from './actions';

import saga from './saga';

const PuzzleContainerWrapper = styled.div`
  font-size: ${props => props.theme.typography.fontSize}px;
  font-family: ${props => props.theme.typography.fontFamily};
`;

const styles = theme => ({
  conditionalSticky: {
    [theme.breakpoints.up('md')]: {
      position: 'sticky',
      top: 0,
    },
  },
});

class PuzzleContainer extends React.Component {
  componentDidMount() {
    this.props.loadPuzzles(this.props.puzzleId);
  }

  render() {
    const {
      ui: {
        activePuzzleId,
        puzzleIds,
        isSyncing,
        lastSynced,
        loading,
        tabValue,
      },
      data: puzzles,
      // loadPuzzles,
      selectPuzzle,
      // savePuzzles,
      openModal,
      updatePuzzleTitle,
      editPuzzleNotes,
      // uploadPuzzle,
      handleTabChange,
      classes: { conditionalSticky },
    } = this.props;

    return (
      <PuzzleContainerWrapper>
        <CreatePuzzleModal forceOpen={!loading && puzzleIds.length === 0} />
        <Grid
          component={Paper}
          square
          container
          justify="space-between"
          alignItems="center"
          style={{ paddingRight: '8px' }}
        >
          {/* <Grid item xs={3} container>
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
          </Grid> */}
          <Grid item xs={10}>
            <PuzzleSelector
              puzzles={puzzleIds.map(id => puzzles[id])}
              activePuzzleId={activePuzzleId}
              onPuzzleSelected={selectPuzzle}
            />
          </Grid>
          <Grid
            item
            component={Button}
            type="button"
            color="primary"
            onClick={openModal}
            variant="outlined"
          >
            NEW PUZZLE
          </Grid>
          {/* <Grid item xs={2}>
            <input
              type="file"
              onChange={e => uploadPuzzle(e.target.files[0])}
              accept=".puz"
            />
        </Grid> */}
        </Grid>
        <Grid container justify="center" alignItems="flex-start" spacing={0}>
          {activePuzzleId && (
            <Grid className={conditionalSticky} item container xs={11} md={5}>
              <Grid item xs={12}>
                <TextField
                  value={puzzles[activePuzzleId].title || ''}
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
                <GridContainer puzzleId={activePuzzleId} />
              </Grid>
            </Grid>
          )}
          <Grid item xs={11} md={6}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab key="Clues" label="Clues" value="Clues" />
              <Tab key="WordList" label="Word List" value="WordList" />
              <Tab key="Dictionary" label="Dictionary" value="Dictionary" />
              <Tab key="Puzzle Data" label="Puzzle Data" value="Puzzle Data" />
              <Tab key="Notes" label="Notes" value="Notes" />
            </Tabs>
            {tabValue === 'Clues' && (
              <CluesContainer puzzleId={activePuzzleId} />
            )}
            {tabValue === 'WordList' && <WordListContainer />}
            {tabValue === 'Dictionary' && <DictionaryContainer />}
            {tabValue === 'Puzzle Data' && <div>Hello</div>}
            {tabValue === 'Notes' && (
              <Notes
                onEdit={notes => editPuzzleNotes(activePuzzleId, notes)}
                notes={activePuzzleId && puzzles[activePuzzleId].notes}
              />
            )}
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
  // savePuzzles: PropTypes.func.isRequired,
  updatePuzzleTitle: PropTypes.func.isRequired,
  editPuzzleNotes: PropTypes.func.isRequired,
  // uploadPuzzle: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  puzzleId: PropTypes.string,
  handleTabChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
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
      editPuzzleNotes,
      uploadPuzzle,
      openModal,
      handleTabChange,
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
  withStyles(styles),
)(PuzzleContainer);
