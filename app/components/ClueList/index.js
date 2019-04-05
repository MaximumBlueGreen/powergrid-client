/**
 *
 * ClueList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { map } from 'lodash';

import {
  List,
  ListItem,
  ListSubheader,
  TextField,
  Grid,
} from '@material-ui/core';

function ClueList({ clues, words, header, updateClue }) {
  return (
    <List>
      <ListSubheader>{header}</ListSubheader>
      {map(words, (word, number) => (
        <Grid
          component={ListItem}
          container
          justify="space-between"
          key={number}
        >
          <Grid item xs={6}>
            {`${number}. ${word}`}
          </Grid>
          <Grid item xs>
            <TextField
              value={clues[number] ? clues[number].text : ''}
              placeholder="Clue"
              disabled={word.includes('?')}
              onChange={e => updateClue(number, e.target.value)}
            />
          </Grid>
        </Grid>
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
