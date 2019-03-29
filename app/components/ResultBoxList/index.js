/**
 *
 * ResultBoxList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ResultBox from 'components/ResultBox';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

function ResultBoxList({ resultList }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Word</TableCell>
          <TableCell align="right">Score</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {resultList.map(w => (
          <ResultBox word={w.word} score={w.score} />
        ))}
      </TableBody>
    </Table>
  );
}

ResultBoxList.propTypes = {
  resultList: PropTypes.array.isRequired,
};

export default ResultBoxList;
