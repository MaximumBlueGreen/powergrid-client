/**
 *
 * ResultBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// import Input from '@material-ui/core/Input';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

function ResultBox({ word, score }) {
  return (
    <TableRow>
      <TableCell style={{ width: '40%' }}>{word}</TableCell>
      <TableCell style={{ width: '40%' }} align="right">
        {score}
      </TableCell>
    </TableRow>
  );
}

ResultBox.propTypes = {
  word: PropTypes.string.isRequired,
  score: PropTypes.number,
};

ResultBox.defaultProps = {
  score: 0,
};

export default ResultBox;
