/**
 *
 * ClueList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { List, ListItem } from '@material-ui/core';

function ClueList({ clues }) {
  return (
    <List>
      {clues.map(clue => (
        <ListItem>{clue.text}</ListItem>
      ))}
    </List>
  );
}

ClueList.propTypes = {
  clues: PropTypes.array.isRequired,
};

export default ClueList;
