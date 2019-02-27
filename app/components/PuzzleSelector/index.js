/**
 *
 * PuzzleSelector
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function PuzzleSelector({ /* activePuzzleId, */ puzzles, onPuzzleSelected }) {
  return (
    <div>
      {puzzles.map(p => (
        <button key={p.id} type="button" onClick={() => onPuzzleSelected(p.id)}>
          {p.id}
        </button>
      ))}
    </div>
  );
}

PuzzleSelector.propTypes = {
  // activePuzzleId: PropTypes.string.isRequired,
  puzzles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onPuzzleSelected: PropTypes.func.isRequired,
};

export default PuzzleSelector;
