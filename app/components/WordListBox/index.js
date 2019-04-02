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

function WordListBox({ word, score, updateEntry, selectEntry }) {
  return (
    <TableRow>
      <TableCell style={{ width: '40%', textTransform: 'uppercase' }}>
        <Tooltip title="Use" placement="left">
          <Button onClick={selectEntry}>{word}</Button>
        </Tooltip>
      </TableCell>
      <TableCell style={{ width: '5%' }} align="right">
        <Input
          onChange={e => updateEntry({ score: e.target.value })}
          type="number"
          value={score}
        />
      </TableCell>
    </TableRow>
  );
}

WordListBox.propTypes = {
  word: PropTypes.string.isRequired,
  score: PropTypes.number,
  updateEntry: PropTypes.func.isRequired,
  selectEntry: PropTypes.func.isRequired,
};

WordListBox.defaultProps = {
  score: 0,
};

export default WordListBox;
