/**
 *
 * Wordlist
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import WordlistBox from 'components/WordlistBox';

const StyledList = styled.div`
  width: 500px;
  font-size: 24px;
`;

function Wordlist({ wordlist }) {
  return (
    <StyledList>
      {wordlist.map(s => (
        <WordlistBox word={s.word} score={s.score} />
      ))}
    </StyledList>
  );
}

Wordlist.propTypes = {
  wordlist: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Wordlist;
