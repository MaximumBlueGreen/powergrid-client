/**
 *
 * PuzzleSelector
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledPuzzleSelectorButton = styled.button`
  color: ${props => (props.isActive ? 'blue' : 'black')};
`;

function PuzzleSelector({ activePuzzleId, puzzles, onPuzzleSelected }) {
  return (
    <div>
      {puzzles.map(p => (
        <StyledPuzzleSelectorButton
          isActive={p.id === activePuzzleId}
          key={p.id}
          type="button"
          onClick={() => onPuzzleSelected(p.id)}
        >
          {p.title || `id: ${p.id}`}
        </StyledPuzzleSelectorButton>
      ))}
    </div>
  );
}

PuzzleSelector.propTypes = {
  activePuzzleId: PropTypes.string.isRequired,
  puzzles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onPuzzleSelected: PropTypes.func.isRequired,
};

export default PuzzleSelector;
