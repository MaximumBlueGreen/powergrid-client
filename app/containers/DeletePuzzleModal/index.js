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
  Typography,
} from '@material-ui/core';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { closeModal, deletePuzzle } from './actions';
import saga from './saga';
import reducer from './reducer';

import { makeSelectDeletePuzzleModal } from './selectors';

function DeletePuzzleModal({
  closeModal,
  deletePuzzle,
  ui: { open, puzzleId },
}) {
  return (
    <div>
      <Dialog open={open} onClose={closeModal}>
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this puzzle?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deletePuzzle(puzzleId)}>Yes, Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DeletePuzzleModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  ui: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    puzzleId: PropTypes.string,
  }).isRequired,
  deletePuzzle: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ui: makeSelectDeletePuzzleModal(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      closeModal,
      deletePuzzle,
    },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'deletePuzzleModal', reducer });
const withSaga = injectSaga({ key: 'deletePuzzleModal', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DeletePuzzleModal);
