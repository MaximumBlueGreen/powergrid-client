/**
 *
 * PuzzleSelector
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function PuzzleSelector({ activePuzzleId, puzzles, onPuzzleSelected }) {
  return (
    puzzles.length > 0 && (
      <Tabs
        variant="scrollable"
        value={activePuzzleId}
        onChange={(e, value) => {
          onPuzzleSelected(value);
        }}
      >
        {puzzles.map(p => (
          <Tab key={p.id} label={p.title || `Untitled`} value={p.id} />
        ))}
      </Tabs>
    )
  );
}

PuzzleSelector.propTypes = {
  activePuzzleId: PropTypes.string,
  puzzles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onPuzzleSelected: PropTypes.func.isRequired,
};

export default PuzzleSelector;
