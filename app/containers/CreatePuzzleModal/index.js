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
  Typography,
} from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import {
  closeModal,
  createPuzzle,
  updateSize,
  updateTitle,
  uploadPuzzle,
  changeMode,
} from './actions';
import saga from './saga';
import reducer from './reducer';
import { UPLOAD_MODE, CREATE_MODE } from './constants';

import { makeSelectCreatePuzzleModal } from './selectors';

function CreatePuzzleModal({
  forceOpen,
  closeModal,
  createPuzzle,
  updateSize,
  updateTitle,
  ui: {
    open,
    size: { height, width },
    title,
    mode,
  },
  parentId,
  puzzleToCopyId,
  changeMode,
  uploadPuzzle,
}) {
  return (
    <div>
      <Dialog
        open={forceOpen || open}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle style={{ width: '300px' }} id="form-dialog-title">{`New ${
          parentId ? 'Version' : 'Puzzle'
        }`}</DialogTitle>
        {mode === CREATE_MODE && (
          <DialogContent>
            <Grid container justify="space-evenly" spacing={8}>
              <Grid item>
                <TextField
                  value={title || ''}
                  placeholder="Untitled"
                  name="title"
                  onChange={e => updateTitle(e.target.value)}
                  fullWidth
                />
              </Grid>
              {!puzzleToCopyId && (
                <Grid item xs={3}>
                  <Select
                    value={height}
                    onChange={e => updateSize(e.target.value, e.target.value)}
                  >
                    <MenuItem value={15}>15x15</MenuItem>
                    <MenuItem value={5}>5x5</MenuItem>
                  </Select>
                </Grid>
              )}
            </Grid>
          </DialogContent>
        )}
        {mode === UPLOAD_MODE && (
          <DialogContent>
            <Typography>Upload a .puz file</Typography>
          </DialogContent>
        )}

        <DialogActions>
          <Button onClick={changeMode}>
            {mode === CREATE_MODE ? 'Upload' : 'New'}
          </Button>
          {mode === UPLOAD_MODE && (
            <>
              <input
                accept=".puz"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={e => uploadPuzzle(e.target.files[0])}
              />
              <label htmlFor="raised-button-file">
                <Button color="primary" variant="contained" component="span">
                  Browse
                </Button>
              </label>
            </>
          )}

          {mode === CREATE_MODE && (
            <Button
              onClick={() =>
                createPuzzle({ height, width }, title, parentId, puzzleToCopyId)
              }
              color="primary"
              variant="contained"
            >
              Create
            </Button>
          )}
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
  forceOpen: PropTypes.bool,
  parentId: PropTypes.string,
  puzzleToCopyId: PropTypes.string,
  changeMode: PropTypes.func.isRequired,
  uploadPuzzle: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ui: makeSelectCreatePuzzleModal(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      closeModal,
      createPuzzle,
      updateSize,
      updateTitle,
      uploadPuzzle,
      changeMode,
    },
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
