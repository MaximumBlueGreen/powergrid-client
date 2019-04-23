/**
 *
 * WordListBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Input from '@material-ui/core/Input';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { Delete as DeleteIcon } from '@material-ui/icons';

function WordListBox({ word, score, updateEntry, selectEntry, deleteEntry }) {
  return (
    <TableRow>
      <TableCell style={{ width: '40%', textTransform: 'uppercase' }}>
        <Tooltip title="Use" placement="top">
          <Button
            onClick={selectEntry}
            style={{ fontFamily: "'Roboto Mono', monospace" }}
          >
            {word}
          </Button>
        </Tooltip>
      </TableCell>
      <TableCell style={{ width: '10%' }}>
        <Input
          onChange={e => updateEntry({ score: e.target.value })}
          type="number"
          value={score}
          disableUnderline
        />
      </TableCell>
      <TableCell style={{ width: '5%' }}>
        <Tooltip title="Delete" placement="right">
          <IconButton onClick={deleteEntry}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

WordListBox.propTypes = {
  word: PropTypes.string.isRequired,
  score: PropTypes.number,
  updateEntry: PropTypes.func.isRequired,
  selectEntry: PropTypes.func.isRequired,
  deleteEntry: PropTypes.func.isRequired,
};

WordListBox.defaultProps = {
  score: 0,
};

export default WordListBox;
