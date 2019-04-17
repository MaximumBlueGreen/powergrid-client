import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';

import {
  Chip,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';

import { Add, Delete } from '@material-ui/icons';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { closeModal, addAccessor, deleteAccessor } from './actions';
import saga from './saga';
import reducer from './reducer';

import {
  makeSelectManagePermissionsModal,
  makeSelectAccessors,
} from './selectors';

const renderTextField = ({ input, label, ...custom }) => (
  <TextField label={label} {...input} {...custom} />
);

function ManagePermissionsModal({
  closeModal,
  ui: { open },
  accessors,
  addAccessor,
  deleteAccessor,
  handleSubmit,
}) {
  return (
    <Dialog
      open={open}
      onClose={closeModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle>Collaborators</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(addAccessor)}>
          <Table>
            <TableBody>
              <TableRow key="new">
                <TableCell component="th" scope="row">
                  <Field
                    component={renderTextField}
                    InputProps={{ disableUnderline: true }}
                    type="text"
                    name="username"
                    label="Username"
                    required
                  />
                </TableCell>
                <TableCell>
                  <Chip label="Edit" />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" type="submit">
                    <Add />
                  </IconButton>
                </TableCell>
              </TableRow>
              {accessors.map(accessor => (
                <TableRow key={accessor.id}>
                  <TableCell component="th" scope="row">
                    <Typography>{accessor.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label="Edit" />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => deleteAccessor(accessor.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </form>
      </DialogContent>
      <DialogActions />
    </Dialog>
  );
}

ManagePermissionsModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  ui: PropTypes.shape({
    open: PropTypes.bool.isRequired,
  }).isRequired,
  accessors: PropTypes.array.isRequired,
  addAccessor: PropTypes.func.isRequired,
  deleteAccessor: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ui: makeSelectManagePermissionsModal(),
  accessors: makeSelectAccessors(),
});

function mapDispatchToProps(dispatch, { puzzleId }) {
  return bindActionCreators(
    {
      closeModal,
      addAccessor: values => addAccessor(puzzleId, values),
      deleteAccessor: accessorId => deleteAccessor(puzzleId, accessorId),
    },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'managePermissionsModal', reducer });
const withSaga = injectSaga({ key: 'managePermissionsModal', saga });

export default compose(
  withReducer,
  withSaga,
  reduxForm({ form: 'addAccessor' }),
  withConnect,
)(ManagePermissionsModal);
