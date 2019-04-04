/**
 *
 * ClueList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { List, ListItem, TextField, Grid } from '@material-ui/core';

function ClueList({ clues }) {
  return (
    <List>
      {clues.map(({ number, squares }) => (
        <Grid
          component={ListItem}
          container
          justify="space-between"
          key={number}
        >
          <Grid item xs={6}>
            {`${number}. ${squares
              .map(s => (s.value ? s.value.toUpperCase() : '?'))
              .join('')}`}
          </Grid>
          <Grid item xs>
            <TextField
              placeholder="Clue"
              disabled={squares.filter(s => !s.value).length > 0}
            />
          </Grid>
        </Grid>
      ))}
    </List>
  );
}

ClueList.propTypes = {
  clues: PropTypes.array.isRequired,
};

export default ClueList;
