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
import { orderBy } from 'lodash';

import {
  Card,
  CardActions,
  CardContent,
  Fab,
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import GridComponent from 'components/Grid';
import CreatePuzzleModal from 'containers/CreatePuzzleModal';
import UploadPuzzleModal from 'containers/UploadPuzzleModal';
import { openModal } from 'containers/CreatePuzzleModal/actions';
import { openUpload } from 'containers/UploadPuzzleModal/actions';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { loadPuzzles } from './actions';
import makeSelectDashboardContainer, {
  makeSelectDashboardContainerPuzzles,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

const styles = theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class DashboardContainer extends React.Component {
  componentDidMount() {
    this.props.loadPuzzles();
  }

  render() {
    const { puzzles, classes, openModal, openUpload } = this.props;
    return (
      <>
        <Fab className={classes.fab} color="primary" onClick={openModal}>
          <Add />
        </Fab>
        <CreatePuzzleModal />
        <Fab className={classes.fab} color="secondary" onClick={openUpload}>
          <CloudUploadIcon />
        </Fab>
        <UploadPuzzleModal />
        <div style={{ width: '60%', marginLeft: '20%' }}>
          <Grid container spacing={32}>
            <Grid
              item
              xs={12}
              component={Typography}
              variant="title"
              style={{ paddingBottom: '16px', marginTop: '16px' }}
            >
              My Puzzles
            </Grid>
            {orderBy(Object.keys(puzzles), id => puzzles[id][id].updated_at, [
              'desc',
            ]).map(parentId => (
              <Grid item xs={4} key={parentId}>
                <Card>
                  <CardContent>
                    <GridComponent
                      focus={false}
                      squares={puzzles[parentId][parentId].squares}
                      size={puzzles[parentId][parentId].size}
                      highlightable={false}
                    />
                  </CardContent>
                  <CardActions>
                    <Button color="primary" href={`/home/${parentId}`}>
                      {puzzles[parentId][parentId].title || 'Untitled'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </>
    );
  }
}

DashboardContainer.propTypes = {
  loadPuzzles: PropTypes.func.isRequired,
  puzzles: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  openUpload: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboardContainer: makeSelectDashboardContainer(),
  puzzles: makeSelectDashboardContainerPuzzles(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadPuzzles, openModal, openUpload }, dispatch);
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
