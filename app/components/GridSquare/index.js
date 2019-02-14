/**
 *
 * GridSquare
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const GridSquareWrapper = styled.div`
  height: 100px;
  width: 100px;
  border: 1px solid black;
`;

function GridSquare({ number, value }) {
  return <GridSquareWrapper>{value + number}</GridSquareWrapper>;
}

GridSquare.propTypes = {
  number: PropTypes.number,
  value: PropTypes.string,
};

export default GridSquare;
