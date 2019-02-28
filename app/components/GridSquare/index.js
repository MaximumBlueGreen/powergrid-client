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
  background-color: white;
  position: relative;

  ${({ isBlack, isFocused }) => {
    if (isBlack) {
      return 'background-color: black;';
    }

    if (isFocused) {
      return 'background-color: lightblue;';
    }
    return '';
  }};
`;

const NumberWrapper = styled.div`
  position: absolute;
  font-size: 0.25em;
  user-select: none;
  line-height: 1em;
  padding-left: 2%;
`;
const ValueWrapper = styled.div`
  position: absolute;
  bottom: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-size: 0.5em;
  text-align: center;
  text-transform: uppercase;
  user-select: none;
`;

function GridSquare({
  number,
  value,
  isBlack,
  onClick,
  onDoubleClick,
  isFocused,
}) {
  return (
    <GridSquareWrapper
      isBlack={isBlack}
      isFocused={isFocused}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {number && <NumberWrapper>{number}</NumberWrapper>}
      <ValueWrapper>{value}</ValueWrapper>
    </GridSquareWrapper>
  );
}

GridSquare.propTypes = {
  number: PropTypes.number,
  value: PropTypes.string,
  isBlack: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  isFocused: PropTypes.bool,
};

GridSquare.defaultProps = {
  isFocused: false,
  isBlack: false,
};

export default GridSquare;
