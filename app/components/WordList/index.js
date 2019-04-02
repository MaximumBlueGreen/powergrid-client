/**
 *
 * WordList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import WordListBox from 'components/WordListBox';
import AddEntryContainer from 'containers/AddEntryContainer';

import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { orderBy } from 'lodash';

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
            <TableCell>Word</TableCell>
            <TableCell>Score</TableCell>
            <TableCell />
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
      <AddEntryContainer />
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
