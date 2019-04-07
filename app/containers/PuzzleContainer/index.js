/**
 *
 * PuzzleContainer
 *
 */

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { Grid, Tab, Tabs, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import CluesContainer from 'containers/CluesContainer';
import CreatePuzzleModal from 'containers/CreatePuzzleModal';
import { openModal } from 'containers/CreatePuzzleModal/actions';
import DictionaryContainer from 'containers/DictionaryContainer';
import GridContainer from 'containers/GridContainer';
import WordListContainer from 'containers/WordListContainer';

import Notes from 'components/Notes';
import SyncStatus from 'components/SyncStatus';

import { editPuzzleNotes, updatePuzzleTitle } from 'entities/Puzzles/actions';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  handleTabChange,
  loadPuzzles,
  savePuzzle,
  uploadPuzzle,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectPuzzleContainer,
  makeSelectPuzzleContainerData,
} from './selectors';

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
      ui: { puzzleId, isSyncing, lastSynced, loading, tabValue },
      puzzle,
      updatePuzzleTitle,
      editPuzzleNotes,
      handleTabChange,
      classes: { conditionalSticky },
    } = this.props;

    return (
      <PuzzleContainerWrapper>
        <CreatePuzzleModal forceOpen={!(puzzleId || loading)} />
        <Grid container justify="center" alignItems="flex-start" spacing={0}>
          {puzzleId && (
            <Grid className={conditionalSticky} item container xs={11} md={5}>
              <Grid item xs={12}>
                <TextField
                  value={(puzzle && puzzle.title) || ''}
                  placeholder="Untitled"
                  margin="normal"
                  name="title"
                  onChange={e => updatePuzzleTitle(puzzleId, e.target.value)}
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
                <GridContainer puzzleId={puzzleId} />
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
            {tabValue === 'Clues' && <CluesContainer puzzleId={puzzleId} />}
            {tabValue === 'WordList' && <WordListContainer />}
            {tabValue === 'Dictionary' && <DictionaryContainer />}
            {tabValue === 'Puzzle Data' && <div>Hello</div>}
            {tabValue === 'Notes' && (
              <Notes
                onEdit={notes => editPuzzleNotes(puzzleId, notes)}
                notes={puzzleId && puzzle.notes}
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
    puzzleId: PropTypes.string,
  }).isRequired,
  puzzle: PropTypes.object,
  loadPuzzles: PropTypes.func.isRequired,
  updatePuzzleTitle: PropTypes.func.isRequired,
  editPuzzleNotes: PropTypes.func.isRequired,
  puzzleId: PropTypes.string,
  handleTabChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  puzzle: makeSelectPuzzleContainerData(),
  ui: makeSelectPuzzleContainer(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadPuzzles,
      savePuzzle,
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
