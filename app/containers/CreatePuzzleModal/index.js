/**
 *
 * CreatePuzzleModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Select,
  MenuItem,
  TextField,
  Grid,
} from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { closeModal, createPuzzle, updateSize, updateTitle } from './actions';
import saga from './saga';
import reducer from './reducer';

import { makeSelectCreatePuzzleModal } from './selectors';

function CreatePuzzleModal({
  closeModal,
  createPuzzle,
  updateSize,
  updateTitle,
  ui: {
    open,
    size: { height, width },
    title,
  },
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Puzzle</DialogTitle>
        <DialogContent>
          <Grid container justify="space-evenly" spacing={8}>
            <Grid item xs={7}>
              <TextField
                value={title || ''}
                placeholder="Untitled"
                name="title"
                onChange={e => updateTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Select
                value={height}
                onChange={e => updateSize(e.target.value, e.target.value)}
              >
                <MenuItem value={15}>15x15</MenuItem>
                <MenuItem value={5}>5x5</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="default">
            Cancel
          </Button>
          <Button
            onClick={() => createPuzzle({ height, width }, title)}
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CreatePuzzleModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  createPuzzle: PropTypes.func.isRequired,
  updateSize: PropTypes.func.isRequired,
  updateTitle: PropTypes.func.isRequired,
  ui: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    size: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  ui: makeSelectCreatePuzzleModal(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { closeModal, createPuzzle, updateSize, updateTitle },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'createPuzzleModal', reducer });
const withSaga = injectSaga({ key: 'createPuzzleModal', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CreatePuzzleModal);
