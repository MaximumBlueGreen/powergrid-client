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
  Grid,
} from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { uploadPuzzle } from 'containers/PuzzleContainer/actions';
import { closeModal } from './actions';
import saga from './saga';
import reducer from './reducer';

import { makeSelectCreatePuzzleModal } from './selectors';

function CreatePuzzleModal({
  forceOpen,
  closeModal,
  uploadPuzzle,
  ui: { open },
  parentId,
}) {
  return (
    <div>
      <Dialog
        open={forceOpen || open}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{`New ${
          parentId ? 'Version' : 'Puzzle'
        }`}</DialogTitle>
        <DialogContent>
          <Grid container justify="space-evenly" spacing={8}>
            <Grid item>
              <input
                type="file"
                onChange={e => uploadPuzzle(e.target.files[0])}
                accept=".puz"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="default" disabled={forceOpen}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CreatePuzzleModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  uploadPuzzle: PropTypes.func.isRequired,
  ui: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    size: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }),
  }).isRequired,
  forceOpen: PropTypes.bool,
  parentId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  ui: makeSelectCreatePuzzleModal(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeModal, uploadPuzzle }, dispatch);
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
