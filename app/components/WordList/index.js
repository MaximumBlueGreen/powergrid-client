/**
 *
 * WordList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import WordListBox from 'components/WordListBox';

const StyledList = styled.div`
  width: 500px;
  font-size: 24px;
`;

function WordList({ wordList }) {
  return (
    <StyledList>
      {wordList.map(s => (
        <WordListBox word={s.word} score={s.score} />
      ))}
    </StyledList>
  );
}

WordList.propTypes = {
  wordList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default WordList;
