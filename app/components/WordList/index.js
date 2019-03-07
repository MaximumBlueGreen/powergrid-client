/**
 *
 * WordList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import WordListBox from 'components/WordListBox';
import AddEntryContainer from 'containers/AddEntryContainer';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

function WordList({ wordList, updateFilterPattern, filterPattern }) {
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
      <List>
        {wordList.map(s => (
          <ListItem
            component={WordListBox}
            selected
            key={s.id}
            word={s.entry}
            score={s.score}
          />
        ))}
      </List>
      <AddEntryContainer />
    </div>
  );
}

WordList.propTypes = {
  filterPattern: PropTypes.string.isRequired,
  wordList: PropTypes.array.isRequired,
  updateFilterPattern: PropTypes.func.isRequired,
};

export default WordList;
