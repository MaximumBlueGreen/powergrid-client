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
  width: 100%;
  padding-top: 100%;

  ${({ isBlack, isFocused, isPartOfFocusedWord }) => {
    if (isBlack && isFocused) {
      return 'background-color: #383838';
    }

    if (isBlack) {
      return 'background-color: black;';
    }

    if (isFocused) {
      return 'background-color: lightblue;';
    }

    if (isPartOfFocusedWord) {
      return 'background-color: yellow';
    }
    return '';
  }};
`;

const NumberWrapper = styled.div`
  position: absolute;
  top: 0;
  font-size: 0.25em;
  user-select: none;
  line-height: 1em;
  padding-left: 2%;
  padding-top: 2%;
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
  isFocused,
  isPartOfFocusedWord,
}) {
  return (
    <GridSquareWrapper
      isBlack={isBlack}
      isFocused={isFocused}
      isPartOfFocusedWord={isPartOfFocusedWord}
      onClick={onClick}
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
  isFocused: PropTypes.bool,
  isPartOfFocusedWord: PropTypes.bool,
};

GridSquare.defaultProps = {
  isFocused: false,
  isBlack: false,
};

export default GridSquare;
