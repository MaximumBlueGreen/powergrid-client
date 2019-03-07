/**
 *
 * WordList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import WordListBox from 'components/WordListBox';
import AddEntryContainer from 'containers/AddEntryContainer';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

function WordList({
  wordList,
  updateFilterPattern,
  filterPattern,
  updateEntry,
}) {
  return (
    <div>
      <div>
        <input
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
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {wordList.map(w => (
            <WordListBox
              component={WordListBox}
              selected
              key={w.id}
              word={w.entry}
              score={w.score}
              updateEntry={entry => updateEntry(w.id, entry)}
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
};

export default WordList;
