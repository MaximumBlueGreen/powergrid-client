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
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  listSubheader: {
    backgroundColor: theme.palette.background.default,
    zIndex: 5 /* needs to be larger than the placeholder label zIndex of 1 */,
  },
});

function ClueList({ clues, words, header, updateClue, onFocused, classes }) {
  return (
    <List>
      <ListSubheader className={classes.listSubheader}>{header}</ListSubheader>
      {map(words, (word, number) => (
        <ListItem key={`${number}. ${word}`}>
          <TextField
            label={`${number}. ${word}`}
            variant="outlined"
            value={clues[number] ? clues[number].text : ''}
            disabled={word.includes('?')}
            onChange={e => updateClue(number, e.target.value)}
            onFocus={() => onFocused(number)}
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
  onFocused: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClueList);
