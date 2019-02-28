/**
 *
 * PuzzleSelector
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledPuzzleSelectorWrapper = styled.div``;

const StyledPuzzleSelectorButton = styled.button`
  color: ${props => (props.isActive ? 'blue' : 'black')};
`;

function PuzzleSelector({ activePuzzleId, puzzles, onPuzzleSelected }) {
  return (
    <StyledPuzzleSelectorWrapper>
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
    </StyledPuzzleSelectorWrapper>
  );
}

PuzzleSelector.propTypes = {
  activePuzzleId: PropTypes.string,
  puzzles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onPuzzleSelected: PropTypes.func.isRequired,
};

export default PuzzleSelector;
