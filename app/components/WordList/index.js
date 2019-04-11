/**
 *
 * WordList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import WordListBox from 'components/WordListBox';

import TextField from '@material-ui/core/TextField';
import { Field } from 'redux-form/immutable';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import { Add as AddIcon } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';

import { orderBy } from 'lodash';

const renderTextField = ({ input, label, ...custom }) => (
  <TextField label={label} {...input} {...custom} />
);

function WordList({
  wordList,
  updateFilterPattern,
  filterPattern,
  updateEntry,
  selectEntry,
  deleteEntry,
}) {
  return (
    <div>
      <div>
        <TextField
          type="text"
          value={filterPattern}
          onChange={e => updateFilterPattern(e.target.value)}
          placeholder="Regex search"
        />
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Field
                component={renderTextField}
                inputProps={{ style: { textTransform: 'uppercase' } }}
                type="text"
                name="entry"
                label="Entry"
              />
            </TableCell>
            <TableCell>
              <Field
                name="score"
                label="Score"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                component={renderTextField}
                placeholder="0"
              />
            </TableCell>
            <TableCell>
              <Tooltip title="Add" placement="right">
                <IconButton type="submit" color="primary">
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderBy(wordList, 'score', 'desc').map(w => (
            <WordListBox
              component={WordListBox}
              selected
              key={w.id}
              word={w.entry}
              score={w.score}
              updateEntry={entry => updateEntry(w.id, entry)}
              selectEntry={() => selectEntry(w.entry)}
              deleteEntry={() => deleteEntry(w.id)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

WordList.propTypes = {
  filterPattern: PropTypes.string.isRequired,
  wordList: PropTypes.array.isRequired,
  updateFilterPattern: PropTypes.func.isRequired,
  updateEntry: PropTypes.func.isRequired,
  selectEntry: PropTypes.func.isRequired,
  deleteEntry: PropTypes.func.isRequired,
};

export default WordList;
