/**
 *
 * DashboardContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { orderBy, times } from 'lodash';

import {
  Card,
  CardActions,
  CardActionArea,
  Fab,
  Grid,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import GridComponent from 'components/Grid';
import CreatePuzzleModal from 'containers/CreatePuzzleModal';
import { openModal as openCreateModal } from 'containers/CreatePuzzleModal/actions';

import DeletePuzzleModal from 'containers/DeletePuzzleModal';
import { openModal as openDeleteModal } from 'containers/DeletePuzzleModal/actions';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { loadPuzzles } from './actions';
import makeSelectDashboardContainer, {
  makeSelectDashboardContainerPuzzles,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

const styles = theme => ({
  newPuzzleButton: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: theme.zIndex.mobileStepper - 1,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

class DashboardContainer extends React.Component {
  componentDidMount() {
    this.props.loadPuzzles();
  }

  render() {
    const { puzzles, openCreateModal, openDeleteModal, classes } = this.props;
    return (
      <React.Fragment>
        <CreatePuzzleModal />
        <DeletePuzzleModal />
        <div style={{ width: '60%', marginLeft: '20%' }}>
          <Grid container spacing={32} alignItems="center">
            <Grid
              item
              xs={12}
              component={Typography}
              variant="h4"
              style={{ paddingBottom: '16px', marginTop: '16px' }}
            >
              My Puzzles
            </Grid>
            <Grid item lg={4} md={6} xs={12} style={{ position: 'relative' }}>
              <Fab
                className={classes.newPuzzleButton}
                onClick={openCreateModal}
                variant="extended"
                size="large"
                color="primary"
                aria-label="Add"
              >
                New Puzzle
              </Fab>
              <Card style={{ margin: '32px' }}>
                <GridComponent
                  focus={false}
                  squares={times(225, id => ({ id }))}
                  size={{ height: 15, width: 15 }}
                  highlightable={false}
                />
              </Card>
            </Grid>
            {orderBy(Object.keys(puzzles), id => puzzles[id][id].updated_at, [
              'desc',
            ]).map(parentId => (
              <Grid item lg={4} md={6} xs={12} key={parentId}>
                <Card>
                  <CardActionArea href={`/edit/${parentId}`}>
                    <GridComponent
                      focus={false}
                      squares={puzzles[parentId][parentId].squares}
                      size={puzzles[parentId][parentId].size}
                      highlightable={false}
                    />
                  </CardActionArea>
                  <CardActions className={classes.cardActions}>
                    <Button color="primary" href={`/edit/${parentId}`}>
                      {puzzles[parentId][parentId].title || 'Untitled'}
                    </Button>
                    <IconButton onClick={() => openDeleteModal(parentId)}>
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

DashboardContainer.propTypes = {
  loadPuzzles: PropTypes.func.isRequired,
  puzzles: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openCreateModal: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboardContainer: makeSelectDashboardContainer(),
  puzzles: makeSelectDashboardContainerPuzzles(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { loadPuzzles, openCreateModal, openDeleteModal },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dashboardContainer', reducer });
const withSaga = injectSaga({ key: 'dashboardContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(DashboardContainer);
