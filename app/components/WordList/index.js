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

function WordList({ wordList, updateFilterPattern, filterPattern }) {
  return (
    <div>
      <div>
        <input
          type="text"
          value={filterPattern}
          onChange={e => updateFilterPattern(e.target.value)}
        />
      </div>
      <StyledList>
        {wordList.map(s => (
          <WordListBox key={s.id} word={s.entry} score={s.score} />
        ))}
      </StyledList>
    </div>
  );
}

WordList.propTypes = {
  filterPattern: PropTypes.string.isRequired,
  wordList: PropTypes.array.isRequired,
  updateFilterPattern: PropTypes.func.isRequired,
};

export default WordList;
