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
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-template-rows: repeat(${props => props.height}, 1fr);
  height: 500px;
  width: 500px;
`;

function Grid({ squares, size }) {
  return (
    <StyledGrid {...size}>
      {squares.map(s => (
        <GridSquare key={s.number} number={s.number} value={s.value} />
      ))}
    </StyledGrid>
  );
}

Grid.propTypes = {
  // size: PropTypes.object({
  //   height: PropTypes.number.isRequired,
  //   width: PropTypes.number.isRequired,
  // }),
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