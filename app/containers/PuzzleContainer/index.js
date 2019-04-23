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
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Step,
  StepButton,
  Stepper,
  TextField,
  Tooltip,
} from '@material-ui/core';
import {
  ArrowDropDown,
  Add,
  PersonAdd,
  Edit,
  BarChart,
  List,
  Search,
} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import CluesContainer from 'containers/CluesContainer';
import CreatePuzzleModal from 'containers/CreatePuzzleModal';
import { openModal as openCreatePuzzleModal } from 'containers/CreatePuzzleModal/actions';
import { openModal as openManagePermissionsModal } from 'containers/ManagePermissionsModal/actions';
import DictionaryContainer from 'containers/DictionaryContainer';
import GridContainer from 'containers/GridContainer';
import WordListContainer from 'containers/WordListContainer';
import NotesContainer from 'containers/NotesContainer';
import ManagePermissionsModal from 'containers/ManagePermissionsModal';

import NavDrawer from 'components/NavDrawer';
import SyncStatus from 'components/SyncStatus';

import { editPuzzleNotes, updatePuzzleTitle } from 'entities/Puzzles/actions';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { loadPuzzle, savePuzzle, uploadPuzzle, clickEntryTag } from './actions';
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
  stepperRoot: {
    'background-color': 'transparent',
  },
  tabs: {
    position: 'fixed',
    bottom: theme.spacing.unit,
    right: theme.spacing.unit,
    boxShadow: theme.shadows[2],
  },
});

const FILL_MODE = 'Fill';
const CLUE_MODE = 'Clue';
const SUBMIT_MODE = 'Submit';
const MODES = [FILL_MODE, CLUE_MODE, SUBMIT_MODE];

const TABS = {
  [FILL_MODE]: [
    { label: 'Words', Icon: List },
    { label: 'Dictionary', Icon: Search },
    { label: 'Notes', Icon: Edit },
    { label: 'Data', Icon: BarChart },
  ],
  [CLUE_MODE]: [
    { label: 'Clues', Icon: List },
    { label: 'Notes', Icon: Edit },
    { label: 'Data', Icon: BarChart },
  ],
  [SUBMIT_MODE]: [],
};

class PuzzleContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      versionMenuAnchorElement: null,
      mode: MODES[0],
      tabIndex: 0,
    };
    this.openVersionMenu = this.openVersionMenu.bind(this);
    this.closeVersionMenu = this.closeVersionMenu.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }

  componentDidMount() {
    this.props.loadPuzzle(this.props.puzzleId);
  }

  componentDidUpdate({ puzzleId }) {
    if (this.props.puzzleId !== puzzleId) {
      this.props.loadPuzzle(this.props.puzzleId);
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

  changeMode(mode) {
    this.setState({
      mode,
      tabIndex: 0,
    });
  }

  changeTab(tabIndex) {
    this.setState({
      tabIndex,
    });
  }

  render() {
    const {
      ui: { puzzleId, isSyncing, lastSynced, loading },
      puzzle,
      updatePuzzleTitle,
      editPuzzleNotes,
      loadPuzzle,
      openCreatePuzzleModal,
      openManagePermissionsModal,
      clickEntryTag,
      classes: { conditionalSticky, tabs, stepperRoot },
    } = this.props;

    const displayVersions = puzzle && puzzle.versions.length > 1;
    const activeTab = TABS[this.state.mode][this.state.tabIndex];

    return (
      <PuzzleContainerWrapper>
        <CreatePuzzleModal
          forceOpen={!(puzzleId || loading)}
          parentId={puzzle && (puzzle.parent_id || puzzleId)}
          puzzleToCopyId={puzzleId}
        />
        {puzzleId && <ManagePermissionsModal puzzleId={puzzleId} />}
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
                  loadPuzzle(id);
                  this.closeVersionMenu();
                }}
              >
                {title || 'Untitled'}
              </MenuItem>
            ))}
          </Menu>
        )}
        <Grid container justify="space-between" alignItems="flex-start">
          <Grid item className={conditionalSticky}>
            <NavDrawer />
          </Grid>
          <Grid
            className={conditionalSticky}
            item
            container
            xs={10}
            md={5}
            alignItems="center"
          >
            {puzzle && (
              <React.Fragment>
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
                            <IconButton
                              onClick={openCreatePuzzleModal}
                              color="primary"
                            >
                              <Add />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() => openManagePermissionsModal(puzzleId)}
                  >
                    <PersonAdd />
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <SyncStatus isSyncing={isSyncing} lastSynced={lastSynced} />
                </Grid>
                <Grid item xs={12} style={{ marginBottom: '20px' }}>
                  <GridContainer puzzleId={puzzleId} />
                </Grid>
              </React.Fragment>
            )}
          </Grid>
          <Grid item xs={10} md={6}>
            <Stepper
              nonLinear
              activeStep={MODES.findIndex(mode => mode === this.state.mode)}
              className={stepperRoot}
            >
              {MODES.map(mode => (
                <Step key={mode}>
                  <StepButton onClick={() => this.changeMode(mode)}>
                    {mode}
                  </StepButton>
                </Step>
              ))}
            </Stepper>

            {activeTab && (
              <>
                {activeTab.label === 'Words' && <WordListContainer />}
                {activeTab.label === 'Clues' && (
                  <CluesContainer puzzleId={puzzleId} />
                )}
                {activeTab.label === 'Notes' && (
                  <NotesContainer
                    onEdit={notes => editPuzzleNotes(puzzleId, notes)}
                    notes={puzzleId && puzzle.notes}
                    puzzleId={puzzleId}
                    onEntryTagClicked={(number, isAcross) =>
                      clickEntryTag(puzzleId, number, isAcross)
                    }
                  />
                )}
                {activeTab.label === 'Data' && <div />}
                {activeTab.label === 'Dictionary' && <DictionaryContainer />}
              </>
            )}

            <BottomNavigation
              onChange={(e, value) => this.changeTab(value)}
              showLabels
              className={tabs}
              value={this.state.tabIndex}
            >
              {TABS[this.state.mode].map(({ label, Icon }) => (
                <BottomNavigationAction label={label} icon={<Icon />} />
              ))}
            </BottomNavigation>
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
  loadPuzzle: PropTypes.func.isRequired,
  updatePuzzleTitle: PropTypes.func.isRequired,
  editPuzzleNotes: PropTypes.func.isRequired,
  puzzleId: PropTypes.string,
  openCreatePuzzleModal: PropTypes.func.isRequired,
  openManagePermissionsModal: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  clickEntryTag: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  puzzle: makeSelectPuzzleContainerData(),
  ui: makeSelectPuzzleContainer(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadPuzzle,
      savePuzzle,
      updatePuzzleTitle,
      editPuzzleNotes,
      uploadPuzzle,
      openCreatePuzzleModal,
      openManagePermissionsModal,
      clickEntryTag,
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
