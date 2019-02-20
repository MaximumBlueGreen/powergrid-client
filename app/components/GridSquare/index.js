/**
 *
 * GridSquare
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const GridSquareWrapper = styled.div`
  border: 1px solid black;
  background-color: ${props => (props.isBlack ? 'black' : 'white')};
  font-size: 0.4em;
`;

function GridSquare({ number, /* value, */ isBlack, onClick }) {
  return (
    <GridSquareWrapper isBlack={isBlack} onClick={onClick}>
      {number || ''}
    </GridSquareWrapper>
  );
}

GridSquare.propTypes = {
  number: PropTypes.number,
  // value: PropTypes.string,
  isBlack: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default GridSquare;
