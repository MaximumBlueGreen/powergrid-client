/**
 *
 * ClueList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { map } from 'lodash';

import { List, ListItem, ListSubheader, TextField } from '@material-ui/core';

function ClueList({ clues, words, header, updateClue }) {
  return (
    <List>
      <ListSubheader>{header}</ListSubheader>
      {map(words, (word, number) => (
        <ListItem key={number}>
          <TextField
            label={`${number}. ${word}`}
            variant="outlined"
            value={clues[number] ? clues[number].text : ''}
            disabled={word.includes('?')}
            onChange={e => updateClue(number, e.target.value)}
            fullWidth
            multiline
            rowsMax={1}
          />
        </ListItem>
      ))}
    </List>
  );
}

ClueList.propTypes = {
  clues: PropTypes.object.isRequired,
  words: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
  updateClue: PropTypes.func.isRequired,
};

export default ClueList;
