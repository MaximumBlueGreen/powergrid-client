/**
 *
 * Grid
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import GridSquare from 'components/GridSquare';
import styled from 'styled-components';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

function Grid({ squares }) {
  return (
    <StyledGrid>
      {squares.map(s => (
        <GridSquare key={s.number} number={s.number} value={s.value} />
      ))}
    </StyledGrid>
  );
}

Grid.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Grid;

/* Grid actions */
/*
 squareFocused,
 gridNavigated,
*/

/*
grid data model:
squares: [
  {
    id: Number,
    number: Number,
    value: String,
    isBlackSquare: Bool,
    isCircled: Bool,
    isShaded: Bool,
    ///
    isFocused,
  }...
]
*/
