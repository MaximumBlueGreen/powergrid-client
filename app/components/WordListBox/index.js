/**
 *
 * WordListBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

function WordListBox({ word, score }) {
  return (
    <Grid container justify="space-between">
      <Grid item xs={4}>
        {word}
      </Grid>
      <Grid item xs={1} style={{ textAlign: 'right' }}>
        {score}
      </Grid>
    </Grid>
  );
}

WordListBox.propTypes = {
  word: PropTypes.string.isRequired,
  score: PropTypes.number,
};

WordListBox.defaultProps = {
  score: 0,
};

export default WordListBox;
