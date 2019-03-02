/**
 *
 * WordListBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const WordListBoxWrapper = styled.div`
  border: 0.5px solid black;
  position: relative;
  font-size: 0.35em;
  background-color: white;
  width: 150px; /* relative to parent */
  height: 30px;
`;

const ValueWrapper = styled.div`
  position: absolute;
  bottom: 0;
  top: 50%;
  padding-left: 10px;
  transform: translate(0%, -50%);

  font-size: 1.6em;
  text-align: left;
  user-select: none;
`;

const NumberWrapper = styled.div`
  padding-right: 10px;
  transform: translate(0%, 25%);

  font-size: 1.6em;
  text-align: right;
  user-select: none;
`;

function WordListBox({ word, score }) {
  return (
    <WordListBoxWrapper>
      <ValueWrapper>{word}</ValueWrapper>
      <NumberWrapper>{score}</NumberWrapper>
    </WordListBoxWrapper>
  );
}

WordListBox.propTypes = {
  word: PropTypes.string.isRequired,
  score: PropTypes.number,
};

WordListBox.defaultProps = {
  score: 0,
};

export default WordListBox;
