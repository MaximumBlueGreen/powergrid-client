/**
 *
 * Notes
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';

function Notes({ onEdit, notes }) {
  return (
    <TextField
      value={notes}
      onChange={e => onEdit(e.target.value)}
      multiline
      fullWidth
      rows="25"
      margin="normal"
      variant="outlined"
      placeholder="This is your place to brainstorm theme ideas and clues and to leave notes for yourself, the editor or your test solvers."
    />
  );
}

Notes.propTypes = {
  onEdit: PropTypes.func.isRequired,
  notes: PropTypes.string,
};

Notes.defaultProps = {
  notes: '',
};

export default Notes;
