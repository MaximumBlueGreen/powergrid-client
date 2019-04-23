/**
 *
 * WordList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import WordListBox from 'components/WordListBox';

import { Field } from 'redux-form/immutable';

import {
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';

import { Add as AddIcon } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';

import { orderBy } from 'lodash';

const renderTextField = ({ input, label, ...custom }) => (
  <TextField
    label={label}
    InputProps={{ disableUnderline: true }}
    {...input}
    {...custom}
  />
);

function WordList({
  wordList,
  updateFilterPattern,
  filterPattern,
  updateEntry,
  selectEntry,
  deleteEntry,
  loading,
  moreToLoad,
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
      {!loading &&
        wordList.length === 0 && <Typography>No results found</Typography>}
      {!moreToLoad &&
        wordList.length > 0 && <Typography>End of results</Typography>}
      <div style={{ width: '100%', textAlign: 'center' }}>
        <CircularProgress
          style={{
            margin: '10px',
            visibility: loading ? 'visible' : 'hidden',
          }}
        />
      </div>
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
  loading: PropTypes.bool.isRequired,
  moreToLoad: PropTypes.bool.isRequired,
};

export default WordList;
