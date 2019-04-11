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

import {
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { ArrowDropDown, Add } from '@material-ui/icons';
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
  constructor(props) {
    super(props);
    this.state = {
      versionMenuAnchorElement: null,
    };
    this.openVersionMenu = this.openVersionMenu.bind(this);
    this.closeVersionMenu = this.closeVersionMenu.bind(this);
  }

  componentDidMount() {
    this.props.loadPuzzles(this.props.puzzleId);
  }

  componentDidUpdate({ puzzleId }) {
    if (this.props.puzzleId !== puzzleId) {
      this.props.loadPuzzles(this.props.puzzleId);
    }
  }

  openVersionMenu({ currentTarget }) {
    this.setState({
      versionMenuAnchorElement: currentTarget,
    });
  }

  closeVersionMenu() {
    this.setState({
      versionMenuAnchorElement: null,
    });
  }

  render() {
    const {
      ui: { puzzleId, isSyncing, lastSynced, loading, tabValue },
      puzzle,
      updatePuzzleTitle,
      editPuzzleNotes,
      handleTabChange,
      loadPuzzles,
      openModal,
      classes: { conditionalSticky },
    } = this.props;

    const displayVersions = puzzle && puzzle.versions.length > 1;

    return (
      <PuzzleContainerWrapper>
        <CreatePuzzleModal
          forceOpen={!(puzzleId || loading)}
          parentId={puzzle && (puzzle.parent_id || puzzleId)}
          puzzleToCopyId={puzzleId}
        />
        {puzzle && (
          <Menu
            anchorEl={this.state.versionMenuAnchorElement}
            open={Boolean(this.state.versionMenuAnchorElement)}
            onClose={this.closeVersionMenu}
          >
            {puzzle.versions.map(({ id, title }) => (
              <MenuItem
                key={id}
                onClick={() => {
                  loadPuzzles(id);
                  this.closeVersionMenu();
                }}
              >
                {title || id}
              </MenuItem>
            ))}
          </Menu>
        )}
        <Grid container justify="center" alignItems="flex-start" spacing={0}>
          <Grid
            className={conditionalSticky}
            item
            container
            xs={11}
            md={5}
            alignItems="center"
          >
            {puzzle && (
              <>
                <Grid item>
                  <TextField
                    value={(puzzle && puzzle.title) || ''}
                    placeholder="Untitled"
                    margin="normal"
                    onChange={e => updatePuzzleTitle(puzzleId, e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {displayVersions && (
                            <Tooltip title="Select version" placement="bottom">
                              <IconButton onClick={this.openVersionMenu}>
                                <ArrowDropDown />
                              </IconButton>
                            </Tooltip>
                          )}
                          <Tooltip title="Add version" placement="top">
                            <IconButton onClick={openModal} color="primary">
                              <Add />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SyncStatus isSyncing={isSyncing} lastSynced={lastSynced} />
                </Grid>
                <Grid item xs={12}>
                  <GridContainer puzzleId={puzzleId} />
                </Grid>
              </>
            )}
          </Grid>
          <Grid item xs={11} md={6}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab
                style={{ minWidth: '20%' }}
                key="Clues"
                label="Clues"
                value="Clues"
              />
              <Tab
                style={{ minWidth: '20%' }}
                key="WordList"
                label="Words"
                value="WordList"
              />
              <Tab
                style={{ minWidth: '20%' }}
                key="Dictionary"
                label="Search"
                value="Dictionary"
              />
              <Tab
                style={{ minWidth: '20%' }}
                key="Puzzle Data"
                label="Data"
                value="Puzzle Data"
              />
              <Tab
                style={{ minWidth: '20%' }}
                key="Notes"
                label="Notes"
                value="Notes"
              />
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
  openModal: PropTypes.func.isRequired,
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
